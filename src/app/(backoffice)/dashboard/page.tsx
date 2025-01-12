"use client";

import { useState, useEffect, Suspense } from "react";
import { ProjectList } from "@/components/projets/ProjectList";
import { ProjectsHeader } from "@/components/projets/ProjectsHeader";
import { Loader2 } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:5000/api/projects", {
          cache: "no-store",
        });
        console.log(res);
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-4 sm:py-6 lg:py-8">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 sm:py-6 lg:py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <ProjectsHeader />
        <ProjectList initialProjects={projects} />
      </Suspense>
    </div>
  );
}
