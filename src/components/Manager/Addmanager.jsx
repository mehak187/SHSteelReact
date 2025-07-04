import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Addmanager({
  open,
  onOpenChange,
  onSubmitHandler,
  initialValues = {},
  mode = "new",
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await onSubmitHandler(data);
      console.log("Manager created successfully:", response);
      toast.success(
        `Manager ${mode === "edit" ? "updated" : "created"} successfully!`
      );
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Create manager failed:", error);

      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        toast.error(error?.data?.message || "Something went wrong.");
      }
    }
  };

  const handleDiscard = () => {
    reset();
    onOpenChange(false);
  };

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      const { password, ...valuesWithoutPassword } = initialValues;
      reset(valuesWithoutPassword);
    }
  }, [mode, initialValues, reset]);

  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          maxWidth: "350px",
        },
      }}
      anchor="right"
      open={open}
      onClose={() => onOpenChange(false)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between"
      >
        {/* Header */}
        <div className="flex items-center gap-2 justify-between p-3 border-b border-[#2E263D1F]">
          <p className="text-lg font-medium text-[#2E263DE5]">
            {mode === "edit" ? "Edit" : "Add New"} Manager
          </p>
          <button type="button" onClick={() => onOpenChange(false)}>
            <FaXmark className="text-[#2E263DB2]" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-2 m-1 h-[calc(100%-120px)] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {/* Name Field */}
            <div>
              <input
                type="text"
                placeholder="Manager Name"
                {...register("name", { required: "Name is required" })}
                className={`border rounded-[6px] block w-full p-3 text-sm placeholder:text-[#2E263D66] ${
                  errors.name ? "border-red-500" : "border-[#2E263D38]"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="Manager Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className={`border rounded-[6px] block w-full p-3 text-sm placeholder:text-[#2E263D66] ${
                  errors.email ? "border-red-500" : "border-[#2E263D38]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  ...(mode !== "edit" && {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  }),
                })}
                className={`border rounded-[6px] block w-full p-3 text-sm placeholder:text-[#2E263D66] ${
                  errors.password ? "border-red-500" : "border-[#2E263D38]"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-3 flex items-center gap-3">
          <button
            type="submit"
            className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
          >
            {mode === "edit" ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={handleDiscard}
            className="text-[#88191F] text-sm font-medium bg-white border border-[#88191F] rounded-[6px] py-2 px-4"
          >
            Discard
          </button>
        </div>
      </form>
    </Drawer>
  );
}
