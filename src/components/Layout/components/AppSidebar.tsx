/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  PlusCircleIcon,
  CalendarClock,
  CalendarDays,
  Inbox,
  Search,
  User2,
  ChevronUp,
  SettingsIcon,
  BadgeDollarSignIcon,
  LogOutIcon,
  CircleCheck,
  SproutIcon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import {
  triggerAddTaskDialog,
  triggerSearchDialog,
} from "@/components/Tasks/tasks.slice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import { reset } from "@/store/Auth/auth.slice";
import { AsyncState } from "@/helper/constants";
import { Skeleton } from "@/components/ui/skeleton";

export const AppSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { logout } = useAuth();

  const userName = useSelector(
    (state: any) => state.users.userData?.user?.name
  );

  const items = [
    {
      title: "Inbox",
      icon: Inbox,
      url: "/",
    },
    {
      title: "Today",
      icon: CalendarClock,
      url: "/today",
    },
    {
      title: "Upcoming",
      icon: CalendarDays,
      url: "/upcoming",
    },
    {
      title: "Completed",
      icon: CircleCheck,
      url: "/completed",
    },
  ];

  const getUserDataApiStatus = useSelector(
    (state: any) => state.users?.userDataApiStatus
  );

  const projects = useSelector((state: any) => state.tasks?.allTasks?.projects);

  const handleMenuClick = (url: string) => {
    navigate(url);
  };

  const handleAddTaskButton = () => {
    dispatch(triggerAddTaskDialog(true));
  };

  const handleSearch = () => {
    dispatch(triggerSearchDialog(true));
  };

  const handleLogout = () => {
    dispatch(reset());
    logout();
  };

  const handleProjectClick = (project: string) => {
    navigate(`/project/${project}`);
  };

  const handleAccountClick = () => {
    navigate("/account-settings");
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-neutral-200">
        <div className="flex items-center space-x-2 px-2 py-1">
          <img
            src={`https://avatar.vercel.sh/${userName}`}
            className="w-6 h-6 rounded-full"
          />
          {getUserDataApiStatus === AsyncState.FULFILLED ? (
            <p className="font-semibold text-sm">{userName}</p>
          ) : (
            <Skeleton className="w-24 h-5" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="pt-4 pb-1 space-y-2 px-3">
          <Button
            className="bg-orange-600 hover:bg-orange-500"
            onClick={handleAddTaskButton}
          >
            <PlusCircleIcon />
            Add Task
          </Button>
          <Button
            className="bg-neutral-200"
            variant="secondary"
            onClick={handleSearch}
          >
            <Search />
            Search
          </Button>
        </SidebarGroup>

        <SidebarGroup className="pt-0">
          <SidebarGroupLabel>Tasks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items?.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => handleMenuClick(item.url)}
                >
                  <SidebarMenuButton
                    className={cn(
                      "bg-none",
                      pathname === item.url &&
                        "bg-orange-100 text-orange-700 hover:bg-orange-100 hover:text-orange-700"
                    )}
                  >
                    <item.icon className="w-4 h-4" /> {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {projects?.length > 0 && (
          <SidebarGroup className="pt-0">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects?.map((project: string, index: number) => (
                  <SidebarMenuItem
                    key={index}
                    onClick={() => handleProjectClick(project)}
                  >
                    <SidebarMenuButton>
                      <SproutIcon className="w-4 h-4 text-lime-600" /> {project}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <SettingsIcon /> Settings
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={handleAccountClick}>
                  <User2 />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BadgeDollarSignIcon />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
