import { useState, useEffect, ChangeEvent } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";

export interface Dormitory {
  id?: string;
  name: string;
  campus_id: string;
  description: string;
  capacity: number;
  status: string;
  roomNumber: string;
  building: string;
  roomType: number;
  price: number;
}

interface DormitoryFormProps {
  data: Partial<Dormitory>;
  mode: "add" | "edit" | "view";
  onSubmit: (data: Dormitory) => void;
  onCancel: () => void;
}

export function DormitoryForm({
  data,
  mode,
  onSubmit,
  onCancel,
}: DormitoryFormProps) {
  const [formData, setFormData] = useState<Dormitory>({
    name: "",
    campus_id: "",
    description: "",
    capacity: 0,
    status: "Available || Full",
    roomNumber: "",
    building: "",
    roomType: 0,
    price: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        campus_id: data.campus_id || "",
        description: data.description || "",
        capacity: data.capacity || 0,
        status: data.status || "Available",
        roomNumber: data.roomNumber || "",
        building: data.building || "",
        roomType: data.roomType || 0,
        price: data.price || 0,
      });
    }
  }, [data]);

  const isReadOnly = mode === "view";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value ? parseInt(value) : 0 }));
  };

  const handleSelectChange = (name: keyof Dormitory, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReadOnly) {
      const formData = new FormData(e.target as HTMLFormElement);
      const updatedData: Dormitory = {
        name: formData.get("name") as string,
        campus_id: formData.get("campus_id") as string,
        description: formData.get("description") as string,
        capacity: parseInt(formData.get("capacity") as string) || 0,
        status: formData.get("status") as string,
        roomNumber: formData.get("roomNumber") as string,
        building: formData.get("building") as string,
        roomType: parseInt(formData.get("roomType") as string) || 0,
        price: parseInt(formData.get("price") as string) || 0,
      };
      onSubmit(updatedData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        {/* Room Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Room Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={isReadOnly}
            className={`input ${isReadOnly ? "bg-gray-100" : ""}`}
            required
          />
        </div>

        {/* Description */}
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

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price">Price (VND)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleNumberChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Room Number */}
          <div className="space-y-2">
            <Label htmlFor="roomNumber">Room Number</Label>
            <Input
              id="roomNumber"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Building */}
          <div className="space-y-2">
            <Label htmlFor="building">Building</Label>
            <Input
              id="building"
              name="building"
              value={formData.building}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Capacity */}
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleNumberChange}
              required
            />
          </div>

          {/* Room Type */}
          <div className="space-y-2">
            <Label htmlFor="roomType">Room Type</Label>
            <Input
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Status */}
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
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Full">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Footer Buttons */}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        {!isReadOnly && (
          <Button type="submit" variant="default">
            {mode === "add" ? "Add" : "Save"}
          </Button>
        )}
      </DialogFooter>
    </form>
  );
}
