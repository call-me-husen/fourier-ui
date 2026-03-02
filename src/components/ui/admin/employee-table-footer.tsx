import cn from "@/lib/styles/cn";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  setCurrentPage: (page: number) => void;
}
export default function EmployeeTableFooter({ currentPage, totalPages, totalItems, perPage, setCurrentPage }: Props) {
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  return (
    <div className="p-4 border-t border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
      <p className="text-sm text-muted-foreground">
        {`Showing ${startIndex + 1} to ${Math.min(endIndex, totalItems)} of ${totalItems} employees`}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="first-page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="previous-page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                currentPage === page
                  ? "bg-indigo-500 text-white"
                  : "hover:bg-muted",
              )}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="next-page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="last-page"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
