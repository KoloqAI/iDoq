import { Button } from "antd";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

import "./LandingPage.css";
import { UnstractBlackLogo } from "../assets";
import { ProductContentLayout } from "../components/log-in/ProductContentLayout";

function LandingPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    console.log("Register button clicked");
    navigate("/register");
  };

  const handleLogin = () => {
    console.log("Login link clicked");
    navigate("/login");
  };

  return (
    <div className="landing-main">
      {/* Debug info */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'yellow', padding: '5px', zIndex: 1000 }}>
        Landing Page Loaded - Register Button Should Be Visible
      </div>
      
      <Row>
        <Col xs={24} md={12} className="landing-left-section">
          <div className="landing-content-wrapper">
            <UnstractBlackLogo className="logo" />
            <div className="landing-buttons">
              <Button
                className="register-button button-margin"
                type="primary"
                size="large"
                onClick={handleRegister}
                style={{
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  height: "50px",
                  width: "100%",
                  maxWidth: "300px"
                }}
              >
                Get Started
              </Button>
              <div className="landing-link">
                Already have an account?{" "}
                <a href="#" onClick={handleLogin}>
                  Login here
                </a>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12} className="landing-right-section">
          <ProductContentLayout />
        </Col>
      </Row>
    </div>
  );
}

export { LandingPage };
