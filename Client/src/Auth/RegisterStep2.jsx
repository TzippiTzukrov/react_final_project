import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterStep2.css";
import useForm from "../Hooks/UseForm";
import { useToast } from "../Context/ToastContext";

export default function RegisterStep2() {
  const { values: formData, handleChange, handleSubmitStep2 } = useForm();
  const [openToWork, setOpenToWork] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSubmitStep2(e);
    if (result) {
      navigate("/home");
    }
  };

  return (
    <div className="register-step2-container">
      <div className="register-step2-content">
        <h1 className="main-title">Complete your profile</h1>
        <p className="subtitle">
          Filling out your profile helps recruiters and connections learn more about you
        </p>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>
            <p className="section-subtitle">Let's start with your basic details</p>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +972-50-123-4567"
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Location</h2>
            <p className="section-subtitle">Where are you based?</p>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  placeholder="e.g., Tel Aviv"
                  required
                />
              </div>

              <div className="form-group">
                <label>Street</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  placeholder="e.g., Rothschild Blvd"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Suite/Apt</label>
                <input
                  type="text"
                  name="address.suite"
                  value={formData.address.suite}
                  onChange={handleChange}
                  placeholder="e.g., Apt 4B"
                />
              </div>

              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="address.zipcode"
                  value={formData.address.zipcode}
                  onChange={handleChange}
                  placeholder="e.g., 6688218"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Professional Experience</h2>
            <p className="section-subtitle">Tell us about your current or most recent position</p>

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company.name"
                value={formData.company.name}
                onChange={handleChange}
                placeholder="e.g., Microsoft"
              />
            </div>

            <div className="form-group">
              <label>Position/Title</label>
              <input
                type="text"
                name="company.catchPhrase"
                value={formData.company.catchPhrase}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div className="form-group">
              <label>Professional Focus</label>
              <input
                type="text"
                name="company.bs"
                value={formData.company.bs}
                onChange={handleChange}
                placeholder="e.g., Full-stack development, Cloud architecture"
              />
              <span className="field-hint">
                Describe your area of expertise or what you specialize in
              </span>
            </div>
          </div>

          <div className="form-section">
            <div className="recruiter-section">
              <div className="recruiter-card">
                <div className="recruiter-content">
                  <h3>Let recruiters know you're open to new jobs</h3>
                  <p>
                    Share with recruiters - This will show people using ConnectPro Recruiter 
                    that you're looking for a new job.
                  </p>
                  <p className="privacy-note">
                    We take steps to not show recruiters at your current company, though 
                    we can't guarantee complete privacy.{" "}
                    <a href="#" className="learn-more" onClick={(e) => e.preventDefault()}>Learn more about your privacy</a>
                  </p>
                </div>
                <div className="toggle-switch-container">
                  <input
                    type="checkbox"
                    id="openToWork"
                    checked={openToWork}
                    onChange={() => setOpenToWork(!openToWork)}
                  />
                  <label htmlFor="openToWork" className="toggle-switch-slider"></label>
                  <span className="toggle-label">{openToWork ? "On" : "Off"}</span>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
}
