import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import authAxios from "../axios/auth";
import toast from "react-hot-toast";
import dummyuser from "../assets/images/dummy-user.png";

function UserDropdown() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await authAxios.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="rounded-full w-max relative focus:outline-none">
        <img
          className="size-10 max-w-10 rounded-full"
          src={dummyuser}
          alt="user"
        />
        <div className="size-3 absolute rounded-full border-3 border-[#F4F5FA] bg-[#56CA00] bottom-0 right-0"></div>
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
        <div className="p-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${
                  active ? "bg-[#88191F] text-white" : "text-[#2E263D]"
                } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}
export default UserDropdown;
