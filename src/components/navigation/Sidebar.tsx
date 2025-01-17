"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  MessageSquare,
  Archive,
  PlusCircle,
  Activity,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrentProject } from "@/contexts/CurrentProjectContext";
import CreateProjectDialog from "../projets/CreateProjectDialog";
import { LoadingSpinner } from "../ui/loading-spinner";
import Image from "next/image";

interface SidebarProps {
  className?: string;
  onCollapse: any;
}

import { useProjectGuards } from "@/middleware/guards/projectGuards";
import { useUserGuards } from "@/middleware/guards/userGuards";

export function AppSidebar({ className, onCollapse }: SidebarProps) {
  const { canAccessUserManagement } = useUserGuards();
  const { user, isAuthenticated } = useAuth();
  const { currentProject } = useCurrentProject();
  const router = useRouter();
  const pathname = usePathname();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userInitial = user?.username ? user.username[0].toUpperCase() : "U";
  const { canCreateProject } = useProjectGuards();

  //props pour le collapse

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapse(newCollapsedState); // Notify parent component
  };
  const menuItems = [
    { title: "Tableau de bord", url: "/dashboard", icon: LayoutDashboard },
    {
      title: "Organiser projet",
      url: currentProject ? `/projets/${currentProject.id}/kanban` : "",
      icon: FolderKanban,
    },
    {
      title: "Kanban",
      url: currentProject
        ? `/projets/${currentProject.id}/backlog`
        : "/backlog",
      icon: Archive,
      requiresProject: true,
    },
    {
      title: "Sprints",
      url: currentProject
        ? `/projets/${currentProject.id}/sprints`
        : "/sprints",
      icon: Activity,
      requiresProject: true,
    },
    {
      title: "Gestion des tâches",
      url: currentProject ? `/projets/${currentProject.id}/taches` : "/taches",
      icon: ListTodo,
      requiresProject: true,
    },
    { title: "Messages", url: "/messages", icon: MessageSquare },
    {
      title: "Gerer user",
      url: "/gestion-utilisateurs",
      icon: Users,
      show: canAccessUserManagement,
    },
  ].filter((item) => !item.show || item.show());

  const handleNavigation = async (
    url: string,
    requiresProject: boolean = false
  ) => {
    if (requiresProject && !currentProject) {
      return;
    }

    setIsLoading(true);
    try {
      await router.push(url);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <aside
        className={cn(
          "flex flex-col h-screen bg-white shadow-lg transition-all",
          isCollapsed ? "w-20" : "w-64",
          className
        )}
        aria-label="Sidebar"
      >
        {/* Toggle Button and Logo Section */}
        <div
          className={cn(
            "p-2 flex items-center justify-between relative",
            isCollapsed ? "mt-4" : "border-b"
          )}
        >
          <div>
            <Image
              src={isCollapsed ? "/icons/app-logo.png" : "/icons/app-logoc.png"}
              alt="Logo"
              width={isCollapsed ? 40 : 150}
              height={isCollapsed ? 40 : 50}
              className="mx-auto ml-3"
              priority
            />
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 absolute -right-6 bg-white shadow-md"
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-800" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            )}
          </button>
        </div>

        {/* Create Project Button */}
        {isAuthenticated && canCreateProject() && !isCollapsed && (
          <div className="p-4">
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full flex items-center justify-center gap-2"
            >
              <PlusCircle className="h-5 w-5" /> Créer un projet
            </Button>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleNavigation(item.url, item.requiresProject)}
              disabled={item.requiresProject && !currentProject}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all group w-full",
                pathname === item.url
                  ? "bg-primary text-white shadow"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                item.requiresProject &&
                  !currentProject &&
                  "opacity-50 cursor-not-allowed"
              )}
              aria-disabled={item.requiresProject && !currentProject}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && (
                <span className="w-full text-left">{item.title}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile Section */}
        {!isCollapsed && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 hover:bg-gray-100 transition-colors">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">{userInitial}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Create Project Modal */}
        <CreateProjectDialog
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </aside>
    </>
  );
}
