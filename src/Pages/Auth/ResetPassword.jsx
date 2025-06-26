import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authAxios from "../../axios/auth";
import toast from "react-hot-toast";
import Logo from "../../assets/images/Logo.jpg";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: email || "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await authAxios.post("/reset-password", {
        token,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });

      toast.success("Password reset successfully!");
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong. Try again.";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
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
          Reset Your Password 🔐
        </h5>
        <p className="text-[#2E263DB2]">Enter your email and new password</p>

        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}

        <div className="mt-3 space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm w-full"
            value={form.email}
            onChange={handleChange}
            required
            readOnly
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm w-full"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm New Password"
            className="border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm w-full"
            value={form.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-9">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#88191F] text-white px-4 py-2 rounded-sm w-full text-medium text-sm"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
