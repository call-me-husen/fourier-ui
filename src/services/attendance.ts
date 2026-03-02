export const API_ATTENDANCE_HISTORY_PATH = "/attendance/history";
export const API_ATTENDANCE_DASHBOARD_PATH = "/attendance/dashboard";
export const API_ATTENDANCE_CLOCK_IN_PATH = "/attendance/clock-in";
export const API_ATTENDANCE_CLOCK_OUT_PATH = "/attendance/clock-out";
export const API_ATTENDANCE_REPORT_PATH = "/attendance/report";

export type AttendanceHistoryRequest = {
  month: number; // 1-12
  year: number;
}

export type AttendanceClockInRequest = {
  date: string;
}

export type AttendanceClockOutRequest = {
  date: string;
}

export type AttendanceReportRequest = {
  from: string;
  to: string;
}

export type AttendanceReportResponse = {
  records: Array<{
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    totalWorkingHours: number;
    avgDailyWorkingHours: number;
    present: number;
    absent: number;
    incomplete: number;
  }>
}

export type AttendanceDashboardResponse = {
  stats: {
    working: number;
    absent: number;
    holiday: number;
    totalWorkingHours: number;
    formattedTotalWorkingHours: string;
  }
  today: {
    clockIn: Date | null;
    clockOut: Date | null;
    isHoliday: boolean;
  }
}

export type AttendanceHistoryResponse = {
  records: Record<string,{
    date: string;
    clockIn: number | null;
    clockOut: number | null;
    state: "present" | "absent" | "incomplete" | "holiday" | "future";
  }>
  stats: {
    present: number;
    absent: number;
    incomplete: number;
    holiday: number;
  }
}