import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function UnauthorizedPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register/step1');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

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
          <circle cx="200" cy="200" r="180" fill="#fff4e6"/>
          <circle cx="200" cy="180" r="35" fill="#8b6f47"/>
          <path d="M 165 180 Q 165 145 200 145 Q 235 145 235 180 Z" fill="#2c1810"/>
          <circle cx="190" cy="180" r="8" fill="none" stroke="#2c3e50" strokeWidth="2"/>
          <circle cx="210" cy="180" r="8" fill="none" stroke="#2c3e50" strokeWidth="2"/>
          <line x1="198" y1="180" x2="202" y2="180" stroke="#2c3e50" strokeWidth="2"/>
          <circle cx="260" cy="140" r="25" fill="white" stroke="#0a66c2" strokeWidth="2"/>
          <circle cx="265" cy="165" r="8" fill="white" stroke="#0a66c2" strokeWidth="2"/>
          <circle cx="270" cy="180" r="5" fill="white" stroke="#0a66c2" strokeWidth="2"/>
          <circle cx="260" cy="140" r="6" fill="none" stroke="#0a66c2" strokeWidth="2"/>
          <rect x="264" y="135" width="10" height="3" fill="#0a66c2"/>
          <rect x="270" y="135" width="2" height="3" fill="#0a66c2"/>
          <rect x="165" y="215" width="70" height="80" fill="#2d5f5d" rx="10"/>
          <path d="M 165 230 Q 150 240 140 260" fill="none" stroke="#2d5f5d" strokeWidth="14" strokeLinecap="round"/>
          <path d="M 235 230 Q 250 240 260 260" fill="none" stroke="#2d5f5d" strokeWidth="14" strokeLinecap="round"/>
          <circle cx="140" cy="260" r="10" fill="#8b6f47"/>
          <circle cx="260" cy="260" r="10" fill="#8b6f47"/>
          <rect x="175" y="310" width="50" height="45" fill="#0a66c2" rx="5"/>
          <rect x="185" y="295" width="30" height="25" fill="none" stroke="#0a66c2" strokeWidth="5" rx="15"/>
          <circle cx="200" cy="335" r="5" fill="white"/>
          <rect x="198" y="340" width="4" height="10" fill="white"/>
          <circle cx="100" cy="300" r="30" fill="none" stroke="#91a88f" strokeWidth="4"/>
          <circle cx="100" cy="295" r="8" fill="none" stroke="#91a88f" strokeWidth="3"/>
          <path d="M 80 320 Q 80 310 100 310 Q 120 310 120 320" fill="none" stroke="#91a88f" strokeWidth="3"/>
          <line x1="75" y1="285" x2="125" y2="315" stroke="#e67e22" strokeWidth="4" strokeLinecap="round"/>
          <rect x="270" y="290" width="50" height="65" fill="white" stroke="#0a66c2" strokeWidth="3" rx="4"/>
          <line x1="275" y1="300" x2="310" y2="300" stroke="#e0e0e0" strokeWidth="2"/>
          <line x1="275" y1="310" x2="315" y2="310" stroke="#e0e0e0" strokeWidth="2"/>
          <line x1="275" y1="320" x2="310" y2="320" stroke="#e0e0e0" strokeWidth="2"/>
          <line x1="275" y1="330" x2="315" y2="330" stroke="#e0e0e0" strokeWidth="2"/>
          <rect x="215" y="270" width="12" height="20" fill="none" stroke="#5a8fa8" strokeWidth="3" rx="6"/>
          <rect x="215" y="285" width="12" height="20" fill="none" stroke="#5a8fa8" strokeWidth="3" rx="6"/>
          <path d="M 60 320 L 60 340 L 50 330 M 60 340 L 70 330" stroke="#f39c12" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <h2 className="not-found-subtitle">Please sign in to continue</h2>
        <p className="not-found-message">
          You need to have an account to access this content. Join ConnectPro to connect with professionals and explore opportunities.
        </p>
        <div className="not-found-actions" style={{ gap: '12px' }}>
          <button 
            className="btn-home" 
            onClick={handleSignUp}
            style={{ background: '#0a66c2', color: 'white', border: 'none' }}
          >
            Sign up
          </button>
          <button 
            className="btn-home" 
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;