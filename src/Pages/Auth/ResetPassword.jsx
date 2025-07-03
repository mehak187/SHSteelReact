import React from "react";
import Logo from "../../assets/images/Logo.jpg";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const location = useLocation();
  const email = location.state?.email || "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Password reset for:", email, "New password:", password);
    // Typically you would send this to your backend
  };

  return (
    <div className="bg-white sm:p-7 px-3 py-4 flex flex-col justify-center gap-4 h-[100dvh]">
      <div>
        <img
          src={Logo}
          alt=""
          className="xl:w-[130px] xl:h-[97px] xl:max-w-[130px] md:w-[100px] md:h-[97px] md:max-w-[100px] w-[80px] max-w-[80px] object-contain"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <h5 className="text-[var(--primary)] font-medium text-2md">
          Reset Password 🔒
        </h5>
        <p className="text-[#2E263DB2]">
          {email && `For ${email}`} Enter your new password below
        </p>

        {/* New Password Field */}
        <div className="mt-3 border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm flex items-center justify-between w-full">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none"
            placeholder="New Password"
            required
            minLength={8}
          />
          {showPassword ? (
            <RiEyeOffLine
              className="text-xl cursor-pointer text-[#88191F]"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <RiEyeLine
              className="text-xl cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mt-3 border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm flex items-center justify-between w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full outline-none"
            placeholder="Confirm New Password"
            required
            minLength={8}
          />
          {showConfirmPassword ? (
            <RiEyeOffLine
              className="text-xl cursor-pointer text-[#88191F]"
              onClick={toggleConfirmPasswordVisibility}
            />
          ) : (
            <RiEyeLine
              className="text-xl cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            />
          )}
        </div>

        {/* Password Requirements Hint (optional) */}
        <p className="text-xs text-[#2E263D66] mt-1">
          Password must be at least 8 characters long
        </p>

        <div className="mt-9">
          <button
            type="submit"
            className="bg-[#88191F] text-white px-4 py-2 rounded-sm w-full text-medium text-sm"
          >
            Reset Password
          </button>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-[#88191F] font-normal text-[15px]">
            <span className="text-[var(--primary)]">Back to login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
