import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { FaXmark } from "react-icons/fa6";
import toast from "react-hot-toast";
import authAxios from "../../axios/auth";

export default function AddCoordinator({ open, onOpenChange, edituser }) {
  const isEditMode = !!edituser;

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    status: "1", // default active
  });

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isEditMode) {
      setForm({
        name: edituser?.name || "",
        email: edituser?.email || "",
        status: edituser?.status?.toString() || "1",
      });
    } else {
      setForm({ name: "", email: "", status: "1" });
    }
  }, [edituser, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      if (isEditMode) {
        await authAxios.post(
          `/updateCoordinator/${edituser.id}`,
          {
            name: form.name,
            email: form.email,
            status: form.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Coordinator updated successfully");
      } else {
        await authAxios.post(
          "/createCoordinator",
          {
            name: form.name,
            email: form.email,
            status: form.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Coordinator added successfully");
      }

      onOpenChange(false);
      setForm({ name: "", email: "", status: "1" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setForm({ name: "", email: "", status: "1" });
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
            {isEditMode ? "Edit Coordinator" : "Add New Project Coordinator"}
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
              placeholder="Coordinator Name"
              className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Coordinator Email"
              className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
            />

            {isEditMode && (
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] text-[#2E263D] placeholder:text-[#2E263D66]"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isEditMode
              ? "Update"
              : "Add"}
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
