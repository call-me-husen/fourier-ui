import EmployeeTable from "@/components/ui/admin/employee-table";

export default function AdminEmployees() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your employees and their information
          </p>
        </div>
      </div>

      <EmployeeTable />
    </div>
  );
}