import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type ScholarshipData = {
  id?: string;
  name: string;
  description: string;
  condition: string;
  amount: number;
  major_id: string;
  campus_id: string;
  status: string;
  application_url: string;
};

type ScholarshipFormProps = {
  initialData?: ScholarshipData;
  onSubmit: (data: ScholarshipData) => void;
  onCancel: () => void;
};

export function ScholarshipForm({
  initialData,
  onSubmit,
  onCancel,
}: ScholarshipFormProps) {
  const [formData, setFormData] = useState<ScholarshipData>({
    name: "",
    description: "",
    condition: "",
    amount: 0,
    major_id: "",
    campus_id: "",
    status: "Active",
    application_url: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        condition: initialData.condition || "",
        amount: initialData.amount || 0,
        major_id: initialData.major_id || "",
        campus_id: initialData.campus_id || "",
        status: initialData.status || "Active",
        application_url: initialData.application_url || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof ScholarshipData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Scholarship Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <Textarea
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (VND)</Label>
            <Input
              id="amount"
              name="amount"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              min="0"
              step="500000"
              value={formData.amount}
              onChange={handleNumberChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="major_id">Major ID</Label>
            <Input
              id="major_id"
              name="major_id"
              value={formData.major_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campus_id">Campus ID</Label>
            <Input
              id="campus_id"
              name="campus_id"
              value={formData.campus_id}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="application_url">Application URL</Label>
          <Input
            id="application_url"
            name="application_url"
            type="url"
            value={formData.application_url}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
}
