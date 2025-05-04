import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Edit, Trash2, Calendar, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AcademicYearCardProps {
  year: string;
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  children?: React.ReactNode;
}

export function AcademicYearCard({
  year,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  children,
}: AcademicYearCardProps) {
  // Hiệu ứng khi hover
  const cardHoverAnimation = {
    rest: { scale: 1, },
    hover: { 
      scale: 1.005, 
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  // Hiệu ứng cho các nút
  const buttonAnimation = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHoverAnimation}
    >
      <Card className={cn(
        "w-full overflow-hidden border",
        expanded 
          ? "border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50" 
          : "border-gray-200 hover:border-orange-200 bg-white hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50"
      )}>
        <CardHeader
          className={cn(
            "flex flex-row items-center justify-between cursor-pointer p-4 transition-all duration-300",
            expanded ? "pb-2" : "pb-4"
          )}
          onClick={onToggle}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-full transition-colors duration-300",
              expanded ? "bg-orange-100" : "bg-gray-100"
            )}>
              <Calendar className={cn(
                "h-5 w-5 transition-colors duration-300",
                expanded ? "text-orange-500" : "text-gray-500"
              )} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <CardTitle className={cn(
                  "text-xl transition-colors duration-300",
                  expanded ? "text-orange-700" : "text-gray-700"
                )}>
                  Năm tuyển sinh {year}
                </CardTitle>
                <Badge className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600">
                  {year}
                </Badge>
              </div>
              <CardDescription className="text-sm flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Quản lý ngành học và học bổng</span>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.div variants={buttonAnimation}>
              <Button
                variant="outline"
                size="icon"
                className="border-orange-200 text-orange-500 hover:text-orange-600 hover:bg-orange-50 hover:border-orange-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div variants={buttonAnimation}>
              <Button
                variant="outline"
                size="icon"
                className="border-red-200 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div 
              className="p-1 rounded-full bg-orange-100"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-orange-500" />
            </motion.div>
          </div>
        </CardHeader>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Separator className="bg-gradient-to-r from-orange-200 to-amber-200" />
              <CardContent className="pt-6 pb-6">{children}</CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
