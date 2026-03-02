import cn from "@/lib/styles/cn";
import { CheckCircle, AlertCircle, XCircle, CirclePower } from "lucide-react";

type Props = {
  daysPresent: number;
  daysIncomplete: number;
  daysAbsent: number;
  daysOff: number;
}
export default function AttendanceHistoryStats({ daysPresent, daysIncomplete, daysAbsent, daysOff }: Props) {
  const contents = [
    {
      label: "Present",
      value: daysPresent,
      icon: CheckCircle,
      bgColor: "bg-emerald-500/10",
      color: "text-emerald-500",
    },
    {
      label: "Days Off",
      value: daysOff,
      icon: CirclePower,
      bgColor: "bg-indigo-500/10",
      color: "text-indigo-500",
    },
    {
      label: "Incomplete",
      value: daysIncomplete,
      icon: AlertCircle,
      bgColor: "bg-amber-500/10",
      color: "text-amber-500",
    },
    {
      label: "Absent",
      value: daysAbsent,
      icon: XCircle,
      bgColor: "bg-red-500/10",
      color: "text-red-500",
    },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {
        contents.map((content) => (
          <div key={content.label} className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-3 md:p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className={cn([content.bgColor, "p-3 rounded-xl"])} >
                <content.icon className={cn("h-6 w-6", content.color)} />
              </div>
              <div>
                <p className="text-2xl font-bold">{content.value}</p>
                <p className="text-sm text-muted-foreground">{content.label}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}
