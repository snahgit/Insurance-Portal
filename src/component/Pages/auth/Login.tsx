import React, { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { messaging } from "../../../../firebase";
import { getToken } from "firebase/messaging";
import { useFieldValidation } from "../../../custom_hooks/useZodValidation";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { Button } from "@mantine/core";
import type { UserLoginProps } from "../../../types/UserInterface";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { login } from "../../../redux/slices/UserAuthenticationSlices";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  MoveDirection,
  OutMode,
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";
import { getLoginSchema } from "../../../services/zod_schema/zodLoginSchema";
import ErrorIndicator from "../../includes/ErrorIndicator";

const Login = () => {
  const [userDetails, setUserDetails] = useState<UserLoginProps>({
    email: "",
    password: "",
    userrole: 3,
    userType: 2,
    firebaseToken: "",
    gRecaptchaResponse: "",
  });

  const [showPasswordScreen, setShowPasswordScreen] = useState(() => {
    const stored = localStorage.getItem("showPasswordScreen");
    return stored === "true";
  });

  const [init, setInit] = useState(false);

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

  const { errors, validateAll, validateField } =
    useFieldValidation(loginSchema);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleSubmit = async () => {
    if (!validateAll(userDetails)) {
      return true;
    } else {
      console.log(executeRecaptcha);
      if (executeRecaptcha && validateAll(userDetails)) {
        let gRecaptchaResponse = await executeRecaptcha("login");
        const dataToSend = { ...userDetails, gRecaptchaResponse };
        dispatch(login(dataToSend));
      }
    }
  };

  const particlesLoaded = async (_container?: Container): Promise<void> => { };

  const options: ISourceOptions = useMemo(
    () => ({
      style: {
        position: "absolute",
        width: "100%",
        height: "100%",
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 6,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"],
        },
        links: {
          color: "#8b5cf6",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: true,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 50,
        },
        opacity: {
          value: 0.4,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Interactive Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100"></div>

      {/* Animated Geometric Patterns */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="rgba(99, 102, 241, 0.1)"
                strokeWidth="1"
              />
            </pattern>
            <pattern
              id="dots"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="2" fill="rgba(139, 92, 246, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Interactive Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-cyan-300/30 rounded-full blur-sm hover:blur-none transition-all duration-500 cursor-pointer"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-r from-pink-200/30 to-rose-300/30 rounded-full blur-sm hover:blur-none transition-all duration-500 cursor-pointer"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-emerald-200/30 to-cyan-300/30 rounded-full blur-sm hover:blur-none transition-all duration-500 cursor-pointer"></div>
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-orange-200/30 to-yellow-300/30 rounded-full blur-sm hover:blur-none transition-all duration-500 cursor-pointer"></div>

      {/* Particles Background */}
      {init && (
        <Particles
          id="tsparticlesOne"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-6xl flex items-stretch mx-auto">
          {/* Left Side - Brand Section */}
          <div
            className="hidden lg:flex lg:w-1/2 relative"
            style={{
              fontFamily: '"Nunito Sans", sans-serif',
            }}
          >
            <div className="w-full bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-8 flex flex-col justify-center shadow-2xl relative overflow-hidden hover:shadow-3xl transition-all duration-500">
              {/* Interactive Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-pink-500/5 hover:from-blue-500/10 hover:via-cyan-500/10 hover:to-pink-500/10 transition-all duration-500"></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl mb-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                    Welcome to SNAH
                  </h1>
                  <p className="text-gray-600 text-lg font-medium">
                    Your Health, Our Priority
                  </p>
                </div>

                <div className="space-y-6 w-full">
                  <div className="slider-container pb-16">
                    <Slider key="healthcare-slider" {...settings}>
                      <div>
                        <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-200/50 hover:border-blue-300/70 transition-all duration-300 hover:shadow-lg  group">
                          <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                            Transform Healthcare
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            One Patient at a Time. One Mission. Revolutionizing
                            healthcare delivery with cutting-edge technology.
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="bg-gradient-to-br from-cyan-50/80 to-cyan-100/60 backdrop-blur-sm rounded-2xl p-8 border border-cyan-200/50 hover:border-cyan-300/70 transition-all duration-300 hover:shadow-lg cursor-pointer group">
                          <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-cyan-700 transition-colors duration-300">
                            Stronger Together
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            Building stronger healthcare communities. Improving
                            access to quality care for everyone.
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="bg-gradient-to-br from-emerald-50/80 to-emerald-100/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-300 hover:shadow-lg cursor-pointer group">
                          <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-emerald-700 transition-colors duration-300">
                            Seamless Experience
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            We merge technology with care to create a seamless
                            healthcare experience for all.
                          </p>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            {!showPasswordScreen ? (
              <div className="w-full max-w-md">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center">
                        <img
                          className="w-20 h-20 rounded-lg"
                          src="/images/logo.jpeg"
                          alt="SNAH Logo"
                        />
                      </div>
                      <h2
                        className="text-4xl font-bold text-gray-800 mb-2"
                        style={{
                          fontFamily: '"Nunito Sans", sans-serif',
                        }}
                      >
                        Welcome Back
                      </h2>
                      <p
                        className="text-gray-600 text-sm"
                        style={{
                          fontFamily: '"Nunito Sans", sans-serif',
                        }}
                      >
                        Sign in to your account to continue
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label
                          className="block text-sm font-semibold text-gray-700"
                          style={{
                            fontFamily: '"Nunito Sans", sans-serif',
                          }}
                        >
                          Email Address
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                              />
                            </svg>
                          </div>
                          <input
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                            type="email"
                            style={{
                              border: errors.email && "2px solid #ef4444",
                              backgroundColor: errors.email && "#fef2f2",
                            }}
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                          />
                        </div>
                        {errors.email && (
                          <ErrorIndicator error={errors.email} />
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          className="block text-sm font-semibold text-gray-700"
                          style={{
                            fontFamily: '"Nunito Sans", sans-serif',
                          }}
                        >
                          Password
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          </div>
                          <input
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                            type="password"
                            name="password"
                            style={{
                              border: errors.password && "2px solid #ef4444",
                              backgroundColor: errors.password && "#fef2f2",
                            }}
                            onChange={handleChange}
                            placeholder="Enter your password"
                          />
                        </div>
                        {errors.password && (
                          <ErrorIndicator error={errors.password} />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                          <input
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            id="checkbox1"
                            type="checkbox"
                          />
                          <span
                            className="ml-2 text-sm text-gray-600"
                            style={{
                              fontFamily: '"Nunito Sans", sans-serif',
                            }}
                          >
                            Remember me
                          </span>
                        </label>
                        <button
                          type="button"
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          style={{
                            fontFamily: '"Nunito Sans", sans-serif',
                          }}
                          onClick={handleShowPassword}
                        >
                          Forgot password?
                        </button>
                      </div>

                      {/* Login Button */}
                      <Button
                        variant="filled"
                        fullWidth
                        loading={loading}
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 border-0 rounded-xl py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                        onClick={handleSubmit}
                        style={{
                          fontFamily: '"Nunito Sans", sans-serif',
                          letterSpacing: "0.5px",
                        }}
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-30 h-30 rounded-2xl mb-4">
                        <img
                          className="w-20 h-20 rounded-lg"
                          src="/images/logo.jpeg"
                          alt="SNAH Logo"
                        />
                      </div>
                      <h2 className="text-4xl font-semibold text-gray-800 mb-2">
                        Reset Password
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Enter your email to receive reset instructions
                      </p>
                    </div>

                    {/* Reset Form */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Email Address
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                              />
                            </svg>
                          </div>
                          <input
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                            type="email"
                            style={{
                              border: errors.email && "2px solid #ef4444",
                              backgroundColor: errors.email && "#fef2f2",
                            }}
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                          />
                        </div>
                        {errors.email && (
                          <ErrorIndicator error={errors.email} />
                        )}
                      </div>

                      <Button
                        variant="filled"
                        fullWidth
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 border-0 rounded-xl py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                        onClick={handleSubmit}
                      >
                        Send Reset Link
                      </Button>

                      <button
                        type="button"
                        className="w-full text-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200 py-2"
                        onClick={handleShowPassword}
                      >
                        ← Back to Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
