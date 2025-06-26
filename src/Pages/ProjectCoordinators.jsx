import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import dummyuser from "../assets/images/dummy-user.png";
import { FaRegTrashCan } from "react-icons/fa6";
import AddCoordinator from "../components/coordinator/AddCoordinator";
import PageTitle from "../components/PageTitle";
import authAxios from "../axios/auth";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";

export default function ProjectCoordinators() {
  const [open, setOpen] = useState(false);
  const [coordinators, setCoordinators] = useState([]);
  const [edituser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");

  const fetchCoordinators = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await authAxios.get("/coordinators", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoordinators(response.data);
    } catch (error) {
      console.error("Error fetching coordinators:", error);
    }
  };

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await authAxios.delete(`/deleteCoordinator/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Coordinator deleted successfully");
      fetchCoordinators();
    } catch (error) {
      toast.error("Failed to delete coordinator");
    }
  };

  const handleEdit = (coordinator) => {
    setEditUser(coordinator);
    setOpen(true);
  };

  const tableHeader = ["", "No", "Date", "Coordinator Name", "Status", "Action"];

  const filteredCoordinators = coordinators.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const tableRows = filteredCoordinators.map((item) => {
    const createdAt = new Date(item.created_at);
    const date = createdAt.toLocaleDateString();
    const time = createdAt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return [
      <div key={`check-${item.id}`}>
        <input className="size-4 accent-[#88191F]" type="checkbox" />
      </div>,
      <p key={`id-${item.id}`} className="text-[#8C57FF]">#{item.id}</p>,
      <p key={`date-${item.id}`} className="text-[#2E263DB2]">
        {date}, {time}
      </p>,
      <div key={`user-${item.id}`} className="flex items-center gap-2">
        <img className="size-8 rounded-full" src={dummyuser} alt="img" />
        <div>
          <p className="font-medium text-sm text-[#2E263DE5]">{item.name}</p>
          <p className="text-sm text-[#2E263DB2]">{item.email}</p>
        </div>
      </div>,
      <p
        key={`status-${item.id}`}
        className={`inline-block text-xs py-1 px-3 rounded-full ${
          item.status == 1
            ? "text-[#56CA00] bg-[#56CA0029]"
            : "text-[#8C57FF] bg-[#8C57FF29]"
        }`}
      >
        {item.status == 1 ? "Active" : "Not Active"}
      </p>,
      <div key={`action-${item.id}`} className="flex items-center gap-2">
        <button onClick={() => handleDelete(item.id)}>
          <FaRegTrashCan className="text-[16px]" />
        </button>
        <button onClick={() => handleEdit(item)}>
          <FaRegEdit className="text-[16px]" />
        </button>
      </div>,
    ];
  });

  return (
    <div className="h-full">
      <PageTitle title="Project Coordinator" />
      <div className="bg-white rounded-[6px] overflow-hidden min-h-full shadow-[0px_4px_10px_0px_#2E263D33]">
        <div className="p-5 flex items-center gap-3 justify-between">
          <div className="ms-auto flex flex-wrap items-center gap-3">
            <input
              className="border border-[#2E263D38] p-2 outline-0 text-sm rounded-[6px]"
              placeholder="Search Coordinator"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
              onClick={() => {
                setEditUser(null);
                setOpen(true);
              }}
            >
              Add Coordinator
            </button>
          </div>
        </div>
        <div className="pb-2">
          <Table rows={tableRows} headers={tableHeader} />
        </div>
      </div>

      <AddCoordinator
        edituser={edituser}
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setEditUser(null);
            fetchCoordinators();
          }
        }}
      />
    </div>
  );
}
