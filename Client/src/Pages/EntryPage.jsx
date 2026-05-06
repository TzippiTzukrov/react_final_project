import { useNavigate } from "react-router-dom";
import "../styles/EntryPage.css";
import entryImage from "../Img/laptop-coding.svg";

function Entry() {
  const navigate = useNavigate();

  return (
    <div className="entry">
      <div className="entry-header">
        <img 
          src="/full-logo.png" 
          alt="ConnectPro"
          className="entry-header-logo"
        />
      </div>

      <div className="entry-container">
        <div className="entry-content">
          <div className="entry-left">
            <h1 className="entry-title">Welcome to your professional community</h1>

            <button
              className="btn-signin"
              type="button"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>

            <button
              className="btn-join"
              type="button"
              onClick={() => navigate("/register/step1")}
            >
              Join now
            </button>
          </div>

          <div className="entry-right">
            <img
              className="entry-image"
              src={entryImage}
              alt="Laptop with code editor - ConnectPro"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Entry;
