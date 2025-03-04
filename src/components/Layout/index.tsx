/* eslint-disable @typescript-eslint/no-explicit-any */
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { AddTaskDialog } from "../Tasks/components/AddTaskDialog";
import { useDispatch, useSelector } from "react-redux";
import { SearchDialog } from "../SearchDialog";
import { EditDialog } from "../EditDialog";
import { useEffect } from "react";
import { getAllTasks } from "../Tasks/tasks.slice";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const showAddTaskDialog = useSelector(
    (state: any) => state.tasks.showAddNewTaskDialog
  );
  const showSearchDialog = useSelector(
    (state: any) => state.tasks.showSearchDialog
  );
  const showEditDialog = useSelector(
    (state: any) => state.tasks.showEditDialog
  );

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
        {showAddTaskDialog && <AddTaskDialog />}
        {showSearchDialog && <SearchDialog />}
        {showEditDialog && <EditDialog />}
      </main>
    </SidebarProvider>
  );
};
