import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { showToast } from "@/lib/toastHelper";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ScholarshipTable, {
  Scholarship,
} from "@/components/Table/ScholarshipTable";
import { ScholarshipForm } from "./ScholarshipForm";

const mockScholarships: Scholarship[] = [
  {
    id: "SCH001",
    name: "Academic Excellence Scholarship",
    description: "Awarded to students with outstanding academic achievements.",
    condition: "GPA above 3.8",
    amount: 10000000,
    major_id: "CS",
    campus_id: "HCM",
    status: "Active",
    application_url: "https://example.com/apply",
  },
  {
    id: "SCH002",
    name: "Need-Based Financial Aid",
    description: "Financial aid for students with financial needs.",
    condition: "Family income below 5000000 VND",
    amount: 5000000,
    major_id: "ALL",
    campus_id: "HN",
    status: "Active",
    application_url: "https://example.com/apply",
  },
  {
    id: "SCH003",
    name: "Sports Excellence Scholarship",
    description: "For students excelling in sports.",
    condition: "National level athlete",
    amount: 8000000,
    major_id: "ALL",
    campus_id: "DN",
    status: "Closed",
    application_url: "https://example.com/apply",
  },
  {
    id: "SCH004",
    name: "International Student Scholarship",
    description:
      "Scholarship for international students with excellent academic records.",
    condition: "GPA above 3.5 and TOEFL above 90",
    amount: 15000000,
    major_id: "ALL",
    campus_id: "HCM",
    status: "Active",
    application_url: "https://example.com/apply",
  },
  {
    id: "SCH005",
    name: "Research Grant",
    description:
      "Funding for students conducting significant research projects.",
    condition: "Proposal approval required",
    amount: 20000000,
    major_id: "CS",
    campus_id: "HN",
    status: "Closed",
    application_url: "https://example.com/apply",
  },
];

const ScholarshipPage: React.FC = () => {
  const [scholarships, setScholarships] =
    useState<Scholarship[]>(mockScholarships);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState<Scholarship | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Scholarship | null>(null);

  const [counter, setCounter] = useState<number>(mockScholarships.length + 1);

  const filtered = scholarships.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      s.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAdd = () => {
    setSelected(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Scholarship) => {
    setSelected(item);
    setIsFormOpen(true);
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      setScholarships((prev) => prev.filter((s) => s.id !== deleteConfirm.id));
      setDeleteConfirm(null);
      showToast("success", "delete", true);
    } else {
      showToast("error", "delete", false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex w-full sm:max-w-md items-center space-x-2">
          <div className="relative w-full">
            <Input
              placeholder="Search scholarships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select onValueChange={setFilterStatus} defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleAdd}
            className="bg-orange-500 hover:bg-orange-600 ml-auto"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>

      <ScholarshipTable
        data={filtered}
        onEdit={handleEdit}
        onDelete={(item) => setDeleteConfirm(item)}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Scholarship</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteConfirm?.name}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selected ? "Edit Scholarship" : "Add New Scholarship"}
            </DialogTitle>
            <DialogDescription>
              {selected
                ? "Update the scholarship details below."
                : "Fill out the form to add a new scholarship."}
            </DialogDescription>
          </DialogHeader>

          <ScholarshipForm
            initialData={selected || undefined}
            onCancel={() => setIsFormOpen(false)}
            onSubmit={(data) => {
              if (selected) {
                // Edit mode
                setScholarships((prev) =>
                  prev.map((item) =>
                    item.id === selected.id ? { ...item, ...data } : item
                  )
                );
                showToast("success", "edit", true);
              } else {
                // Add mode
                const newScholarship = {
                  ...data,
                  id: `SCH${counter}`, // generate mock ID
                };
                setScholarships((prev) => [...prev, newScholarship]);
                setCounter(counter + 1);
                showToast("success", "add", true);
              }
              setIsFormOpen(false);
              setSelected(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScholarshipPage;
