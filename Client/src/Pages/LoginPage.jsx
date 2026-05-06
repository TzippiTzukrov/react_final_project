import LoginForm from "../Auth/LoginForm";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="connectpro-header">
        <img 
          src="/full-logo.png" 
          alt="ConnectPro"
          className="connectpro-logo"
          onClick={() => navigate("/entry")}
          style={{ cursor: 'pointer' }}
        />
      </div>
      
      <LoginForm />
      
      <div className="login-footer">
        <span>New to ConnectPro?</span>
        <button type="button" onClick={() => navigate("/register/step1")}>
          Join now
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
