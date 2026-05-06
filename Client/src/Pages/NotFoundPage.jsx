import { useNavigate } from "react-router-dom";
import "../styles/NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <header className="header">
        <img 
          src="/full-logo.png" 
          alt="ConnectPro"
          className="connectpro-logo"
        />
      </header>
      
      <div className="not-found-content">
        <svg className="illustration" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="180" fill="#e8f5fa"/>
          <circle cx="200" cy="180" r="35" fill="#8b6f47"/>
          <path d="M 165 180 Q 165 145 200 145 Q 235 145 235 180 Z" fill="#2c1810"/>
          <circle cx="190" cy="180" r="8" fill="none" stroke="#2c3e50" strokeWidth="2"/>
          <circle cx="210" cy="180" r="8" fill="none" stroke="#2c3e50" strokeWidth="2"/>
          <line x1="198" y1="180" x2="202" y2="180" stroke="#2c3e50" strokeWidth="2"/>
          <circle cx="260" cy="140" r="25" fill="white" stroke="#0a66c2" strokeWidth="2"/>
          <circle cx="265" cy="165" r="8" fill="white" stroke="#0a66c2" strokeWidth="2"/>
          <circle cx="270" cy="180" r="5" fill="white" stroke="#0a66c2" strokeWidth="2"/>
          <text x="250" y="155" fontSize="28" fill="#0a66c2" fontWeight="bold">?</text>
          <rect x="165" y="215" width="70" height="80" fill="#2d5f5d" rx="10"/>
          <path d="M 165 230 Q 140 220 120 200" fill="none" stroke="#2d5f5d" strokeWidth="14" strokeLinecap="round"/>
          <path d="M 235 230 Q 260 220 280 200" fill="none" stroke="#2d5f5d" strokeWidth="14" strokeLinecap="round"/>
          <circle cx="120" cy="200" r="10" fill="#8b6f47"/>
          <circle cx="280" cy="200" r="10" fill="#8b6f47"/>
          <circle cx="120" cy="320" r="35" fill="none" stroke="#5a8fa8" strokeWidth="6"/>
          <line x1="145" y1="345" x2="170" y2="370" stroke="#5a8fa8" strokeWidth="8" strokeLinecap="round"/>
          <rect x="250" y="280" width="60" height="80" fill="white" stroke="#c97d60" strokeWidth="3" rx="4"/>
          <line x1="255" y1="285" x2="280" y2="290" stroke="#e0e0e0" strokeWidth="2"/>
          <line x1="255" y1="295" x2="285" y2="300" stroke="#e0e0e0" strokeWidth="2"/>
          <line x1="265" y1="320" x2="295" y2="350" stroke="#c97d60" strokeWidth="4" strokeLinecap="round"/>
          <line x1="295" y1="320" x2="265" y2="350" stroke="#c97d60" strokeWidth="4" strokeLinecap="round"/>
          <rect x="60" y="250" width="20" height="35" fill="none" stroke="#91a88f" strokeWidth="4" rx="10"/>
          <rect x="50" y="280" width="20" height="35" fill="none" stroke="#91a88f" strokeWidth="4" rx="10"/>
          <line x1="70" y1="285" x2="60" y2="280" stroke="#c97d60" strokeWidth="3"/>
          <line x1="75" y1="290" x2="65" y2="285" stroke="#c97d60" strokeWidth="3"/>
        </svg>
        
        <h2 className="not-found-subtitle">This page doesn't exist</h2>
        <p className="not-found-message">
          Please check your URL or return to ConnectPro home.
        </p>
        <div className="not-found-actions">
          <button 
            className="btn-home" 
            onClick={() => navigate("/home")}
          >
            Go to your feed
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
