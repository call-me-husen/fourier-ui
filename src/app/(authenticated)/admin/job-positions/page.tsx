"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Pencil,
  Trash2,
  Briefcase,
} from "lucide-react";
import cn from "@/lib/styles/cn";

interface JobPosition {
  id: string;
  name: string;
  level: number | null;
  createdAt: string;
  updatedAt: string;
}

const mockJobPositions: JobPosition[] = [
  {
    id: "pos-1",
    name: "Software Engineer",
    level: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pos-2",
    name: "Senior Software Engineer",
    level: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pos-3",
    name: "HR Manager",
    level: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pos-4",
    name: "Marketing Specialist",
    level: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pos-5",
    name: "Product Manager",
    level: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pos-6",
    name: "Junior Developer",
    level: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pos-7",
    name: "Tech Lead",
    level: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pos-8",
    name: "Designer",
    level: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

const ITEMS_PER_PAGE = 5;

export default function AdminJobPositions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPositions = mockJobPositions.filter((position) => {
    const matchesSearch =
      position.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel =
      levelFilter === "all" || position.level === parseInt(levelFilter);
    return matchesSearch && matchesLevel;
  });

  const totalPages = Math.ceil(filteredPositions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPositions = filteredPositions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const getLevelBadge = (level: number | null) => {
    const styles: Record<number, string> = {
      1: "bg-blue-500/20 text-blue-500",
      2: "bg-violet-500/20 text-violet-500",
      3: "bg-amber-500/20 text-amber-500",
    };
    return styles[level || 0] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold">Job Positions</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage job positions and roles
          </p>
        </div>
      </div>

      <div className="group relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-lg animate-fade-in">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search job positions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={levelFilter}
                onChange={(e) => {
                  setLevelFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-8 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Levels</option>
                <option value="1">Junior</option>
                <option value="2">Mid</option>
                <option value="3">Senior</option>
              </select>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5">
              <Plus className="h-4 w-4" />
              <span>Add Position</span>
            </button>
          </div>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="md:hidden p-4 space-y-3">
          {paginatedPositions.map((position, index) => (
            <div
              key={position.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="group relative bg-muted/30 rounded-2xl p-4 border border-border/30 hover:bg-muted/50 transition-all animate-fade-in"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div >
                    <p className="font-semibold text-lg">{position.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Level {position.level || "-"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => console.log("Edit", position.id)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-indigo-500"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => console.log("Delete", position.id)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Position Name
                </th>
                <th className="text-left p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Level
                </th>
                <th className="text-right p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPositions.map((position, index) => (
                <tr
                  key={position.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="border-b border-border/30 hover:bg-muted/30 transition-colors animate-fade-in"
                >
                  <td className="p-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">{position.name}</span>
                    </div>
                  </td>
                  <td className="p-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize",
                        getLevelBadge(position.level)
                      )}
                    >
                      {position.level}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => console.log("Edit", position.id)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-indigo-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => console.log("Delete", position.id)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPositions.length === 0 && (
          <div className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No job positions found</p>
          </div>
        )}

        {filteredPositions.length > 0 && (
          <div className="p-4 border-t border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredPositions.length)} of{" "}
              {filteredPositions.length} positions
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                      currentPage === page
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-muted"
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
