/* eslint-disable @typescript-eslint/no-explicit-any */
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { AddTaskDialog } from "../Tasks/components/AddTaskDialog";
import { useSelector } from "react-redux";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const showAddTaskDialog = useSelector(
    (state: any) => state.tasks.showAddNewTaskDialog
  );
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
        {showAddTaskDialog && <AddTaskDialog />}
      </main>
    </SidebarProvider>
  );
};
