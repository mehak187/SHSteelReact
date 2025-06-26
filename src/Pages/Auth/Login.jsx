import React, { useState } from "react";
import Logo from "../../assets/images/Logo.jpg";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import authAxios from "../../axios/auth"; // adjust path if needed

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await authAxios.post("/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMsg("Invalid email or password");
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
          Please sign-in to your account and start the adventure
        </p>

        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}

        <div className="mt-3">
          <input
            type="email"
            className="border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mt-3 border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm flex items-center justify-between w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#88191F] text-[15px]" />
            <label className="text-[var(--primary)]">Remember me</label>
          </div>
          <Link to="" className="text-[#88191F] font-normal text-[15px]">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-9">
          <button
            type="submit"
            className="bg-[#88191F] text-white px-4 py-2 rounded-sm w-full text-medium text-sm"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
