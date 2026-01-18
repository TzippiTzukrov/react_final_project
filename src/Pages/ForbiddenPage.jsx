import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function ForbiddenPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleGoBack = () => {
    navigate(-1);
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
          <circle cx="200" cy="200" r="180" fill="#ffe8e8"/>
          <circle cx="200" cy="180" r="35" fill="#8b6f47"/>
          <path d="M 165 180 Q 165 145 200 145 Q 235 145 235 180 Z" fill="#2c1810"/>
          <circle cx="190" cy="180" r="8" fill="none" stroke="#2c3e50" strokeWidth="2"/>
          <circle cx="210" cy="180" r="8" fill="none" stroke="#2c3e50" strokeWidth="2"/>
          <line x1="198" y1="180" x2="202" y2="180" stroke="#2c3e50" strokeWidth="2"/>
          <circle cx="260" cy="140" r="25" fill="white" stroke="#c97d60" strokeWidth="2"/>
          <circle cx="265" cy="165" r="8" fill="white" stroke="#c97d60" strokeWidth="2"/>
          <circle cx="270" cy="180" r="5" fill="white" stroke="#c97d60" strokeWidth="2"/>
          <text x="245" y="155" fontSize="24" fill="#c97d60" fontWeight="bold">STOP</text>
          <rect x="165" y="215" width="70" height="80" fill="#2d5f5d" rx="10"/>
          <path d="M 165 230 Q 140 220 120 200" fill="none" stroke="#2d5f5d" strokeWidth="14" strokeLinecap="round"/>
          <path d="M 235 230 Q 260 210 280 190" fill="none" stroke="#2d5f5d" strokeWidth="14" strokeLinecap="round"/>
          <circle cx="120" cy="200" r="10" fill="#8b6f47"/>
          <circle cx="280" cy="190" r="10" fill="#8b6f47"/>
          <rect x="275" y="175" width="10" height="15" fill="#8b6f47"/>
          <rect x="100" y="310" width="50" height="40" fill="#c97d60" rx="5"/>
          <rect x="110" y="300" width="30" height="20" fill="none" stroke="#c97d60" strokeWidth="4" rx="15"/>
          <circle cx="125" cy="330" r="3" fill="white"/>
          <path d="M 280 280 L 320 350 L 240 350 Z" fill="#f39c12" stroke="#e67e22" strokeWidth="2"/>
          <text x="275" y="325" fontSize="20" fill="white" fontWeight="bold">!</text>
          <rect x="50" y="250" width="80" height="8" fill="#c97d60"/>
          <rect x="60" y="240" width="8" height="30" fill="#c97d60"/>
          <rect x="80" y="240" width="8" height="30" fill="#c97d60"/>
          <rect x="100" y="240" width="8" height="30" fill="#c97d60"/>
          <rect x="120" y="240" width="8" height="30" fill="#c97d60"/>
        </svg>
        
        <h2 className="not-found-subtitle">Access Forbidden</h2>
        <p className="not-found-message">
          You don't have permission to access this resource.
        </p>
        <div className="not-found-actions">
          <button 
            className="btn-home" 
            onClick={handleGoHome}
          >
            Go to your feed
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForbiddenPage;