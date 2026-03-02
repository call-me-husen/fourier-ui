import { useClockIn, useClockOut } from "@/hooks/attendance/use-attendace-api";
import useClientReady from "@/hooks/core/use-client-ready";
import useSnackbar from "@/hooks/core/use-snackbar";
import formatTime from "@/lib/dates/format-time";
import { Loader2, Clock, Sparkles, CalendarOffIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  clockInTime?: Date | null;
  clockOutTime?: Date | null;
  isDayOff?: boolean;
};

function ClockedInContent({
  clockInTime,
  isLoading,
  handleClockOut,
}: {
  clockInTime: Date;
  isLoading: boolean;
  handleClockOut: () => void;
}) {
  return (
    <>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 mb-6">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        Currently Working
      </div>
      <div className="text-sm text-muted-foreground mb-4">
        Clocked in at{" "}
        <span className="font-semibold text-foreground">
          {formatTime(new Date(clockInTime!), true)}
        </span>
      </div>
      <button
        onClick={handleClockOut}
        disabled={isLoading}
        className="px-10 py-4 rounded-2xl bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Clock className="h-5 w-5" />
        )}
        <span>Clock Out</span>
      </button>
    </>
  );
}

function ClockedOutContent({
  clockInTime,
  clockOutTime,
}: {
  clockInTime: Date;
  clockOutTime: Date;
}) {
  return (
    <>
      <div className="text-sm text-muted-foreground mb-4">
        Clocked in at{" "}
        <span className="font-semibold text-foreground">
          {formatTime(new Date(clockInTime!), true)}
        </span>
      </div>
      <div className="text-sm text-muted-foreground mb-4">
        Clocked out at{" "}
        <span className="font-semibold text-foreground">
          {formatTime(new Date(clockOutTime!), true)}
        </span>
      </div>
    </>
  );
}

function NotClockedInContent({
  isLoading,
  handleClockIn,
}: {
  isLoading: boolean;
  handleClockIn: () => void;
}) {
  return (
    <>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-muted-foreground mb-6">
        <Sparkles className="h-4 w-4" />
        Ready to start
      </div>
      <button
        onClick={handleClockIn}
        disabled={isLoading}
        className="px-10 py-4 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Clock className="h-5 w-5" />
        )}
        <span>Clock In</span>
      </button>
    </>
  );
}

function DayOffContent() {
  return (
    <>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 mb-6">
        <CalendarOffIcon className="h-4 w-4" />
        Enjoy your day off!
      </div>
    </>
  );
}

export default function AttendanceCard({
  clockInTime,
  clockOutTime,
  isDayOff,
}: Props) {
  const isClientReady = useClientReady();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const {
    fetcher: clockIn,
    isLoading: isLoadingClockIn,
    error: errorClockIn,
    isSuccess: isSuccessClockIn,
  } = useClockIn();
  const {
    fetcher: clockOut,
    isLoading: isLoadingClockOut,
    error: errorClockOut,
    isSuccess: isSuccessClockOut,
  } = useClockOut();
  const { show } = useSnackbar();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedCurrentTime = isClientReady
    ? formatTime(currentTime)
    : "--:--:--";
  const hasClockedIn = Boolean(clockInTime);
  const hasClockedOut = Boolean(clockOutTime);

  const isLoading = isLoadingClockIn || isLoadingClockOut;

  const onClockIn = useCallback(() => {
    clockIn({
      date: new Date().toUTCString(),
    });
  }, [clockIn]);

  const onClockOut = useCallback(() => {
    clockOut({
      date: new Date().toUTCString(),
    });
  }, [clockOut]);

  useEffect(() => {
    if (errorClockIn) {
      show(errorClockIn, { type: "error" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorClockIn]);

  useEffect(() => {
    if (errorClockOut) {
      show(errorClockOut, { type: "error" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorClockOut]);

  useEffect(() => {
    if (isSuccessClockIn) {
      window.location.reload();
    }
  }, [isSuccessClockIn]);

  useEffect(() => {
    if (isSuccessClockOut) {
      window.location.reload();
    }
  }, [isSuccessClockOut]);

  const content = useMemo(() => {
    if (isDayOff) {
      return <DayOffContent />;
    }
    if (hasClockedIn && !hasClockedOut) {
      return (
        <ClockedInContent
          clockInTime={clockInTime!}
          isLoading={isLoading}
          handleClockOut={onClockOut}
        />
      );
    }
    if (hasClockedIn && hasClockedOut) {
      return (
        <ClockedOutContent
          clockInTime={clockInTime!}
          clockOutTime={clockOutTime!}
        />
      );
    }
    return (
      <NotClockedInContent isLoading={isLoading} handleClockIn={onClockIn} />
    );
  }, [
    clockInTime,
    clockOutTime,
    hasClockedIn,
    hasClockedOut,
    isDayOff,
    isLoading,
    onClockIn,
    onClockOut,
  ]);

  return (
    <div className="col-span-full lg:col-span-2 relative group">
      <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-600 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
      <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl p-8 lg:p-12">
        <div className="flex flex-col items-center justify-center">
          <div className="text-6xl lg:text-7xl font-bold mb-3 tracking-tight">
            {formattedCurrentTime}
          </div>
          <div className="text-muted-foreground mb-8 text-lg">
            {new Date().toLocaleDateString("en-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="text-center animate-fade-in">{content}</div>
        </div>
      </div>
    </div>
  );
}
