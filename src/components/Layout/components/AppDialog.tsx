/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditDialog } from "@/components/EditDialog";
import { SearchDialog } from "@/components/SearchDialog";
import { AddTaskDialog } from "@/components/Tasks/components/AddTaskDialog";
import { useSelector } from "react-redux";

export const AppDialog = () => {
  const showAddTaskDialog = useSelector(
    (state: any) => state.tasks.showAddNewTaskDialog
  );
  const showSearchDialog = useSelector(
    (state: any) => state.tasks.showSearchDialog
  );
  const showEditDialog = useSelector(
    (state: any) => state.tasks.showEditDialog
  );
  return (
    <>
      {showAddTaskDialog && <AddTaskDialog />}
      {showSearchDialog && <SearchDialog />}
      {showEditDialog && <EditDialog />}
    </>
  );
};
