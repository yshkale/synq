import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { triggerAddTaskDialog } from "../tasks.slice";

export const AddTaskDialog = () => {
  const dispatch = useDispatch();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(triggerAddTaskDialog(false));
    }
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogContent></DialogContent>
    </Dialog>
  );
};
