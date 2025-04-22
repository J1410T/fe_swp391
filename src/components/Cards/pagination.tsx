import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const renderPageButtons = () => {
    const buttons = [];

    // Previous button
    buttons.push(
      <Button
        key="prev"
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        className="text-sm"
      >
        Trước
      </Button>
    );

    // First few pages
    for (let i = 1; i <= 3 && i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          className={`text-sm ${
            currentPage === i ? "bg-orange-500 hover:bg-orange-600" : ""
          }`}
        >
          {i}
        </Button>
      );
    }

    // Ellipsis if needed
    if (totalPages > 6) {
      buttons.push(
        <Button
          key="ellipsis"
          variant="outline"
          size="sm"
          disabled
          className="text-sm"
        >
          ...
        </Button>
      );
    }

    // Last page
    if (totalPages > 3) {
      buttons.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          className="text-sm"
        >
          {totalPages}
        </Button>
      );
    }

    // Next button
    buttons.push(
      <Button
        key="next"
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        className="text-sm"
      >
        Tiếp
      </Button>
    );

    return buttons;
  };

  return <div className="flex gap-2">{renderPageButtons()}</div>;
}
