/* eslint-disable @typescript-eslint/no-explicit-any */
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "@/store/User/users.slice";
import { AppDialog } from "./components/AppDialog";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData({}));
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
        <AppDialog />
      </main>
    </SidebarProvider>
  );
};
