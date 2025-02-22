import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { triggerSearchDialog } from "../Tasks/tasks.slice";
import { SearchIcon } from "lucide-react";

export const SearchDialog = () => {
  const dispatch = useDispatch();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(triggerSearchDialog(false));
    }
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogContent className="px-0">
        <DialogHeader className="border-b border-neutral-200 pb-3">
          <DialogTitle className="flex items-center space-x-3 px-4">
            <SearchIcon size={20} />
            <input
              placeholder="Search tasks..."
              className="outline-none font-normal text-neutral-800 placeholder:font-normal"
            />
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="w-full text-center text-sm py-4 text-neutral-500">
          No recent searches
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
