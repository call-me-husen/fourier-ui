type Props = {
  numberOfDayOffs: number;
  numberOfAttendances: number;
  numberOfAbsences: number;
  totalWorkingHours: string;
}

export default function AttendanceStatistics({ numberOfDayOffs, numberOfAttendances, numberOfAbsences, totalWorkingHours }: Props) {
  return (
    <div className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl p-6">
      <h2 className="text-lg font-semibold mb-6">This Week Stats</h2>
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Working Days</span>
            <span className="font-bold text-green-500">{numberOfAttendances}/{7 - numberOfDayOffs} days</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Working Hours</span>
            <span className="font-bold">{totalWorkingHours}</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Absence Days</span>
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-sm font-medium">
              {numberOfAbsences} days
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}