import React from "react";
import Logo from "../../assets/images/Logo.jpg";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Password reset requested for:", email);
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
          Forgot Password? 🔒
        </h5>
        <p className="text-[#2E263DB2]">
          Enter your email and we'll send you instructions to reset your
          password
        </p>

        <div className="mt-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm w-full"
            placeholder="Email"
            required
          />
        </div>

        <div className="mt-9">
          <button
            type="submit"
            className="bg-[#88191F] text-white px-4 py-2 rounded-sm w-full text-medium text-sm"
          >
            Send Reset Link
          </button>
        </div>

        <div className="text-center mt-4">
          <Link to={-1} className="text-[#88191F] font-normal text-[15px]">
            <span className="text-[var(--primary)]">Back to login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
