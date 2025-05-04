import React from 'react';
import '../styles/components/HandTrackingPopups.css';
import * as tf from '@tensorflow/tfjs';

const HandTrackingPopups = ({
  showSystemCheck,
  showCameraPermission,
  showLoading,
  showInstruction,
  setShowSystemCheck,
  setShowCameraPermission,
  setShowInstruction,
  initializeCamera
}) => {
  const getSystemSpecs = () => {
    return {
      gpu: tf.getBackend() === 'webgl' ? 'Available' : 'Not Available',
      memory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown',
      cores: navigator.hardwareConcurrency || 'Unknown'
    };
  };

  return (
    <>
      {showCameraPermission && (
        <div className="hand-tracking-popup camera-permission">
          <h2>Camera Access Required</h2>
          <p>Please allow camera access to enable hand tracking.</p>
          <button onClick={initializeCamera}>Enable Camera</button>
        </div>
      )}

      {showSystemCheck && (
        <div className="hand-tracking-popup system-check">
          <h2>System Requirements Check</h2>
          <div className="specs-container">
            <div className="required-specs">
              <h3>Required Specifications:</h3>
              <ul>
                <li>WebGL-capable GPU</li>
                <li>8GB RAM</li>
                <li>4 CPU cores</li>
              </ul>
            </div>
            <div className="current-specs">
              <h3>Your System:</h3>
              <ul>
                <li>GPU: {getSystemSpecs().gpu}</li>
                <li>RAM: {getSystemSpecs().memory}</li>
                <li>CPU Cores: {getSystemSpecs().cores}</li>
              </ul>
            </div>
          </div>
          <button onClick={() => setShowSystemCheck(false)}>Continue</button>
        </div>
      )}

      {showLoading && (
        <div className="hand-tracking-popup loading">
          <div className="loading-spinner"></div>
          <h2>Initializing Hand Tracking</h2>
          <p>Please wait while we set up the motion experience...</p>
        </div>
      )}

      {showInstruction && (
        <div className="hand-tracking-popup instruction">
          <h2>How to Use Motion Controls</h2>
          <div className="instruction-content">
            <div className="instruction-item">
              <i className="fas fa-hand-pointer"></i>
              <p>Move your hand to control the cursor</p>
            </div>
            <div className="instruction-item">
              <i className="fas fa-hand-back-fist"></i>
              <p>Make a fist to click</p>
            </div>
            <div className="instruction-item">
              <i className="fas fa-arrows-up-down"></i>
              <p>Move hand up/down to scroll</p>
            </div>
          </div>
          <button onClick={() => setShowInstruction(false)}>Got it!</button>
        </div>
      )}
    </>
  );
};

export default HandTrackingPopups; 