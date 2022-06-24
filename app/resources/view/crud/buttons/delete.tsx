import { Button } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import Axios from "axios";


const Delete = ({id, route}:{id?:number, route?:string})=>{
  const modal = useModals();
  const deleteData = ()=>{
    // confirm delete
    modal.openConfirmModal({
      title: "Are you sure?",
      children: "Data will be deleted",
      labels: {
        confirm: "Delete",
        cancel: "Cancel"
      },
      confirmProps: {
        color: "red"
      },
      onConfirm: ()=>{
        Axios.delete(`${route}/${id}`).then(json=>{
          showNotification({
            message: "Data Deleted Successfully"
          });
        })
          .catch(err=>{
            showNotification({
              message: err.message
            });
          });
      }
    });

  };
  return (
    <Button compact color="red" size="xs" onClick={deleteData}>
        delete
    </Button>
  );
};
export default Delete;