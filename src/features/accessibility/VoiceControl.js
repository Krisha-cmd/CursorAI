import { useState, useRef, useEffect } from 'react';

export const useVoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognition = useRef(null);
  const speechSynthesis = useRef(window.speechSynthesis);
  const selectedVoice = useRef(null);
  const isRecognitionRunning = useRef(false);
  const hasInitialized = useRef(false);
  const lastCommand = useRef('');
  const commandTimeout = useRef(null);
  const restartTimeout = useRef(null);
  const voicesLoaded = useRef(false);
  const initInterval = useRef(null);
  const voiceLoadAttempts = useRef(0);
  const lastSpokenText = useRef('');
  const selfSpeechTimeout = useRef(null);
  const commandPauseTimeout = useRef(null);
  const ignoreRestartTimeout = useRef(null);

  // Define valid commands and their variations
  const validCommands = {
    navigation: {
      patterns: ['go to', 'scroll to', 'navigate to', 'show me', 'take me to'],
      targets: {
        faq: ['faq', 'faqs', 'frequently asked questions'],
        features: ['features', 'feature section', 'what can you do', 'capabilities'],
        home: ['home', 'top', 'start', 'beginning', 'main page'],
        community: ['community', 'community section', 'users', 'people'],
        testimonials: ['testimonials', 'reviews', 'what people say', 'feedback'],
        craft: ['craft', 'crafting', 'creation', 'build']
      }
    },
    actions: {
      patterns: ['click', 'press', 'select', 'open', 'activate'],
      targets: {
        login: ['login', 'sign in', 'log in', 'signin'],
        signup: ['sign up', 'signup', 'register', 'create account', 'new account'],
        menu: ['menu', 'options', 'settings', 'preferences'],
        help: ['help', 'support', 'assistance']
      }
    },
    help: {
      patterns: ['help', 'what can you do', 'how does this work', 'commands', 'instructions']
    },
    questions: {
      patterns: ['what is', 'tell me about', 'explain', 'describe', 'who are', 'how to'],
      targets: {
        company: ['company', 'outlier', 'who are you', 'about us', 'about you'],
        features: ['features', 'capabilities', 'what can you do', 'services'],
        pricing: ['pricing', 'cost', 'price', 'how much', 'subscription'],
        support: ['support', 'help', 'contact', 'get help', 'assistance'],
        community: ['community', 'users', 'people', 'members'],
        technology: ['technology', 'tech', 'how it works', 'platform']
      }
    },
    general: {
      patterns: ['hello', 'hi', 'hey', 'greetings'],
      responses: [
        "Hello! How can I help you today?",
        "Hi there! What would you like to know?",
        "Hey! I'm here to assist you. What can I do for you?",
        "Greetings! How may I help you navigate the site?"
      ]
    }
  };

  // Add Levenshtein distance calculation for fuzzy matching
  const levenshteinDistance = (str1, str2) => {
    const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1,
          track[j - 1][i] + 1,
          track[j - 1][i - 1] + indicator
        );
      }
    }

    return track[str2.length][str1.length];
  };

  // Update fuzzy matching function to be more lenient
  const findBestMatch = (input, options, threshold = 0.5) => { // Lowered threshold for more lenient matching
    const inputLower = input.toLowerCase();
    let bestMatch = null;
    let bestScore = Infinity;
    let bestOption = null;

    // First try exact matching for efficiency
    const exactMatch = options.find(option => 
      option.toLowerCase() === inputLower
    );
    if (exactMatch) return exactMatch;

    // Then try fuzzy matching
    for (const option of options) {
      const optionLower = option.toLowerCase();
      
      // Try different matching strategies
      const strategies = [
        // Full string comparison
        () => {
          const distance = levenshteinDistance(inputLower, optionLower);
          return distance / Math.max(inputLower.length, optionLower.length);
        },
        // Word-by-word comparison
        () => {
          const inputWords = inputLower.split(' ');
          const optionWords = optionLower.split(' ');
          let totalScore = 0;
          let matches = 0;
          
          for (const inputWord of inputWords) {
            for (const optionWord of optionWords) {
              const distance = levenshteinDistance(inputWord, optionWord);
              const score = distance / Math.max(inputWord.length, optionWord.length);
              if (score < 0.4) { // Very lenient word matching
                totalScore += score;
                matches++;
              }
            }
          }
          return matches > 0 ? totalScore / matches : 1;
        },
        // Contains check
        () => {
          return inputLower.includes(optionLower) || optionLower.includes(inputLower) ? 0.2 : 1;
        }
      ];

      // Try each strategy and take the best score
      const scores = strategies.map(strategy => strategy());
      const score = Math.min(...scores);

      if (score < bestScore && score < (1 - threshold)) {
        bestScore = score;
        bestMatch = option;
        bestOption = option;
      }
    }

    return bestMatch;
  };

  // Update command matching to be more lenient
  const matchCommand = (transcript) => {
    const words = transcript.toLowerCase().split(' ');
    
    // First try exact matching for efficiency
    if (isValidCommand(transcript)) {
      return { type: 'exact', command: transcript };
    }

    // Try fuzzy matching for each command category
    for (const [category, data] of Object.entries(validCommands)) {
      // Check patterns with more lenient matching
      const matchedPattern = data.patterns.find(pattern => 
        findBestMatch(transcript, [pattern], 0.4) // Even more lenient threshold
      );

      if (matchedPattern) {
        if (category === 'help') {
          return { type: 'help', command: transcript };
        }

        if (category === 'general') {
          return { type: 'general', command: transcript };
        }

        // For navigation and actions, check targets with more lenient matching
        if (data.targets) {
          for (const [target, variations] of Object.entries(data.targets)) {
            const matchedTarget = variations.find(variation =>
              findBestMatch(transcript, [variation], 0.4) // Even more lenient threshold
            );

            if (matchedTarget) {
              return { type: category, command: transcript, target };
            }
          }
        }

        // For questions
        if (category === 'questions') {
          for (const [target, variations] of Object.entries(data.targets)) {
            const matchedTarget = variations.find(variation =>
              findBestMatch(transcript, [variation], 0.4) // Even more lenient threshold
            );

            if (matchedTarget) {
              return { type: 'question', command: transcript, target };
            }
          }
        }
      }
    }

    return null;
  };

  // Quick validation of command structure
  const isValidCommand = (transcript) => {
    const words = transcript.toLowerCase().split(' ');
    
    // Check for help command first (simplest case)
    if (validCommands.help.patterns.some(pattern => transcript.includes(pattern))) {
      return true;
    }

    // Check for general greetings
    if (validCommands.general.patterns.some(pattern => transcript.toLowerCase().startsWith(pattern))) {
      return true;
    }

    // Check for questions
    if (validCommands.questions.patterns.some(pattern => transcript.toLowerCase().startsWith(pattern))) {
      return true;
    }

    // Check for navigation or action commands
    for (const [action, data] of Object.entries(validCommands)) {
      if (action === 'help' || action === 'general' || action === 'questions') continue;

      // Check if the transcript starts with a valid pattern
      const hasValidPattern = data.patterns.some(pattern => 
        transcript.toLowerCase().startsWith(pattern)
      );

      if (hasValidPattern) {
        // Check if it contains a valid target
        const hasValidTarget = Object.values(data.targets).some(variations =>
          variations.some(variation => transcript.includes(variation))
        );

        if (hasValidTarget) {
          return true;
        }
      }
    }

    return false;
  };

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Microphone permission error:', error);
      alert('Please allow microphone access to use voice control.');
      return false;
    }
  };

  const initializeRecognition = () => {
    if (!hasInitialized.current && 'webkitSpeechRecognition' in window) {
      try {
        recognition.current = new window.webkitSpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        recognition.current.lang = 'en-US';
        
        recognition.current.onstart = () => {
          console.log('Recognition started');
          isRecognitionRunning.current = true;
          setIsListening(true);
        };
        
        recognition.current.onresult = (event) => {
          const result = event.results[event.results.length - 1];
          const transcript = result[0].transcript.toLowerCase();
          const confidence = result[0].confidence;

          console.log('Recognition result:', {
            transcript,
            confidence,
            isFinal: result.isFinal,
            lastSpokenText: lastSpokenText.current
          });

          // Only process if confidence is high enough and it's a final result
          if (result.isFinal && confidence > 0.5) {
            // Check if this matches our last spoken text
            if (lastSpokenText.current && 
                (transcript.includes(lastSpokenText.current.toLowerCase()) || 
                 lastSpokenText.current.toLowerCase().includes(transcript))) {
              console.log('Ignoring self-speech:', transcript);
              // Stop recognition temporarily
              try {
                recognition.current.stop();
                isRecognitionRunning.current = false;
              } catch (err) {
                console.error('Error stopping recognition:', err);
              }
              
              // Clear any existing restart timeout
              if (ignoreRestartTimeout.current) {
                clearTimeout(ignoreRestartTimeout.current);
              }
              
              // Restart recognition after 3 seconds
              ignoreRestartTimeout.current = setTimeout(() => {
                if (isListening) {
                  console.log('Restarting recognition after ignoring self-speech...');
                  try {
                    recognition.current.start();
                    isRecognitionRunning.current = true;
                  } catch (err) {
                    console.error('Failed to restart recognition:', err);
                    hasInitialized.current = false;
                    initializeRecognition();
                  }
                }
              }, 3000);
              return;
            }

            // Check if this is a repeat of the last command
            if (transcript === lastCommand.current) {
              console.log('Ignoring duplicate command');
              return;
            }

            // Store this command
            lastCommand.current = transcript;

            // Clear any existing timeout
            if (commandTimeout.current) {
              clearTimeout(commandTimeout.current);
            }

            // Set a timeout to clear the last command
            commandTimeout.current = setTimeout(() => {
              lastCommand.current = '';
            }, 2000);

            // Try to match the command
            const match = matchCommand(transcript);
            if (match) {
              console.log('Command matched:', match);
              processMatchedCommand(match);
            } else if (isValidSentence(transcript)) {
              console.log('Valid sentence detected but no command match');
              speak("I heard you, but I'm not sure what you want me to do. Try saying 'help' to learn what commands I understand.");
            } else {
              console.log('Invalid or incomplete sentence - ignoring');
            }
          }
        };

        recognition.current.onerror = (event) => {
          console.error('Recognition error:', {
            error: event.error,
            message: event.message,
            time: new Date().toISOString()
          });

          // Handle different error types
          switch (event.error) {
            case 'network':
              console.log('Network error detected, attempting to recover...');
              // Stop current recognition
              try {
                recognition.current.stop();
              } catch (err) {
                console.log('Error stopping recognition:', err);
              }
              
              // Wait a bit and try to restart
              setTimeout(() => {
                if (isListening) {
                  console.log('Attempting to restart recognition after network error...');
                  try {
                    recognition.current.start();
                  } catch (err) {
                    console.error('Failed to restart recognition:', err);
                    // If restart fails, try reinitializing
                    hasInitialized.current = false;
                    initializeRecognition();
                  }
                }
              }, 1000);
              break;

            case 'not-allowed':
              console.error('Microphone access denied');
              alert('Please allow microphone access to use voice control.');
              setIsListening(false);
              isRecognitionRunning.current = false;
              break;

            case 'aborted':
              console.log('Recognition aborted, attempting to restart...');
              if (isListening) {
                setTimeout(() => {
                  try {
                    recognition.current.start();
                  } catch (err) {
                    console.error('Failed to restart after abort:', err);
                  }
                }, 100);
              }
              break;

            case 'audio-capture':
              console.error('No microphone detected');
              alert('No microphone detected. Please connect a microphone and try again.');
              setIsListening(false);
              isRecognitionRunning.current = false;
              break;

            case 'no-speech':
              console.log('No speech detected, continuing to listen...');
              break;

            default:
              console.error('Unknown recognition error:', event.error);
              if (isListening) {
                setTimeout(() => {
                  try {
                    recognition.current.start();
                  } catch (err) {
                    console.error('Failed to restart after unknown error:', err);
                  }
                }, 100);
              }
          }
        };

        recognition.current.onend = () => {
          console.log('Recognition ended');
          isRecognitionRunning.current = false;
          
          // Always restart if we're supposed to be listening
          if (isListening) {
            console.log('Recognition ended while listening, attempting to restart...');
            try {
              recognition.current.start();
              isRecognitionRunning.current = true;
            } catch (err) {
              console.error('Error restarting recognition:', err);
              // If restart fails, try reinitializing
              hasInitialized.current = false;
              setTimeout(() => {
                if (isListening) {
                  initializeRecognition();
                }
              }, 1000);
            }
          } else {
            setIsListening(false);
          }
        };

        hasInitialized.current = true;
        console.log('Recognition initialized successfully');
      } catch (err) {
        console.error('Failed to initialize recognition:', err);
        // Try to reinitialize after a delay
        setTimeout(() => {
          if (isListening) {
            hasInitialized.current = false;
            initializeRecognition();
          }
        }, 1000);
      }
    }
  };

  const processMatchedCommand = (match) => {
    switch (match.type) {
      case 'general':
        const responses = validCommands.general.responses;
        speak(responses[Math.floor(Math.random() * responses.length)]);
        break;

      case 'help':
        speak("You can say 'go to FAQ', 'scroll to features', 'click login', or ask about specific features. You can also ask questions about our company, pricing, or technology.");
        break;

      case 'question':
        answerQuestion(match.target);
        break;

      case 'navigation':
      case 'actions':
        executeCommand(match.type, match.target);
        break;

      default:
        speak("I'm not sure what you want to do. Say 'help' to learn what you can do.");
    }
  };

  const answerQuestion = (target) => {
    const answers = {
      company: "We are Outlier, a cutting-edge technology company focused on creating innovative solutions. Our platform helps users build and create amazing things with advanced AI assistance.",
      features: "Our platform offers voice control, motion tracking, reading assistance, and many other accessibility features. You can navigate the site, control elements, and get information through voice commands.",
      pricing: "We offer various subscription plans to suit different needs. You can find detailed pricing information in our pricing section. Would you like me to take you there?",
      support: "We provide 24/7 support through our help center. You can also contact our support team directly through the contact page. Would you like me to show you the support section?",
      community: "Our community is made up of creative individuals and professionals who use our platform to build amazing things. You can join discussions, share your work, and connect with other users.",
      technology: "Our platform uses advanced AI and machine learning to provide intelligent assistance. We combine natural language processing with computer vision to create a seamless experience."
    };

    speak(answers[target] || "I'm not sure about that. Would you like to know about our features, pricing, or support?");
  };

  const executeCommand = (action, target) => {
    switch (action) {
      case 'navigation':
        switch (target) {
          case 'faq':
            document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
            speak("Scrolling to FAQ section.");
            break;
          case 'features':
            document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
            speak("Here are our features.");
            break;
          case 'home':
            window.scrollTo({ top: 0, behavior: 'smooth' });
            speak("Taking you to the top of the page.");
            break;
          case 'community':
            document.querySelector('#community')?.scrollIntoView({ behavior: 'smooth' });
            speak("Here's our community section.");
            break;
          case 'testimonials':
            document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' });
            speak("Here are what our users say about us.");
            break;
          case 'craft':
            document.querySelector('#craft')?.scrollIntoView({ behavior: 'smooth' });
            speak("Here's our crafting section.");
            break;
        }
        break;
      case 'actions':
        switch (target) {
          case 'login':
            document.querySelector('#login-button')?.click();
            speak("Clicked login button.");
            break;
          case 'signup':
            document.querySelector('#signup-button')?.click();
            speak("Clicked sign up button.");
            break;
          case 'menu':
            document.querySelector('.floating-menu-button')?.click();
            speak("Opening the menu.");
            break;
          case 'help':
            speak("You can say 'go to FAQ', 'scroll to features', 'click login', or ask about specific features. You can also ask questions about our company, pricing, or technology.");
            break;
        }
        break;
    }
  };

  const loadVoices = () => {
    try {
      const voices = speechSynthesis.current.getVoices();
      if (voices.length > 0) {
        const preferred = [
          'Google UK English Female', 'Google US English Female', 'Microsoft Zira',
          'Samantha', 'Karen', 'Daniel', 'Moira', 'Tessa'
        ];

        let chosen = preferred
          .map(name => voices.find(v => v.name.includes(name)))
          .find(Boolean);

        if (!chosen) {
          chosen = voices.find(v => v.name.toLowerCase().includes('female') && v.lang.includes('en')) || voices[0];
        }

        selectedVoice.current = chosen;
        voicesLoaded.current = true;
        console.log('Voices loaded successfully:', chosen?.name);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error loading voices:', err);
      return false;
    }
  };

  const attemptVoiceLoading = () => {
    if (voicesLoaded.current) return;

    voiceLoadAttempts.current++;
    console.log(`Attempting to load voices (attempt ${voiceLoadAttempts.current})...`);

    if (loadVoices()) {
      console.log('Voices loaded successfully');
      return;
    }

    if (voiceLoadAttempts.current < 5) {
      setTimeout(attemptVoiceLoading, 1000);
    } else {
      console.error('Failed to load voices after multiple attempts');
    }
  };

  useEffect(() => {
    // Initial voice loading attempt
    attemptVoiceLoading();

    // Set up voice loading handler
    if (speechSynthesis.current.onvoiceschanged !== undefined) {
      speechSynthesis.current.onvoiceschanged = () => {
        if (!voicesLoaded.current) {
          attemptVoiceLoading();
        }
      };
    }

    return () => {
      if (recognition.current) recognition.current.stop();
      speechSynthesis.current.cancel();
      if (commandTimeout.current) {
        clearTimeout(commandTimeout.current);
      }
      if (restartTimeout.current) {
        clearTimeout(restartTimeout.current);
      }
      if (initInterval.current) {
        clearInterval(initInterval.current);
      }
      if (selfSpeechTimeout.current) {
        clearTimeout(selfSpeechTimeout.current);
      }
      if (commandPauseTimeout.current) {
        clearTimeout(commandPauseTimeout.current);
      }
      if (ignoreRestartTimeout.current) {
        clearTimeout(ignoreRestartTimeout.current);
      }
    };
  }, []);

  // Add function to check if text is a valid sentence
  const isValidSentence = (text) => {
    // Basic sentence validation
    const trimmed = text.trim();
    if (trimmed.length < 3) return false; // Too short to be a sentence
    
    // Check for basic sentence structure
    const hasSubject = /(i|you|he|she|it|we|they|this|that|these|those)/i.test(trimmed);
    const hasVerb = /(is|are|was|were|have|has|had|do|does|did|can|could|will|would|should|must|go|goes|went|say|says|said)/i.test(trimmed);
    const hasEndPunctuation = /[.!?]$/.test(trimmed);
    
    // Check for common sentence patterns
    const commonPatterns = [
      /^(what|where|when|why|how|who|which|whose|whom)\s/i, // Questions
      /^(please|kindly|could you|would you|can you)\s/i, // Requests
      /^(i want|i need|i would like|i'm looking for)\s/i, // Desires
      /^(tell me|show me|explain|describe)\s/i, // Commands
      /^(hello|hi|hey|greetings)\s/i, // Greetings
    ];

    return (
      (hasSubject && hasVerb) || // Basic sentence structure
      hasEndPunctuation || // Ends with punctuation
      commonPatterns.some(pattern => pattern.test(trimmed)) || // Common patterns
      trimmed.split(' ').length >= 3 // At least 3 words
    );
  };

  // Add function to handle speech synthesis errors
  const handleSpeechError = (error) => {
    console.error('Speech synthesis error:', error);
    setIsSpeaking(false);

    // If recognition is supposed to be running, restart it
    if (isListening && !isRecognitionRunning.current) {
      console.log('Restarting recognition after speech error...');
      try {
        if (recognition.current) {
          recognition.current.stop();
        }
        setTimeout(() => {
          if (isListening) {
            try {
              recognition.current.start();
              isRecognitionRunning.current = true;
            } catch (err) {
              console.error('Failed to restart recognition after speech error:', err);
              // Try reinitializing if restart fails
              hasInitialized.current = false;
              initializeRecognition();
            }
          }
        }, 1000);
      } catch (err) {
        console.error('Error handling speech error:', err);
      }
    }
  };

  // Update speak function to include pause and error handling
  const speak = (text) => {
    if (!text) {
      console.log('Speech skipped: Empty text');
      return;
    }

    // Clear any existing command pause
    if (commandPauseTimeout.current) {
      clearTimeout(commandPauseTimeout.current);
    }

    // Add a 4-second pause before speaking
    commandPauseTimeout.current = setTimeout(() => {
      console.log('Attempting to speak after pause:', text);

      // Store the text we're about to speak
      lastSpokenText.current = text;
      
      // Set a timeout to clear the last spoken text
      if (selfSpeechTimeout.current) {
        clearTimeout(selfSpeechTimeout.current);
      }
      selfSpeechTimeout.current = setTimeout(() => {
        lastSpokenText.current = '';
      }, 5000);

      // Log voice state
      console.log('Voice state:', {
        hasVoice: !!selectedVoice.current,
        voicesLoaded: voicesLoaded.current,
        availableVoices: speechSynthesis.current.getVoices().length,
        selectedVoice: selectedVoice.current?.name
      });

      // Ensure we have a voice
      if (!selectedVoice.current && !voicesLoaded.current) {
        console.log('Speech delayed: Waiting for voices to load...');
        attemptVoiceLoading();
        return;
      }

      try {
        // Log synthesis state
        console.log('Speech synthesis state:', {
          speaking: speechSynthesis.current.speaking,
          paused: speechSynthesis.current.paused,
          pending: speechSynthesis.current.pending
        });

        // Cancel any ongoing speech
        if (speechSynthesis.current.speaking) {
          console.log('Cancelling ongoing speech');
          speechSynthesis.current.cancel();
        }
        
        const voice = selectedVoice.current || speechSynthesis.current.getVoices()[0];
        console.log('Using voice:', voice?.name || 'default');

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.rate = 0.85;
        utterance.volume = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
          setIsSpeaking(true);
          console.log('Speech started successfully:', text);
        };

        utterance.onend = () => {
          setIsSpeaking(false);
          console.log('Speech completed successfully');
          // Restart recognition after speech ends
          if (isListening && !isRecognitionRunning.current) {
            console.log('Restarting recognition after speech completion...');
            try {
              recognition.current.start();
              isRecognitionRunning.current = true;
            } catch (err) {
              console.error('Failed to restart recognition after speech:', err);
              handleSpeechError(err);
            }
          }
        };

        utterance.onerror = (event) => {
          handleSpeechError(event);
        };

        // Resume if paused
        if (speechSynthesis.current.paused) {
          console.log('Resuming paused speech synthesis');
          speechSynthesis.current.resume();
        }

        // Speak the utterance
        console.log('Initiating speech synthesis');
        speechSynthesis.current.speak(utterance);

        // Add a safety check
        setTimeout(() => {
          if (isSpeaking && !speechSynthesis.current.speaking) {
            console.warn('Speech synthesis may have failed - speaking state mismatch');
            setIsSpeaking(false);
            handleSpeechError({ error: 'timeout' });
          }
        }, 1000);

      } catch (err) {
        handleSpeechError(err);
      }
    }, 4000); // 4-second pause before speaking
  };

  const startListening = async () => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    if (isRecognitionRunning.current) {
      console.log('Recognition already running');
      return;
    }

    try {
      // Check network connectivity first
      const isOnline = navigator.onLine;
      if (!isOnline) {
        console.error('No internet connection');
        alert('Please check your internet connection and try again.');
        return;
      }

      if (!hasInitialized.current) {
        initializeRecognition();
      }

      // Add a small delay before starting to ensure proper initialization
      setTimeout(() => {
        try {
          recognition.current.start();
          console.log('Started listening');
        } catch (err) {
          console.error('Failed to start listening:', err);
          // If start fails, try reinitializing
          hasInitialized.current = false;
          setTimeout(() => {
            if (isListening) {
              initializeRecognition();
            }
          }, 1000);
        }
      }, 100);
    } catch (err) {
      console.error('Error in startListening:', err);
      if (restartTimeout.current) {
        clearTimeout(restartTimeout.current);
      }
      restartTimeout.current = setTimeout(() => {
        if (isListening) {
          startListening();
        }
      }, 1000);
    }
  };

  const stopListening = () => {
    try {
      if (recognition.current) {
        recognition.current.stop();
        isRecognitionRunning.current = false;
      }
      setIsListening(false);
      if (restartTimeout.current) {
        clearTimeout(restartTimeout.current);
      }
      if (initInterval.current) {
        clearInterval(initInterval.current);
      }
    } catch (err) {
      console.error('Error stopping recognition:', err);
    }
  };

  const toggleVoiceControl = async () => {
    if (isListening) {
      stopListening();
      document.body.classList.remove('voice-control-active');
    } else {
      try {
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) return;

        document.body.classList.add('voice-control-active');
        setIsListening(true);
        
        initializeRecognition();
        speak("Voice control activated. You can ask me about our features, navigate the site, or get help. What would you like to do?");

        if (initInterval.current) {
          clearInterval(initInterval.current);
        }
        initInterval.current = setInterval(() => {
          if (!isSpeaking) {
            clearInterval(initInterval.current);
            startListening();
          }
        }, 300);
      } catch (err) {
        console.error('Error toggling voice control:', err);
        stopListening();
      }
    }
  };

  return {
    isListening,
    isSpeaking,
    toggleVoiceControl,
    startListening,
    stopListening,
    speak
  };
};
