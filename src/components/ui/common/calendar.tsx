"use client";
import useClientReady from "@/hooks/core/use-client-ready";
import { MONTH_LABELS, SHORT_DAY_LABELS } from "@/lib/dates/constants";
import formatTime from "@/lib/dates/format-time";
import cn from "@/lib/styles/cn";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Circle,
  CirclePower,
  XCircle,
} from "lucide-react";
import { useCallback } from "react";

type HeaderProps = {
  month: number;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToToday: () => void;
};

type Props = HeaderProps & {
  isLoading?: boolean;
  contents: Record<
    string,
    {
      state: "present" | "holiday" | "incomplete" | "absent" | "future";
      clockIn: number | null;
      clockOut: number | null;
      date: string;
    }
  >;
};

function CalendarHeader({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onGoToToday,
}: HeaderProps) {
  const monthLabel = MONTH_LABELS[month];
  return (
    <div className="p-6 border-b border-border/50">
      <div className="flex items-center justify-between flex-col sm:flex-row">
        <div className="flex items-center gap-4">
          <button
            onClick={onPrevMonth}
            className="p-3 rounded-2xl border border-border/50 hover:bg-muted transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-bold min-w-[200px] text-center">
            {monthLabel} {year}
          </h2>
          <button
            onClick={onNextMonth}
            className="p-3 rounded-2xl border border-border/50 hover:bg-muted transition-colors cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={onGoToToday}
          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all cursor-pointer"
        >
          Today
        </button>
      </div>
    </div>
  );
}

function CalendarWeekHeader() {
  return (
    <div className="grid-cols-7 gap-1 mb-2 hidden md:grid">
      {SHORT_DAY_LABELS.map((day) => (
        <div
          key={day}
          className="text-center text-sm font-semibold text-muted-foreground py-2"
        >
          {day}
        </div>
      ))}
    </div>
  );
}

function CalendarFooter() {
  const legends = [
    { color: "bg-emerald-500", label: "Present" },
    { color: "bg-indigo-500", label: "Days Off" },
    { color: "bg-amber-500", label: "Incomplete" },
    { color: "bg-red-400", label: "Absent" },
  ];
  return (
    <div className="p-4 border-t border-border/50 hidden md:block">
      <div className="flex items-center justify-center gap-6 text-sm">
        {legends.map((legend) => (
          <div key={legend.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${legend.color}`} />
            <span className="text-muted-foreground">{legend.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type CalendarCellProps = {
  isLoading?: boolean;
  isToday: boolean;
  isFuture: boolean;
  day: number;
  label?: string;
  state?: "present" | "holiday" | "incomplete" | "absent" | "future" | "offset";
  clockIn: string | null;
  clockOut: string | null;
};

const CALENDAR_CELL_STATE = {
  present: {
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  holiday: {
    icon: CirclePower,
    iconColor: "text-indigo-500",
    textColor: "text-indigo-600",
    bgColor: "bg-indigo-500/10",
  },
  incomplete: {
    icon: AlertCircle,
    iconColor: "text-amber-500",
    textColor: "text-amber-600",
    bgColor: "bg-amber-500/10",
  },
  absent: {
    icon: XCircle,
    iconColor: "text-red-500",
    textColor: "text-red-600",
    bgColor: "bg-red-500/10",
  },
  future: {
    icon: Circle,
    iconColor: "text-gray-500",
    textColor: "text-gray-600",
    bgColor: "bg-gray-500/10",
  },
  offset: null,
};

function CalendarCell({
  isToday,
  isFuture,
  day,
  state,
  clockIn,
  clockOut,
  isLoading,
  label,
}: CalendarCellProps) {
  const stateCellConfig = state ? CALENDAR_CELL_STATE[state] : null;
  const clockedIn = state === "present" || state === "incomplete";
  const clockedOut = state === "present";

  if (state === "offset" || isLoading) {
    const skeletonClasses = isLoading ? "animate-pulse bg-muted" : "";
    return (
      <div
        className={cn(
          "hidden min-h-10 p-2 bg-muted/10 md:min-h-25 md:block",
          skeletonClasses,
        )}
      />
    );
  }
  return (
    <div
      className={cn([
        "min-h-20 p-2 border border-border/30 hover:bg-muted/30 transition-colors md:min-h-25",
        isToday && "bg-indigo-500/10 border-indigo-500/50",
        isFuture && "opacity-40",
      ])}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={cn(["text-sm font-medium", isToday && "text-indigo-600"])}
        >
          {day}
          <span
            className={cn([
              "text-sm font-medium text-muted-foreground ml-2 md:hidden",
              isToday && "text-indigo-500",
            ])}
          >
            {label}
          </span>
        </span>
        {state && stateCellConfig && (
          <div className={cn(["p-1 rounded-full", stateCellConfig.bgColor])}>
            <stateCellConfig.icon
              className={cn("h-4 w-4", stateCellConfig.iconColor)}
            />
          </div>
        )}
      </div>
      {clockedIn && (
        <div className="text-xs">
          <span className="text-muted-foreground">In: </span>
          <span className="font-medium">{clockIn}</span>
        </div>
      )}
      {clockedOut && (
        <div className="text-xs">
          <span className="text-muted-foreground">Out: </span>
          <span className="font-medium">{clockOut}</span>
        </div>
      )}
    </div>
  );
}
export default function Calendar(props: Props) {
  const isClientReady = useClientReady();
  const firstDayOfMonth = new Date(props.year, props.month, 1);
  const lastDayOfMonth = new Date(props.year, props.month + 1, 0);

  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const renderCalendar = useCallback(() => {
    const currentDate = new Date();
    const calendarCells = [];

    if (props.isLoading || !isClientReady) {
      return Array.from({ length: 7 * 5 }).map((_, index) => (
        <CalendarCell
          key={`loading-${index}`}
          day={0}
          state="offset"
          isToday={false}
          isFuture={false}
          isLoading
          clockIn={null}
          clockOut={null}
        />
      ));
    }

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarCells.push(
        <CalendarCell
          key={`offset-${i}`}
          day={0}
          state="offset"
          isToday={false}
          isFuture={false}
          clockIn={null}
          clockOut={null}
        />,
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(props.year, props.month, day);
      const isToday = date.toDateString() === currentDate.toDateString();

      const dateKey = date.toLocaleDateString("en-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const attendance = props.contents[dateKey];

      const clockInTime = attendance?.clockIn
        ? formatTime(new Date(attendance.clockIn), true)
        : null;
      const clockOutTime = attendance?.clockOut
        ? formatTime(new Date(attendance.clockOut), true)
        : null;

      calendarCells.push(
        <CalendarCell
          key={day}
          day={day}
          isToday={isToday}
          isFuture={attendance?.state === "future"}
          state={attendance?.state}
          clockIn={clockInTime}
          clockOut={clockOutTime}
          label={SHORT_DAY_LABELS[date.getDay()]}
        />,
      );
    }

    return calendarCells;
  }, [props.isLoading, props.year, props.month, props.contents, isClientReady, firstDayOfWeek, daysInMonth]);

  // Don't render on the mobile view if it's loading to avoid layout shift
  return (
    <div className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
      <CalendarHeader {...props} />

      <div className="p4">
        <CalendarWeekHeader />
        <div className="grid grid-cols md:grid-cols-7  gap-1">
          {renderCalendar()}
        </div>
      </div>

      <CalendarFooter />
    </div>
  );
}
