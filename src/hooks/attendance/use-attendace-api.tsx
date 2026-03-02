import {
  API_ATTENDANCE_CLOCK_IN_PATH,
  API_ATTENDANCE_CLOCK_OUT_PATH,
  API_ATTENDANCE_DASHBOARD_PATH,
  API_ATTENDANCE_HISTORY_PATH,
  AttendanceClockInRequest,
  AttendanceClockOutRequest,
  AttendanceDashboardResponse,
  AttendanceHistoryRequest,
  AttendanceHistoryResponse,
} from "@/services/attendance";
import useAPI from "../core/use-api";

export function useAttendanceHistory() {
  return useAPI<AttendanceHistoryResponse, AttendanceHistoryRequest>(
    API_ATTENDANCE_HISTORY_PATH,
    { method: "GET" },
  );
}

export function useAttendanceDashboard() {
  return useAPI<AttendanceDashboardResponse>(API_ATTENDANCE_DASHBOARD_PATH, {
    method: "GET",
  });
}

export function useClockIn() {
  return useAPI<unknown, AttendanceClockInRequest>(API_ATTENDANCE_CLOCK_IN_PATH, {
    method: "POST",
  });
}

export function useClockOut() {
  return useAPI<unknown, AttendanceClockOutRequest>(API_ATTENDANCE_CLOCK_OUT_PATH, {
    method: "POST",
  });
}