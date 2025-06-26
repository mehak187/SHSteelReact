import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import dummyuser from "../assets/images/dummy-user.png";
import { FaRegTrashCan } from "react-icons/fa6";
import Addmanager from "../components/Manager/Addmanager";
import PageTitle from "../components/PageTitle";
import authAxios from "../axios/auth";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";

export default function Managers() {
  const [open, setOpen] = useState(false);
  const [managers, setManagers] = useState([]);
  const [edituser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");

  const fetchManagers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await authAxios.get("/managers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setManagers(response.data);
    } catch (error) {
      toast.error("Error fetching managers");
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await authAxios.delete(`/deleteManager/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Manager deleted successfully");
      fetchManagers();
    } catch (error) {
      toast.error("Failed to delete manager");
    }
  };

  const handleEdit = (manager) => {
    setEditUser(manager);
    setOpen(true);
  };

  const tableHeader = ["", "No", "Date", "Manager Name", "Status", "Action"];
  const filteredManagers = managers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const tableRows = filteredManagers.map((item, index) => {
    const createdAt = new Date(item.created_at);
    const date = createdAt.toLocaleDateString();
    const time = createdAt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return [
      <div>
        <input className="size-4 accent-[#88191F]" type="checkbox" />
      </div>,
      <p className="text-[#8C57FF]">#{item.id}</p>,
      <p className="text-[#2E263DB2]">
        {date}, {time}
      </p>,
      <div className="flex items-center gap-2">
        <img
          className="size-8 max-w-8 rounded-full"
          src={dummyuser}
          alt="img"
        />
        <div>
          <p className="font-medium text-sm text-[#2E263DE5]">{item.name}</p>
          <p className="text-sm text-[#2E263DB2]">{item.email}</p>
        </div>
      </div>,
      <p
        className={`inline-block text-xs py-1 px-3 rounded-full ${
          item.status == 1
            ? "text-[#56CA00] bg-[#56CA0029]"
            : "text-[#8C57FF] bg-[#8C57FF29]"
        }`}
      >
        {item.status == 1 ? "Active" : "Not Active"}
      </p>,
      <div className="flex items-center gap-2">
        <button onClick={() => handleDelete(item.id)}>
          <FaRegTrashCan className="text-[16px]" />
        </button>
        <button
          onClick={() => {
            setOpen(true);
            handleEdit(item);
          }}
        >
          <FaRegEdit className="text-[16px]" />
        </button>
      </div>,
    ];
  });

  return (
    <div className="h-full">
      <PageTitle title="Managers" />
      <div className="bg-white rounded-[6px] overflow-hidden min-h-full shadow-[0px_4px_10px_0px_#2E263D33]">
        <div className="p-5">
          <div className="sm:flex justify-between items-center gap-3">
            <div>
              <input
                className="border border-[#2E263D38] p-2 outline-0 text-sm rounded-[6px] w-full"
                placeholder="Search Manager"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex justify-end sm:mt-0 mt-3">
              <button
                className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
                onClick={() => setOpen(true)}
              >
                Add Manager
              </button>
            </div>
          </div>
        </div>
        <div className="pb-2">
          <Table rows={tableRows} headers={tableHeader} />
        </div>
      </div>
      <Addmanager
        edituser={edituser}
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) fetchManagers();
          setEditUser(null);
        }}
      />
    </div>
  );
}
