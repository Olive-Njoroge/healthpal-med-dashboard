
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Medication {
  id: string;
  patientName: string;
  name: string;
  dosage: string;
  instructions: string;
  scheduleTime: string;
  status: 'Active' | 'Completed' | 'Discontinued';
}

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Medication) => void;
  medication?: Medication;
}

const MedicationModal = ({ isOpen, onClose, onSubmit, medication }: MedicationModalProps) => {
  const [formData, setFormData] = useState({
    patientName: medication?.patientName || '',
    name: medication?.name || '',
    dosage: medication?.dosage || '',
    instructions: medication?.instructions || '',
    scheduleTime: medication?.scheduleTime || '',
    status: (medication?.status || 'Active') as 'Active' | 'Completed' | 'Discontinued'
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      id: medication?.id || Math.random().toString(36).substring(7),
      ...formData,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {medication ? 'Edit Medication' : 'Add Medication'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              value={formData.patientName}
              onChange={(e) => handleChange('patientName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="name">Medication Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dosage">Dosage</Label>
            <Input
              id="dosage"
              value={formData.dosage}
              onChange={(e) => handleChange('dosage', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Input
              id="instructions"
              value={formData.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="scheduleTime">Schedule Time</Label>
            <Input
              id="scheduleTime"
              value={formData.scheduleTime}
              onChange={(e) => handleChange('scheduleTime', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value as 'Active' | 'Completed' | 'Discontinued')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {medication ? 'Update Medication' : 'Add Medication'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationModal;
