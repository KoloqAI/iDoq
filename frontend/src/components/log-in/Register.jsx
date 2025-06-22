import { Button } from "antd";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { getBaseUrl } from "../../helpers/GetStaticData";
import "./Login.css";
import { UnstractBlackLogo } from "../../assets";
import { ProductContentLayout } from "./ProductContentLayout";

let RegisterForm = null;
try {
  RegisterForm =
    require("../../plugins/register-form/RegisterForm").RegisterForm;
} catch {
  // The components will remain null of it is not available
}

function Register() {
  const baseUrl = getBaseUrl();
  const newURL = baseUrl + "/api/v1/signup";
  const navigate = useNavigate();

  const handleRegister = () => {
    window.location.href = newURL;
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/landing");
  };

  return (
    <div className="login-main">
      <Row>
        {RegisterForm ? (
          <RegisterForm handleRegister={handleRegister} />
        ) : (
          <>
            <Col xs={24} md={12} className="login-left-section">
              <div className="button-wraper">
                <Button
                  className="back-button"
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <UnstractBlackLogo className="logo" />
                <div>
                  <Button
                    className="login-button button-margin"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                  <div className="login-link">
                    Already have an account?{" "}
                    <a href="#" onClick={handleLogin}>
                      Login here
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12} className="login-right-section">
              <ProductContentLayout />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}

export { Register };
