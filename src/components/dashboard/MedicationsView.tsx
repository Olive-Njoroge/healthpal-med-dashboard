
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pill, Clock, User, Plus, Edit, Trash2 } from 'lucide-react';
import MedicationModal from './MedicationModal';

interface Medication {
  id: string;
  patientName: string;
  name: string;
  dosage: string;
  instructions: string;
  scheduleTime: string;
  status: 'Active' | 'Completed' | 'Discontinued';
}

const MedicationsView = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      patientName: 'John Smith',
      name: 'Lisinopril',
      dosage: '10mg',
      instructions: 'Take once daily with water',
      scheduleTime: '08:00',
      status: 'Active'
    },
    {
      id: '2',
      patientName: 'Sarah Johnson',
      name: 'Metformin',
      dosage: '500mg',
      instructions: 'Take twice daily with meals',
      scheduleTime: '08:00, 20:00',
      status: 'Active'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | undefined>();

  const handleAddMedication = () => {
    setEditingMedication(undefined);
    setIsModalOpen(true);
  };

  const handleEditMedication = (medication: Medication) => {
    setEditingMedication(medication);
    setIsModalOpen(true);
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(prev => prev.filter(medication => medication.id !== id));
  };

  const handleSubmitMedication = (medicationData: Medication) => {
    if (editingMedication) {
      setMedications(prev => 
        prev.map(medication => 
          medication.id === editingMedication.id ? medicationData : medication
        )
      );
    } else {
      setMedications(prev => [...prev, medicationData]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Medications</h1>
          <p className="text-slate-600 mt-1">Manage patient medications and prescriptions</p>
        </div>
        <Button onClick={handleAddMedication} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </Button>
      </div>

      <div className="grid gap-4">
        {medications.map((medication) => (
          <Card key={medication.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="font-medium text-slate-800">{medication.patientName}</span>
                    </div>
                    <Badge className={getStatusColor(medication.status)}>
                      {medication.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-slate-500" />
                    <span className="font-semibold text-slate-800">{medication.name}</span>
                    <span className="text-slate-600">({medication.dosage})</span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-slate-600">{medication.instructions}</p>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>Schedule: {medication.scheduleTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditMedication(medication)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteMedication(medication.id)}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <MedicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitMedication}
        medication={editingMedication}
      />
    </div>
  );
};

export default MedicationsView;
