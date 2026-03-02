"use client";

import { useState } from "react";
import {
  Search,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Pencil,
  Trash2,
  Building2,
  ArrowRight,
} from "lucide-react";
import cn from "@/lib/styles/cn";

interface Department {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

const mockDepartments: Department[] = [
  {
    id: "dept-1",
    name: "Engineering",
    parentId: null,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "dept-2",
    name: "Human Resources",
    parentId: null,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "dept-3",
    name: "Marketing",
    parentId: null,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "dept-4",
    name: "Frontend Development",
    parentId: "dept-1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "dept-5",
    name: "Backend Development",
    parentId: "dept-1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "dept-6",
    name: "Recruitment",
    parentId: "dept-2",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "dept-7",
    name: "Digital Marketing",
    parentId: "dept-3",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "dept-8",
    name: "Finance",
    parentId: null,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

const ITEMS_PER_PAGE = 5;

export default function AdminDepartments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDepartments = mockDepartments.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDepartments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDepartments = filteredDepartments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const getParentName = (parentId: string | null) => {
    if (!parentId) return null;
    const parent = mockDepartments.find((d) => d.id === parentId);
    return parent?.name || null;
  };

  const getDepartmentType = (parentId: string | null) => {
    return parentId ? "Sub-department" : "Main Department";
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage departments and teams
          </p>
        </div>
      </div>

      <div className="group relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-lg animate-fade-in">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5">
            <Plus className="h-4 w-4" />
            <span>Add Department</span>
          </button>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="md:hidden p-4 space-y-3">
          {paginatedDepartments.map((department, index) => (
            <div
              key={department.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="group relative bg-muted/30 rounded-2xl p-4 border border-border/30 hover:bg-muted/50 transition-all animate-fade-in"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{department.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {getDepartmentType(department.parentId)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => console.log("Edit", department.id)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-indigo-500"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => console.log("Delete", department.id)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {department.parentId && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Parent:</span>
                  <span className="font-medium flex items-center gap-1">
                    {getParentName(department.parentId)}
                    <ArrowRight className="h-3 w-3" />
                    {department.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View - Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Department Name
                </th>
                <th className="text-left p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Type
                </th>
                <th className="text-left p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Parent Department
                </th>
                <th className="text-right p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedDepartments.map((department, index) => (
                <tr
                  key={department.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="border-b border-border/30 hover:bg-muted/30 transition-colors animate-fade-in"
                >
                  <td className="p-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">{department.name}</span>
                    </div>
                  </td>
                  <td className="p-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium",
                        department.parentId
                          ? "bg-amber-500/20 text-amber-500"
                          : "bg-emerald-500/20 text-emerald-500"
                      )}
                    >
                      {getDepartmentType(department.parentId)}
                    </span>
                  </td>
                  <td className="p-4 px-6">
                    {department.parentId ? (
                      <span className="text-sm flex items-center gap-1">
                        {getParentName(department.parentId)}
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        {department.name}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => console.log("Edit", department.id)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-indigo-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => console.log("Delete", department.id)}
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

        {filteredDepartments.length === 0 && (
          <div className="p-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No departments found</p>
          </div>
        )}

        {filteredDepartments.length > 0 && (
          <div className="p-4 border-t border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredDepartments.length)} of{" "}
              {filteredDepartments.length} departments
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
