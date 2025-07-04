import React from "react";
import Logo from "../../assets/images/Logo.jpg";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../api/apiComponents/authApi";
import Loader from "../../components/Loader/Loader";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
      console.log("Registered successfully:", response);
      toast.success("Registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);

      if (error?.data?.errors) {
        const fieldErrors = error.data.errors;
        Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
          setError(fieldName, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="bg-white sm:p-7 px-3 py-4 flex flex-col justify-center gap-4 h-[100dvh]">
      <div>
        <img
          src={Logo}
          alt="Logo"
          className="xl:w-[130px] xl:h-[97px] xl:max-w-[130px] md:w-[100px] md:h-[97px] md:max-w-[100px] w-[80px] max-w-[80px] object-contain"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h5 className="text-[var(--primary)] font-medium text-2md">
          Create an Account
        </h5>
        <p className="text-[#2E263DB2]">Please sign up to get started</p>

        <div className="mt-3">
          <input
            type="text"
            {...register("name", { required: "Full name is required" })}
            className="border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm w-full"
            placeholder="Full Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mt-3">
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm w-full"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-3 border border-[#2E263D38] text-[#2E263D66] px-3 py-2 rounded-sm flex items-center justify-between w-full">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full outline-none bg-transparent"
            placeholder="Password"
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
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}

        <div className="mt-9">
          <button
            type="submit"
            className="bg-[#88191F] text-white px-4 py-2 rounded-sm w-full text-medium text-sm"
          >
            Register
          </button>
        </div>

        <p className="text-center text-sm text-[#2E263DB2] mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-[#88191F] font-medium">
            Login here
          </Link>
        </p>
      </form>

      <Loader loading={isLoading} />
    </div>
  );
};

export default Register;
