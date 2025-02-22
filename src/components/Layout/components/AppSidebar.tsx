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
  GitMergeIcon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import {
  triggerAddTaskDialog,
  triggerSearchDialog,
} from "@/components/Tasks/tasks.slice";
import { useDispatch } from "react-redux";

export const AppSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

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
  ];

  const projects = ["Engineering", "Design", "Marketing"];

  const handleMenuClick = (url: string) => {
    navigate(url);
  };

  const handleAddTaskButton = () => {
    dispatch(triggerAddTaskDialog(true));
  };

  const handleSearch = () => {
    dispatch(triggerSearchDialog(true));
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-neutral-200">
        <div className="flex items-center space-x-2 px-2 py-1">
          <img
            src="https://avatar.vercel.sh/rauchg"
            className="w-6 h-6 rounded-full"
          />
          <p className="font-semibold text-sm">yash</p>
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

        <SidebarGroup className="pt-0">
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton>
                    <GitMergeIcon className="w-4 h-4 text-lime-600" /> {project}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
                <DropdownMenuItem>
                  <User2 />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BadgeDollarSignIcon />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
