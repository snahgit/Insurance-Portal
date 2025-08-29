import React, { useEffect, useState } from "react";
import { messaging } from "../../../../firebase";
import { getToken } from "firebase/messaging";
import { useFieldValidation } from "../../../custom_hooks/useZodValidation";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { Button, PasswordInput } from "@mantine/core";
import type { UserLoginProps } from "../../../types/UserInterface";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { login } from "../../../redux/slices/UserAuthenticationSlices";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getLoginSchema } from "../../../services/zod_schema/zodLoginSchema";

const ResetPassword = () => {
  const [userDetails, setUserDetails] = useState<UserLoginProps>({
    email: "",
    password: "",
    userrole: 3,
    userType: 2,
    firebaseToken: "",
    gRecaptchaResponse: "",
  });

  const [__showPasswordScreen, setShowPasswordScreen] = useState(() => {
    const stored = localStorage.getItem("showPasswordScreen");
    return stored === "true";
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleShowPassword = () => {
    setShowPasswordScreen((prev) => {
      const newValue = !prev;
      localStorage.setItem("showPasswordScreen", String(newValue));
      return newValue;
    });
  };

  const language = useSelector((state: RootState) => state.language.language);
  const loginSchema = getLoginSchema(language);

  const { validateAll, validateField } =
    useFieldValidation(loginSchema);

  (e: React.ChangeEvent<HTMLInputElement>) => {
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
    validateField(name as "email" | "password", value);
  };

  const vapidKey = import.meta.env.VAPID_KEY;
  const requestPermissionAndGetToken = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const currentToken = await getToken(messaging, { vapidKey });
        if (currentToken) {
          setUserDetails((prev) => {
            return { ...prev, firebaseToken: currentToken };
          });
        } else {
          console.warn("No registration token available");
        }
      } catch (error) {
        console.warn("An error occurred while retrieving token. ", error);
      }
    }
  };
  const authenticationData = useAppSelector((state) => {
    return state.authentication;
  });

  const { loading } = authenticationData;
  const dispatch = useAppDispatch();

  useEffect(() => {
    requestPermissionAndGetToken();
  }, []);

  const handleSubmit = async () => {
    if (!validateAll(userDetails)) return true;
    else {
      if (executeRecaptcha && validateAll(userDetails)) {
        let gRecaptchaResponse = await executeRecaptcha("login");
        const dataToSend = { ...userDetails, gRecaptchaResponse };
        dispatch(login(dataToSend));
      }
    }
  };

  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   arrows: false,
  // };

  return (
    <div className="container-fluid p-0">
      <div className="loginMainContainer">
        <div className="loginInnerContainer">
          <div className="login-main resetPassword">
            <div className="logoImgDIv">
              <img
                className="img-fluid for-light"
                src="/images/logo.jpeg"
                alt="looginpage"
              />
            </div>
            <div className="theme-form">
              <h4>Reset Password</h4>
              <p>Enter your password to reset</p>
              <PasswordInput
                withAsterisk
                placeholder="Password"
                size="md"
                className="resetPasswordInput"
              />
              <PasswordInput
                withAsterisk
                size="md"
                placeholder="Confirm Password"
              />
              <Button
                variant="filled"
                fullWidth
                loading={loading}
                style={{ marginTop: "1rem" }}
                className="commonBtn"
                onClick={handleSubmit}
              >
                Submit to reset password
              </Button>
              <p
                className="forgotPassword"
                style={{ marginTop: "1rem" }}
                onClick={handleShowPassword}
              >
                Back to Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
