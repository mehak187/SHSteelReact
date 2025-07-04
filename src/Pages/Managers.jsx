import React, { useState } from "react";
import Addmanager from "../components/Manager/Addmanager";
import PageTitle from "../components/PageTitle";
import TableMui from "../components/mui/TableMui";
import {
  useCreateManagerMutation,
  useDeleteManagerMutation,
  useGetManagersListQuery,
  useUpdateManagerMutation,
} from "../api/apiComponents/managerApi";
import Loader from "../components/Loader/Loader";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";
import { getInitials } from "../utils/getInitails";
import Actions from "../components/Actions";
import EditIcon from "../components/customicons/EditIcon";
import DeleteIcon from "../components/customicons/DeleteIcon";
import { useDeleteData } from "../hooks/useDeleteData";
import ReusableModal from "../components/modals/ReuseableModal";
import { MdDelete } from "react-icons/md";

export default function Managers() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { data, isLoading: isFetching } = useGetManagersListQuery();

  const [createManager, { isLoading: isCreating }] = useCreateManagerMutation();
  const [updateManager, { isLoading: isUpdating }] = useUpdateManagerMutation();

  const {
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteClick,
    handleConfirmDelete,
    isLoading: deleting,
  } = useDeleteData(useDeleteManagerMutation);

  const handleCreateManager = async (data) => {
    const response = await createManager(data).unwrap();
  };

  const handleUpdateManager = async (data) => {
    const response = await updateManager({ id: selectedRow.id, data }).unwrap();
  };

  return (
    <div className="h-full">
      <PageTitle title="Managers" />
      <div className="bg-white rounded-[6px] overflow-hidden min-h-full shadow-[0px_4px_10px_0px_#2E263D33]">
        <div className="p-5">
          <div className="sm:flex justify-between items-center gap-3">
            <div>
              <input
                className="border border-[#2E263D38] p-2 outline-0 text-sm rounded-[6px] w-full"
                placeholder="Search Project"
                type="search"
                name="searchProject"
                id="searchProject"
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
          <TableMui
            loading={isFetching}
            th={{
              checkbox: "",
              index: "No",
              created_at: "Date",
              name: "Manager Name",
              status: "status",
              action: "Action",
            }}
            td={data || []}
            customFields={[
              {
                name: "checkbox",
                data: (value, item) => (
                  <div className="flex items-center gap-2">
                    <input
                      className="size-4 accent-[#88191F]"
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </div>
                ),
              },
              {
                name: "created_at",
                data: (value, item) => (
                  <div className="flex items-center gap-2">
                    <p className="text-[#2E263DB2]">
                      {dayjs(value).format("MMMM D, YYYY - h:mm A")}
                    </p>
                  </div>
                ),
              },
              {
                name: "name",
                data: (value, item) => (
                  <div className="flex items-center gap-2">
                    <Avatar
                      sx={{
                        bgcolor: "#88191F",
                        width: 40,
                        height: 40,
                        fontSize: "1rem",
                      }}
                    >
                      {getInitials(item?.name)}
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm text-[#2E263DE5]">
                        {item.name}
                      </p>
                      <p className="text-sm text-[#2E263DB2]">{item.email}</p>
                    </div>
                  </div>
                ),
              },
              {
                name: "no",
                data: (value, item) => (
                  <div className="flex items-center gap-2">
                    <p className="text-[#8C57FF]">{item.no}</p>
                  </div>
                ),
              },
              {
                name: "status",
                data: (value, item) => {
                  const statusText = value === 1 ? "Active" : "Inactive";
                  const isActive = value === 1;

                  return (
                    <div className="flex items-center gap-1">
                      <p
                        className={`inline-block text-xs py-1 px-3 rounded-full ${
                          isActive
                            ? "text-[#56CA00] bg-[#56CA0029]"
                            : "text-[#8C57FF] bg-[#8C57FF29]"
                        }`}
                      >
                        {statusText}
                      </p>
                    </div>
                  );
                },
              },
              {
                name: "action",
                data: (value, item) => (
                  <div className="flex items-center gap-1">
                    <Actions
                      list={[
                        {
                          icon: EditIcon,
                          label: "Edit",
                          onClick: () => {
                            setSelectedRow(item);
                            setEditOpen(true);
                          },
                        },
                        {
                          icon: DeleteIcon,
                          label: "Delete",
                          onClick: () => handleDeleteClick(item.id),
                        },
                      ]}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      <Addmanager
        open={open}
        onOpenChange={setOpen}
        onSubmitHandler={handleCreateManager}
      />

      {editOpen && (
        <Addmanager
          open={editOpen}
          onOpenChange={setEditOpen}
          onSubmitHandler={handleUpdateManager}
          initialValues={selectedRow}
          mode="edit"
        />
      )}

      <ReusableModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to Delete this user?"
        icon={<MdDelete className="text-2xl text-red-500" />}
        isLoading={deleting}
      />

      <Loader loading={isCreating || isUpdating} />
    </div>
  );
}
