import RegisterForm from "../Auth/RegisterForm"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import RegisterStep2 from "../Auth/RegisterStep2";
import { FormProvider } from "../Context/FormContext";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [RegisterStep, SetRegisterStep] = useState(1)

  useEffect(() => {
    const path = location.pathname;
    if (path === '/register/step2') {
      SetRegisterStep(2);
    } else {
      SetRegisterStep(1);
    }
  }, [location.pathname]);

  return (
    <FormProvider>
      <div className="register-page">
        <div className="connectpro-header">
          <img 
            src="/full-logo.png" 
            alt="ConnectPro"
            className="connectpro-logo"
            onClick={() => navigate("/entry")}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {RegisterStep === 1 && (
          <>
            <RegisterForm SetRegisterStep={SetRegisterStep} />
            <div className="signup">
              <span>Already on ConnectPro?</span>
              <button type="button" onClick={() => navigate("/login")}>
                Sign in
              </button>
            </div>
          </>
        )}

        {RegisterStep === 2 && <RegisterStep2 />}
      </div>
    </FormProvider>
  )
}
export default Register;
