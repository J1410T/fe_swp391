import { Table } from "@tanstack/react-table";
import { Scholarship } from "./ScholarshipTable";
import { Button } from "../ui/button";

interface Props {
  table: Table<Scholarship>;
}

const TablePaginationInfo = ({ table }: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground">
      <div>
        {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected. */}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TablePaginationInfo;
