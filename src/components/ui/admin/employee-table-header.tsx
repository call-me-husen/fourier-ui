"use client";

import { Search, Filter, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const EMPLOYMENT_TYPES = [
  { value: "fulltime", label: "Full Time" },
  { value: "parttime", label: "Part Time" },
  { value: "contractor", label: "Contractor" },
  { value: "intern", label: "Intern" },
]

type Props = {
  onFilterChange: (props: { search: string, employmentType: string }) => void;
  onAddEmployee: () => void;
}
export default function EmployeeTableHeader({ onFilterChange, onAddEmployee }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("all");

  // Debounce search input
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    onFilterChange({ search: debouncedSearchQuery, employmentType: employmentTypeFilter });
  }, [debouncedSearchQuery, employmentTypeFilter, onFilterChange]);

  return (
    <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={employmentTypeFilter}
            onChange={(e) => {
              setEmploymentTypeFilter(e.target.value);
            }}
            className="pl-10 pr-8 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Types</option>
            {EMPLOYMENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onAddEmployee}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          <span>Add Employee</span>
        </button>
      </div>
    </div>
  );
}
