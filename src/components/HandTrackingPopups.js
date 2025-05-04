import React from 'react';
import '../styles/components/HandTrackingPopups.css';

const HandTrackingPopups = ({ 
  showSystemCheck, 
  showCameraPermission, 
  setShowSystemCheck, 
  setShowCameraPermission 
}) => {
  if (!showSystemCheck && !showCameraPermission) return null;

  return (
    <div className="hand-tracking-popups">
      {showSystemCheck && (
        <div className="hand-tracking-popup system-check">
          <div className="popup-content">
            <h3>System Requirements Check</h3>
            <p>Hand tracking requires a computer with:</p>
            <ul>
              <li>WebGL-capable GPU</li>
              <li>8GB RAM or more</li>
              <li>4 CPU cores or more</li>
            </ul>
            <p>Your system may not meet these requirements. Proceeding might cause performance issues.</p>
            <div className="popup-buttons">
              <button onClick={() => setShowSystemCheck(false)}>Cancel</button>
              <button onClick={() => {
                setShowSystemCheck(false);
                setShowCameraPermission(true);
              }}>Proceed Anyway</button>
            </div>
          </div>
        </div>
      )}

      {showCameraPermission && (
        <div className="hand-tracking-popup camera-permission">
          <div className="popup-content">
            <h3>Camera Access Required</h3>
            <p>To enable hand tracking, we need access to your camera.</p>
            <p>Your camera feed will be processed locally and won't be stored or transmitted.</p>
            <div className="popup-buttons">
              <button onClick={() => setShowCameraPermission(false)}>Cancel</button>
              <button onClick={() => setShowCameraPermission(false)}>Allow Camera Access</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandTrackingPopups; 