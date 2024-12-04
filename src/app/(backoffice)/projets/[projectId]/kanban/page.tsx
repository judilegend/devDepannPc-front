import { Suspense } from "react";
import { WorkPackageList } from "@/components/kanban/WorkPackageList";

// type PageParams = {
//   projectId: string;
// };

// type Props = {
//   params: PageParams;
//   searchParams?: { [key: string]: string | string[] | undefined };
// };

export default function KanbanPage({ params }: { params: any }) {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="space-y-8">
          <Suspense fallback={<div>Chargement des work packages...</div>}>
            <WorkPackageList projectId={params.projectId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// export async function generateMetadata({
//   params,
// }: {
//   params: { projectId: string };
// }) {
//   return {
//     title: `Kanban - Projet ${params.projectId}`,
//     description: "Tableau Kanban du projet",
//   };
// }
