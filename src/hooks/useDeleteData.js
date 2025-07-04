import { useState } from "react";
import { toast } from "sonner";

export const useDeleteData = (deleteMutation) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteData, { isLoading }] = deleteMutation();

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteData(deleteId).unwrap();
      setShowDeleteModal(false);
      toast.success("Deleted successfully!");
      setDeleteId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return {
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteClick,
    handleConfirmDelete,
    isLoading,
  };
};
