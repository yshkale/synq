import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { triggerShowEditDialog } from "../Tasks/tasks.slice";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

export const EditDialog = () => {
  const dispatch = useDispatch();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(triggerShowEditDialog(false));
    }
  };
  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0">
        <DialogHeader className="p-6 border-b border-neutral-200">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center sm:justify-between px-6 pb-4">
          <Button variant="outline" className="text-red-600">
            <Trash2Icon /> Delete
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
