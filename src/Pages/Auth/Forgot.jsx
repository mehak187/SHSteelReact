import React, { useState } from "react";
import Logo from "../../assets/images/Logo.jpg";
import { useNavigate } from "react-router-dom";
import authAxios from "../../axios/auth";
import toast from "react-hot-toast";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await authAxios.post("/forgot-password", { email });

      toast.success("Reset link sent to your email");
      setEmail("");

      navigate("/", { state: { email } });
    } catch (error) {
      console.error("Error:", error);

      const message =
        error?.response?.data?.message ||
        "An error occurred. Please try again.";
      setErrorMsg(message);
      toast.error(message);
    }
  };

  return (
    <div className="bg-white sm:p-7 px-3 py-4 flex flex-col justify-center gap-4 h-[100dvh]">
      <div>
        <img
          src={Logo}
          alt="Logo"
          className="xl:w-[130px] xl:h-[97px] md:w-[100px] w-[80px] object-contain"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <h5 className="text-[var(--primary)] font-medium text-2md">
          Welcome to S-H Steel! 👋🏻
        </h5>
        <p className="text-[#2E263DB2]">
          Please enter your email to reset your password
        </p>

        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}

        <div className="mt-3">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="mt-9">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#88191F] text-white px-4 py-2 rounded-sm w-full text-medium text-sm"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
