import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginForm.css";
import { useAuth } from "../Hooks/useAuth";
import { useToast } from "../Context/ToastContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isValidData = () => {
    return username && password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidData()) {
      showToast("Please fill in all fields", "error");
      return;
    }
    const formData = {
      username,
      password,
    };

    try {
      await login(formData);
      navigate("/home");
    } catch (error) {
      showToast("Invalid username or password", "error");
    }
  };

  return (

    <form className="container" onSubmit={handleSubmit}>
      <h1>Sign in</h1>

      <button
        type="button"
        className="social google"
        onClick={() => window.open('https://accounts.google.com/oauth/authorize', '_blank')}
      >
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" width="18" height="18" />
        Continue with Google
      </button>

      <button
        type="button"
        className="social microsoft"
        onClick={() => window.open('https://login.microsoftonline.com/common/oauth2/v2.0/authorize', '_blank')}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" width="18" height="18" />
        Sign in with Microsoft
      </button>

      <button
        type="button"
        className="social apple"
        onClick={() => window.open('https://appleid.apple.com/auth/authorize', '_blank')}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" width="18" height="18" />
        Sign in with Apple
      </button>

      <p className="policy">
        By clicking Continue, you agree to the User Agreement,
        Privacy Policy, and Cookie Policy.
      </p>

      <div className="divider">
        <span />
        <p>or</p>
        <span />
      </div>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className="show"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
      <button type="submit" className="signin">
        Sign in
      </button>
    </form>
  );
}