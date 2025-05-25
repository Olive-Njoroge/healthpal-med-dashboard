
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
  status: 'Active' | 'Inactive' | 'Critical';
  phone: string;
  email: string;
}

interface PatientModalProps {
  patient: Patient | null;
  onSave: (patient: Omit<Patient, 'id'>) => void;
  onClose: () => void;
}

const PatientModal = ({ patient, onSave, onClose }: PatientModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    condition: '',
    lastVisit: '',
    status: 'Active' as const,
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        age: patient.age.toString(),
        gender: patient.gender,
        condition: patient.condition,
        lastVisit: patient.lastVisit,
        status: patient.status,
        phone: patient.phone,
        email: patient.email
      });
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      condition: formData.condition,
      lastVisit: formData.lastVisit,
      status: formData.status,
      phone: formData.phone,
      email: formData.email
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            {patient ? 'Edit Patient' : 'Add New Patient'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700 font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter patient name"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-slate-700 font-medium">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                placeholder="Enter age"
                required
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition" className="text-slate-700 font-medium">
              Medical Condition
            </Label>
            <Input
              id="condition"
              value={formData.condition}
              onChange={(e) => handleChange('condition', e.target.value)}
              placeholder="Enter primary medical condition"
              required
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700 font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="patient@email.com"
                required
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastVisit" className="text-slate-700 font-medium">
              Last Visit Date
            </Label>
            <Input
              id="lastVisit"
              type="date"
              value={formData.lastVisit}
              onChange={(e) => handleChange('lastVisit', e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6"
            >
              {patient ? 'Update Patient' : 'Add Patient'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientModal;
