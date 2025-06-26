import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { FaXmark } from "react-icons/fa6";
import authAxios from "../../axios/auth";
import toast from "react-hot-toast";

export default function Addmanager({ open, onOpenChange, edituser }) {
  const isEditMode = !!edituser;

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  // Update form when edituser changes
  React.useEffect(() => {
    if (isEditMode) {
      setForm({
        name: edituser.name || "",
        email: edituser.email || "",
        password: "", // for security, don’t pre-fill password
      });
    } else {
      setForm({ name: "", email: "", password: "" });
    }
  }, [edituser, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      if (isEditMode) {
        // 🔁 UPDATE
        await authAxios.put(
          `/managers/${edituser.id}`,
          {
            name: form.name,
            email: form.email,
            ...(form.password && { password: form.password }), // only send if provided
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Manager updated successfully!");
      } else {
        // 🆕 CREATE
        await authAxios.post(
          "/createManager",
          {
            name: form.name,
            email: form.email,
            password: form.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Manager added successfully!");
      }

      onOpenChange(false); // Close drawer
      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setForm({ name: "", email: "", password: "" });
    onOpenChange(false);
  };

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
      <div className="h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-[#2E263D1F]">
          <p className="text-lg font-medium text-[#2E263DE5]">
            {isEditMode ? "Edit Manager" : "Add New Manager"}
          </p>
          <button onClick={() => onOpenChange(false)}>
            <FaXmark className="text-[#2E263DB2]" />
          </button>
        </div>

        {/* Form */}
        <div className="p-2 m-1 h-[calc(100%-120px)] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Manager Name"
              className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Manager Email"
              className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={isEditMode ? "New Password (optional)" : "Password"}
              className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="p-3 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
          >
            {loading ? (isEditMode ? "Updating..." : "Adding...") : isEditMode ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={handleDiscard}
            className="text-[#88191F] text-sm font-medium bg-white border border-[#88191F] rounded-[6px] py-2 px-4"
          >
            Discard
          </button>
        </div>
      </div>
    </Drawer>
  );
}
