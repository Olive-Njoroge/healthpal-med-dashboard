
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Medication {
  id: string;
  patient: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Discontinued';
  instructions: string;
  nextDose?: string;
}

interface MedicationModalProps {
  medication: Medication | null;
  onSave: (medication: Omit<Medication, 'id'>) => void;
  onClose: () => void;
}

const MedicationModal = ({ medication, onSave, onClose }: MedicationModalProps) => {
  const [formData, setFormData] = useState({
    patient: '',
    medication: '',
    dosage: '',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'Active' as const,
    instructions: '',
    nextDose: ''
  });

  useEffect(() => {
    if (medication) {
      setFormData({
        patient: medication.patient,
        medication: medication.medication,
        dosage: medication.dosage,
        frequency: medication.frequency,
        startDate: medication.startDate,
        endDate: medication.endDate,
        status: medication.status,
        instructions: medication.instructions,
        nextDose: medication.nextDose || ''
      });
    }
  }, [medication]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const medicationData = {
      ...formData,
      nextDose: formData.nextDose || undefined
    };
    onSave(medicationData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const frequencies = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Four times daily',
    'Every 6 hours',
    'Every 8 hours',
    'Every 12 hours',
    'As needed',
    'Weekly',
    'Monthly'
  ];

  // Mock patient list - in a real app, this would come from your patients data
  const patients = [
    'Sarah Johnson',
    'Michael Chen',
    'Emma Wilson',
    'David Brown',
    'Lisa Anderson',
    'Robert Davis',
    'Jane Smith',
    'John Doe'
  ];

  const commonMedications = [
    'Lisinopril',
    'Metformin',
    'Amlodipine',
    'Metoprolol',
    'Omeprazole',
    'Simvastatin',
    'Levothyroxine',
    'Azithromycin',
    'Amoxicillin',
    'Ibuprofen',
    'Acetaminophen',
    'Albuterol',
    'Prednisone',
    'Gabapentin',
    'Sertraline'
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            {medication ? 'Edit Medication' : 'Add New Medication'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Patient</Label>
              <Select value={formData.patient} onValueChange={(value) => handleChange('patient', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(patient => (
                    <SelectItem key={patient} value={patient}>{patient}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medication" className="text-slate-700 font-medium">
                Medication Name
              </Label>
              <Select value={formData.medication} onValueChange={(value) => handleChange('medication', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select or type medication" />
                </SelectTrigger>
                <SelectContent>
                  {commonMedications.map(med => (
                    <SelectItem key={med} value={med}>{med}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dosage" className="text-slate-700 font-medium">
                Dosage
              </Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => handleChange('dosage', e.target.value)}
                placeholder="e.g., 10mg, 500mg"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Frequency</Label>
              <Select value={formData.frequency} onValueChange={(value) => handleChange('frequency', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map(freq => (
                    <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-slate-700 font-medium">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-slate-700 font-medium">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                required
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextDose" className="text-slate-700 font-medium">
                Next Dose (Optional)
              </Label>
              <Input
                id="nextDose"
                type="datetime-local"
                value={formData.nextDose}
                onChange={(e) => handleChange('nextDose', e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-slate-700 font-medium">
              Instructions
            </Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
              placeholder="Special instructions for taking this medication..."
              rows={3}
              className="resize-none"
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
              {medication ? 'Update Medication' : 'Add Medication'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationModal;
