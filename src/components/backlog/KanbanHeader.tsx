"use client";

export function KanbanHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Tableau Kanban</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visualisez et gérez l'avancement de vos tâches
        </p>
      </div>
    </div>
  );
}
