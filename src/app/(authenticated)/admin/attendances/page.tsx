"use client";

import { useEffect, useState } from "react";
import {
  Search,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRightLeft,
} from "lucide-react";
import cn from "@/lib/styles/cn";
import { useAttendanceReport } from "@/hooks/attendance/use-attendace-api";

interface AttendanceRecord {
  employeeId: string;
  employeeName: string;
  department: string;
  employmentType: string;
  daysOfPresent: number;
  daysOfAbsent: number;
  daysOfIncomplete: number;
  totalWorkingHours: number;
  averageWorkingHoursPerDay: number;
}

const ITEMS_PER_PAGE = 10;

function getWeekDates() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    startDate: monday.toISOString().split("T")[0],
    endDate: sunday.toISOString().split("T")[0],
  };
}

export default function AdminAttendances() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [startDate, setStartDate] = useState(getWeekDates().startDate);
  const [endDate, setEndDate] = useState(getWeekDates().endDate);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, fetcher } = useAttendanceReport();

  const filteredAttendances = data?.records.filter((record) => {
    const fullName = `${record.firstName} ${record.lastName}`.toLowerCase();

    return fullName.includes(debouncedSearchQuery.toLowerCase());
  }) || [];

  const totalPages = Math.ceil(filteredAttendances.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAttendances = filteredAttendances.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const getEmploymentTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      fulltime: "bg-emerald-500/20 text-emerald-500",
      parttime: "bg-amber-500/20 text-amber-500",
      contractor: "bg-blue-500/20 text-blue-500",
      intern: "bg-purple-500/20 text-purple-500",
    };
    return styles[type] || "bg-muted text-muted-foreground";
  };

  const formatHours = (ms: number) => {
    // HH:MM:DD format
    const totalHours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${totalHours}h ${minutes}m ${seconds}s`;
  };

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    fetcher({
      from: startDate,
      to: endDate,
    });
  }, [startDate, endDate]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold">Attendance Report</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            View and manage employee attendance records
          </p>
        </div>
      </div>

      <div className="group relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-lg animate-fade-in">
        <div className="p-4 border-b border-border/50 flex flex-col md:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by employee name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all cursor-pointer w-full md:w-auto"
              />
            </div>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            <div className="relative w-full md:w-auto">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all cursor-pointer w-full md:w-auto"
              />
            </div>
          </div>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="md:hidden p-4 space-y-3">
          {paginatedAttendances.map((record, index) => (
            <div
              key={record.employeeId}
              style={{ animationDelay: `${index * 50}ms` }}
              className="group relative bg-muted/30 rounded-2xl p-4 border border-border/30 hover:bg-muted/50 transition-all animate-fade-in"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">
                      {record.firstName} {record.lastName}
                    </p>
                    {/* <p className="text-sm text-muted-foreground">
                      {record.}
                    </p> */}
                  </div>
                </div>
                <button
                  onClick={() => console.log("View Details", record.employeeId)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-indigo-500"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {/* <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize",
                      getEmploymentTypeBadge(record.employmentType),
                    )}
                  >
                    {record.employmentType}
                  </span>
                </div> */}

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-emerald-500/10 rounded-lg p-2 text-center">
                    <CheckCircle className="h-4 w-4 mx-auto text-emerald-500 mb-1" />
                    <p className="text-lg font-bold text-emerald-500">
                      {record.present}
                    </p>
                    <p className="text-xs text-muted-foreground">Present</p>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-2 text-center">
                    <XCircle className="h-4 w-4 mx-auto text-red-500 mb-1" />
                    <p className="text-lg font-bold text-red-500">
                      {record.absent}
                    </p>
                    <p className="text-xs text-muted-foreground">Absent</p>
                  </div>
                  <div className="bg-amber-500/10 rounded-lg p-2 text-center">
                    <AlertCircle className="h-4 w-4 mx-auto text-amber-500 mb-1" />
                    <p className="text-lg font-bold text-amber-500">
                      {record.incomplete}
                    </p>
                    <p className="text-xs text-muted-foreground">Incomplete</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Total: {formatHours(record.totalWorkingHours)}h</span>
                  </div>
                  <div className="text-muted-foreground">
                    Avg: {formatHours(record.avgDailyWorkingHours)}h/day
                  </div>
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
                  Employee
                </th>
                {/* <th className="text-left p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Type
                </th> */}
                <th className="text-center p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Present
                </th>
                <th className="text-center p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Absent
                </th>
                <th className="text-center p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Incomplete
                </th>
                <th className="text-right p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Total Hours
                </th>
                <th className="text-right p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Avg Hours/Day
                </th>
                <th className="text-right p-4 px-6 text-sm font-semibold text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedAttendances.map((record, index) => (
                <tr
                  key={record.employeeId}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="border-b border-border/30 hover:bg-muted/30 transition-colors animate-fade-in"
                >
                  <td className="p-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{record.firstName} {record.lastName}</p>
                        {/* <p className="text-sm text-muted-foreground">
                          {record.department}
                        </p> */}
                      </div>
                    </div>
                  </td>
                  {/* <td className="p-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize",
                        getEmploymentTypeBadge(record.employmentType),
                      )}
                    >
                      {record.employmentType}
                    </span>
                  </td> */}
                  <td className="p-4 px-6 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 font-semibold">
                      {record.present}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-500 font-semibold">
                      {record.absent}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 font-semibold">
                      {record.incomplete}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-right">
                    <span className="font-medium">
                      {formatHours(record.totalWorkingHours)}h
                    </span>
                  </td>
                  <td className="p-4 px-6 text-right">
                    <span className="text-muted-foreground">
                      {formatHours(record.avgDailyWorkingHours)}h
                    </span>
                  </td>
                  <td className="p-4 px-6 text-right">
                    <button
                      onClick={() =>
                        console.log("View Details", record.employeeId)
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-indigo-500 hover:bg-indigo-500/10 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAttendances.length === 0 && (
          <div className="p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No attendance records found</p>
          </div>
        )}

        {filteredAttendances.length > 0 && (
          <div className="p-4 border-t border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredAttendances.length,
              )}{" "}
              of {filteredAttendances.length} records
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                        currentPage === page
                          ? "bg-indigo-500 text-white"
                          : "hover:bg-muted",
                      )}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
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
