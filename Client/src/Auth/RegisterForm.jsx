import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterForm.css";
import useForm from "../Hooks/UseForm";
import { useToast } from "../Context/ToastContext";

export default function JoinForm({ SetRegisterStep }) {
  const { values: formData, handleChange, handleSubmitStep1 } = useForm();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    try {
      const result = await handleSubmitStep1();
      if (result === true) {
        SetRegisterStep(2);
        navigate("/register/step2");
      } else if (result === "redirect_to_login") {
        navigate("/login");
      }
    } catch (error) {
      showToast(error.message, "error");
      if (error.message === "Username already exists") {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };
  return (
    <div className="join-wrapper">

      <h1 className="join-title">Make the most of your professional life</h1>

      <form className="join-card" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="show-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <label>Confirm password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <p className="policy-text">
          By clicking Agree & Join, you agree to the User Agreement, Privacy Policy, and Cookie Policy.
        </p>

        <button className="primary-btn" type="submit">
          Agree & Join
        </button>

        <div className="divider">
          <span />
          <p>or</p>
          <span />
        </div>

        <button 
          type="button" 
          className="social-btn google"
          onClick={() => window.open('https://accounts.google.com/oauth/authorize', '_blank')}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            width="18"
            height="18"
          />
          Continue with Google
        </button>

        <button 
          type="button" 
          className="social-btn microsoft"
          onClick={() => window.open('https://login.microsoftonline.com/common/oauth2/v2.0/authorize', '_blank')}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft"
            width="18"
            height="18"
          />
          Continue with Microsoft
        </button>

        <button 
          type="button" 
          className="social-btn apple"
          onClick={() => window.open('https://appleid.apple.com/auth/authorize', '_blank')}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple"
            width="18"
            height="18"
          />
          Continue with Apple
        </button>
      </form>
    </div>
  );
}
