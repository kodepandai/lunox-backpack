import { Button } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import Axios from "axios";

const Delete = ({ id, route, onDelete, entityName="Data"}: { id: number; route?: string, onDelete: (id: number)=>void, entityName?: string}) => {
  const modal = useModals();
  const deleteData = () => {
    // confirm delete
    modal.openConfirmModal({
      title: "Are you sure?",
      children: entityName+" will be deleted",
      labels: {
        confirm: "Delete",
        cancel: "Cancel",
      },
      confirmProps: {
        color: "red",
      },
      onConfirm: () => {
        Axios.delete(`${route}/${id}`)
          .then(() => {
            showNotification({
              message: entityName+" Deleted Successfully",
              color: "green",
            });
            onDelete(id);
          })
          .catch((err) => {
            showNotification({
              message: err.response?.data?.message,
              color: "red"
            });
          });
      },
    });
  };
  return (
    <Button compact color="red" size="xs" onClick={deleteData}>
      delete
    </Button>
  );
};
export default Delete;
