"use client";

interface Project {
  name: string;
  description: string;
}

interface ProjectListProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectList({ projects, onChange }: ProjectListProps) {
  const addProject = () => {
    onChange([...projects, { name: "", description: "" }]);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = projects.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      {projects.map((project, i) => (
        <div key={i} className="bg-[#f5f5f5] border border-gray-300 rounded-md p-3 flex flex-col gap-2 relative">
          <button
            type="button"
            onClick={() => removeProject(i)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <input
            type="text"
            value={project.name}
            onChange={(e) => updateProject(i, "name", e.target.value)}
            placeholder="Project name"
            className="bg-transparent text-sm font-medium text-black placeholder:text-gray-400 outline-none pr-6"
          />
          <input
            type="text"
            value={project.description}
            onChange={(e) => updateProject(i, "description", e.target.value)}
            placeholder="Short description"
            className="bg-transparent text-xs text-gray-600 placeholder:text-gray-400 outline-none pr-6"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#65a30d] transition-colors cursor-pointer py-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        ADD PROJECT
      </button>
    </div>
  );
}
