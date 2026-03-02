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

const TABLE_HEADERS = [
  "Employee",
  "Employee ID",
  "Department",
  "Position",
  "Type",
  "Actions",
];

const getEmploymentTypeBadge = (type: string) => {
  const styles = {
    fulltime: "bg-emerald-500/20 text-emerald-500",
    parttime: "bg-amber-500/20 text-amber-500",
    contractor: "bg-blue-500/20 text-blue-500",
    intern: "bg-purple-500/20 text-purple-500",
  };
  return styles[type as keyof typeof styles] || "bg-muted text-muted-foreground";
};

export default function EmployeeTableContentDesktop({ data, onEdit, onDelete }: Props) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/50">
          {TABLE_HEADERS.map((header) => (
            <th
              key={header}
              className="text-left p-4 px-6 text-sm font-semibold text-muted-foreground"
            >
              {header}
            </th>
          ))}
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => (
            <tr
              key={employee.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="border-b border-border/30 hover:bg-muted/30 transition-colors animate-fade-in"
            >
              <td className="p-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {employee.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4 px-6">
                <span className="text-sm font-medium">
                  {employee.employeeNumber}
                </span>
              </td>
              <td className="p-4 px-6">
                <span className="text-sm">
                  {employee.department || "-"}
                </span>
              </td>
              <td className="p-4 px-6">
                <span className="text-sm">
                  {employee.position || "-"}
                </span>
              </td>
              <td className="p-4 px-6">
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize",
                    getEmploymentTypeBadge(employee.employmentType),
                  )}
                >
                  {employee.employmentType}
                </span>
              </td>
              <td className="p-4 px-6 text-right">
                <div className="flex items-center justify-end gap-1">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
