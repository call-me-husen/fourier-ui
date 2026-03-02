"use client";

import { User } from "lucide-react";
import { useState } from "react";
import EmployeeTableHeader from "./employee-table-header";
import EmployeeTableFooter from "./employee-table-footer";
import EmployeeTableContentDesktop from "./employee-table-content-desktop";
import EmployeeTableContentMobile from "./employee-table-content-mobile";

const ITEMS_PER_PAGE = 5;

const data = [];
const totalPages = 10;

export default function EmployeeTable() {
  const [currentPage, setCurrentPage] = useState(1);
  
  
  return (
    <div className="group relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-lg animate-fade-in">
      <EmployeeTableHeader onFilterChange={() => {}} onAddEmployee={() => {}} />

      {/* Mobile View - Card Layout */}
      <EmployeeTableContentMobile 
        data={[]}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => console.log("Delete", id)}
      />

      {/* Desktop View - Table Layout */}
      <EmployeeTableContentDesktop 
        data={[]}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => console.log("Delete", id)}
      />

      {data.length === 0 && (
        <div className="p-12 text-center">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No employees found</p>
        </div>
      )}

      {data.length > 0 && (
        <EmployeeTableFooter 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={data.length}
          perPage={ITEMS_PER_PAGE}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
