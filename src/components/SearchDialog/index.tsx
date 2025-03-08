/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSearchInput,
  setGetTaskId,
  triggerSearchDialog,
  triggerShowEditDialog,
} from "../Tasks/tasks.slice";
import { SearchIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const SearchDialog = () => {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state: any) => state.tasks.searchQuery);
  const allTasks = useSelector((state: any) => state.tasks.allTasks?.tasks);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery !== "") {
      const results = allTasks?.filter(
        (task: any) =>
          [
            task.title,
            task.description,
            task.project,
            task.priority,
            task.labels?.join(" "),
          ]
            .filter(Boolean) // Remove undefined/null values
            .some((field: any) =>
              field.toLowerCase().includes(searchQuery?.toLowerCase()?.trim())
            ) // ✅ Make sure to return this!
      );

      setSearchResults(results || []);
    } else {
      setSearchResults([]); // ✅ Show all tasks when search is empty
    }
  }, [searchQuery, allTasks]);

  console.log(searchResults);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(triggerSearchDialog(false));
    }
  };

  const handleSearch = (e: any) => {
    dispatch(handleSearchInput(e.target.value));
  };

  const handleSearchResultClick = (taskId: string) => {
    dispatch(setGetTaskId(taskId));
    dispatch(triggerShowEditDialog(true));
    dispatch(triggerSearchDialog(false));
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
              value={searchQuery}
              onChange={(e: any) => handleSearch(e)}
            />
          </DialogTitle>
        </DialogHeader>

        {searchQuery === "" && (
          <p className="w-full text-center text-sm py-2 text-neutral-500">
            search your workspace...
          </p>
        )}

        {searchResults?.length > 0 &&
          searchResults?.map((result: any, index: number) => {
            const isCompleted = result?.completed;
            return (
              <div
                key={index}
                className="cursor-pointer mx-4 flex space-x-4 justify-between items-center pt-1 pb-5 border-b border-neutral-200"
                onClick={() => handleSearchResultClick(result._id)}
              >
                <div>
                  <h3 className="font-semibold text-neutral-800">
                    {result?.title}
                  </h3>
                  <p className="text-sm text-neutral-700">
                    {result?.description}
                  </p>
                </div>

                <Badge
                  className={cn(
                    "rounded-full font-normal bg-orange-600 pointer-events-none h-6",
                    isCompleted ? "bg-orange-600" : "bg-neutral-400"
                  )}
                >
                  {isCompleted ? "completed" : "pending"}
                </Badge>
              </div>
            );
          })}
      </DialogContent>
    </Dialog>
  );
};
