"use client";

import AttendanceHistoryStats from "@/components/ui/dashboard/attendance-history-stats";
import Calendar from "@/components/ui/common/calendar";
import { useAttendanceHistory } from "@/hooks/attendance/use-attendace-api";
import { useEffect, useMemo, useState } from "react";

export default function EmployeeAttendance() {
  const { fetcher, isLoading, data } = useAttendanceHistory();
  const [currentPeriod, setCurrentPeriod] = useState(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    return { month, year };
  });

  const onPrevMonth = () => {
    setCurrentPeriod(prev => {
      const month = prev.month === 1 ? 12 : prev.month - 1;
      const year = prev.month === 1 ? prev.year - 1 : prev.year;
      return { month, year };
    });
  };

  const onNextMonth = () => {
    setCurrentPeriod(prev => {
      const month = prev.month === 12 ? 1 : prev.month + 1;
      const year = prev.month === 12 ? prev.year + 1 : prev.year;
      return { month, year };
    });
  };

  const onGoToToday = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    if (month === currentPeriod.month && year === currentPeriod.year) return;
    setCurrentPeriod({ month, year });
  };

  useEffect(() => {
    fetcher(currentPeriod)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPeriod])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Attendance History</h1>
        <p className="text-muted-foreground mt-2 text-lg">View your monthly attendance calendar</p>
      </div>

      <AttendanceHistoryStats
        daysPresent={data?.stats.present || 0}
        daysIncomplete={data?.stats.incomplete || 0}
        daysAbsent={data?.stats.absent || 0}
        daysOff={data?.stats.holiday || 0}
      />

      <Calendar 
        year={currentPeriod.year}
        month={currentPeriod.month-1}
        onGoToToday={onGoToToday}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        isLoading={isLoading}
        contents={data?.records || {}}
      />
    </div>
  );
}
