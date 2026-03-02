import cn from "@/lib/styles/cn";
import { User, Pencil, Trash2 } from "lucide-react";

interface Employee {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string | null;
  role: string;
  employmentType: string;
  department: string;
  position: string;
  gender: string;
  dateOfBirth: string;
}

type Props = {
  data: Employee[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const getEmploymentTypeBadge = (type: string) => {
  const styles = {
    fulltime: "bg-emerald-500/20 text-emerald-500",
    parttime: "bg-amber-500/20 text-amber-500",
    contractor: "bg-blue-500/20 text-blue-500",
    intern: "bg-purple-500/20 text-purple-500",
  };
  return styles[type as keyof typeof styles] || "bg-muted text-muted-foreground";
};

export default function EmployeeTableContentMobile({ data, onEdit, onDelete }: Props) {
  return (
    <div className="md:hidden p-4 space-y-3">
      {data.map((employee, index) => (
        <div
          key={employee.id}
          style={{ animationDelay: `${index * 50}ms` }}
          className="group relative bg-muted/30 rounded-2xl p-4 border border-border/30 hover:bg-muted/50 transition-all animate-fade-in"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {employee.firstName} {employee.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {employee.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(employee.id)}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-indigo-500"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(employee.id)}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Employee ID</p>
              <p className="text-sm font-medium">{employee.employeeNumber}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Department</p>
              <p className="text-sm font-medium">
                {employee.department || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Position</p>
              <p className="text-sm font-medium">
                {employee.position || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize",
                  getEmploymentTypeBadge(employee.employmentType),
                )}
              >
                {employee.employmentType}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
