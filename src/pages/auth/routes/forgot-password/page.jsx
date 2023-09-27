import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import axios from "axios";
import PinInput from "react-pin-input";
import { Icons } from "@/components/icons";
import { BASE_URL } from "@/config/api-base-config";

const ForgotPassword = () => {
  const { theme } = useTheme();

  // Navigation
  const navigate = useNavigate();

  const [otpHash, setOtpHash] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allowedToReset, setAllowedToReset] = useState(false);
  // Password change input fields
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP CODE INPUT
  const [otpCode, setOTPCode] = useState(null);

  // Validate email input field
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setInvalid("Email is invalid");
    } else {
      setInvalid(null);
    }

    setEmail(event.target.value);
  };

  const requestOTPMethod = async (email) => {
    // const token = JSON.parse(localStorage.getItem("rtoken"));

    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/otp-request`, {
        email: email,
      });
      // const data = await response.json();
      setOtpHash(response.data.data);
      // Notify success here using your notification library

      toast.success("Check your email!");

      // console.log(response.data.data);
      setLoading(false);
    } catch (err) {
      // Handle any errors and notify accordingly
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTPMethod = async (email, otp) => {
    // console.log("Email:", email);
    // console.log("OTP:", otp);
    // console.log("Hash:", otpHash);
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/otp-verify`, {
        email: email,
        otp: otp,
        hash: otpHash, // Use the otpHash parameter
      });

      // console.log("Response:", response); // Debugging

      if (response.status === 200) {
        // console.log("Email:", email);
        // console.log("OTP:", otp);
        // console.log("Hash:", otpHash); // This should be the same as the parameter

        setAllowedToReset(true);

        toast.success("Verified!");

        setLoading(false);
      } else {
        console.error("Verification failed"); // Debugging
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", err); // Debugging

      toast.error("Something went wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (email, hash) => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken"));

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setLoading(true);

    try {
      await axios.put(`${BASE_URL}/users/update-password/${email}`, {
        hash: hash,
      });

      setLoading(false);

      toast.success("Password updated, now login");

      navigate("/login");
      return;
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex  h-screen  w-full justify-center content-center items-center">
        {otpHash === null ? (
          <div className="flex flex-col items-center mb-[100px]">
            <div className="h-[70px] w-[70px]">
              <img
                src="https://media.publit.io/file/StockPics/ThinkingEmoji.webp"
                alt=""
                draggable={false}
              />
            </div>
            <span className="text-[20px] font-medium mt-[10px] dark:text-white">
              Forgot password?
            </span>
            <span className="text-center mt-[5px] text-[14px] text-[#5e5e5e] dark:text-[#9c9c9c]">
              Enter your email that you used to create your account, <br /> and
              we will send an OTP code to verify.
            </span>

            <div className="flex flex-col items-start mt-[25px] w-[240px]">
              <div className="relative z-0   w-[240px]  group  ">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[2px] border-[#DEDEE0] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#DEDEE0] peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
            </div>
            {/* Button */}
            {invalid || email === "" ? (
              <button className="flex flex-row items-center space-x-2 w-[240px] h-[40px] bg-[#cbcbcb] mt-[15px] rounded-lg cursor-pointer">
                <span className="items-center content-center justify-center w-full text-white ">
                  Send OTP
                </span>
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={async () => {
                  await requestOTPMethod(email);
                  // navigate("/verify");
                }}
                className="flex flex-row w-[240px] h-[40px] bg-blue-500 mt-[15px] rounded-lg cursor-pointer items-center hover:scale-105 transition-all duration-200 hover:bg-blue-400"
              >
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span className="items-center content-center justify-center w-full text-white ">
                  Send OTP
                </span>
              </button>
            )}

            <button
              onClick={() => {
                navigate("/login");
              }}
              className="flex flex-row items-center mt-[15px] cursor-pointer  "
            >
              <ArrowLeft className="text-[#8D8D8D] scale-110 mr-[7px]" />
              <span className="text-[#8D8D8D] text-[14px] ">Back to login</span>
            </button>
          </div>
        ) : otpHash !== null && allowedToReset === true ? (
          <>
            {/* 3 -> PASSWORD RESET */}
            <div className="flex flex-col items-center mb-[100px]">
              <div className="h-[70px] w-[70px]">
                <img
                  src="https://media.publit.io/file/StockPics/ThinkingEmoji.webp"
                  alt=""
                  draggable={false}
                />
              </div>
              <span className="text-[20px] font-medium mt-[10px] dark:text-white">
                Reset password
              </span>

              <div className="flex flex-col items-start mt-[25px] w-[240px]">
                {/* New password */}
                <div className="relative z-0   w-[240px]  group  ">
                  <input
                    type="password"
                    name="floating_change_password"
                    id="floating_change_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[2px] border-[#DEDEE0] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#DEDEE0] peer"
                    placeholder=" "
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label
                    htmlFor="floating_change_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    New password
                  </label>
                </div>
                {/* Confirm new password */}
                <div className="relative z-0   w-[240px]  group mt-[22px] mb-[15px]">
                  <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[2px] border-[#DEDEE0] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#DEDEE0] peer"
                    placeholder=" "
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirm new password
                  </label>
                </div>
              </div>
              {/* Button */}
              <button
                disabled={
                  loading ||
                  newPassword == "" ||
                  confirmPassword == "" ||
                  newPassword !== confirmPassword
                }
                onClick={() => {
                  updatePassword(email, confirmPassword);
                  // console.log(email);
                  // console.log(confirmPassword);
                }}
                className="flex flex-row w-[240px] h-[40px] bg-blue-500 mt-[15px] rounded-lg cursor-pointer items-center hover:scale-105 transition-all duration-200 hover:bg-blue-400"
              >
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span className="items-center content-center justify-center w-full text-white ">
                  Confirm
                </span>
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="flex flex-row items-center mt-[15px] cursor-pointer  "
              >
                <ArrowLeft className="text-[#8D8D8D] scale-110 mr-[7px]" />
                <span className="text-[#8D8D8D] text-[14px] ">
                  Back to login
                </span>
              </button>
            </div>
          </>
        ) : otpHash !== null ? (
          <>
            {/* 2 -> OTP VERIFICATION PAGE */}
            <div className="flex flex-col items-center mb-[100px]">
              <div className="h-[100px] w-[100px]">
                <img
                  src="https://media.publit.io/file/StockPics/VerifyEmail.webp"
                  alt=""
                  draggable={false}
                />
              </div>
              <span className="text-[20px] font-medium mt-[10px] dark:text-white">
                Verification
              </span>
              <span className="text-center mt-[5px] text-[14px] text-[#5e5e5e] dark:text-[#9c9c9c]">
                Enter OTP code sent to your email.
              </span>

              <div className="flex flex-col items-center mt-[10px] w-[260px]">
                {theme === "light" ? (
                  <PinInput
                    length={4}
                    initialValue=""
                    onChange={(value, index) => {
                      setOTPCode(value);
                    }}
                    type="numeric"
                    inputMode="number"
                    style={{ padding: "10px" }}
                    inputStyle={{ borderColor: "#5e5e5e", borderRadius: "5px" }}
                    inputFocusStyle={{ borderColor: "#706fe6" }}
                    onComplete={(value, index) => {
                      setOTPCode(value);
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  />
                ) : (
                  <PinInput
                    length={4}
                    initialValue=""
                    onChange={(value, index) => {
                      setOTPCode(value);
                    }}
                    type="numeric"
                    inputMode="number"
                    style={{ padding: "10px" }}
                    inputStyle={{
                      borderColor: "#5e5e5e",
                      borderRadius: "5px",
                      color: "#fff",
                    }}
                    inputFocusStyle={{ borderColor: "#706fe6" }}
                    onComplete={(value, index) => {
                      setOTPCode(value);
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  />
                )}
              </div>
              {/* Button */}
              <button
                disabled={loading}
                onClick={() => {
                  if (otpCode !== null && otpCode.length === 4) {
                    // navigate("/reset");

                    verifyOTPMethod(email, otpCode);
                  } else {
                    // console.log("Nope");
                  }
                }}
                className="flex flex-row w-[240px] h-[40px] bg-blue-500 mt-[15px] rounded-lg cursor-pointer items-center hover:scale-105 transition-all duration-200 hover:bg-blue-400"
              >
                {loading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span className="items-center content-center justify-center w-full text-white ">
                  Continue
                </span>
              </button>
              <button
                onClick={() => {
                  setOtpHash(null);
                }}
                className="flex flex-row items-center mt-[15px] cursor-pointer  "
              >
                <ArrowLeft className="text-[#8D8D8D] scale-110 mr-[7px]" />
                <span className="text-[#8D8D8D] text-[14px] ">Back</span>
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
