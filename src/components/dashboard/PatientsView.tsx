import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import PatientModal from './PatientModal';
import { sendSMS } from '@/lib/sendSms'; // ✅ Adjust this path if needed

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  lastVisit?: string;
  status: 'Active' | 'Inactive';
}

const PatientsView = () => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      contact: '0712345678',
      lastVisit: '2024-01-15',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      contact: '0798765432',
      lastVisit: '2024-01-10',
      status: 'Active'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | undefined>();
  const [smsStatus, setSmsStatus] = useState<string | null>(null);

  const handleAddPatient = () => {
    setEditingPatient(undefined);
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const handleDeletePatient = (id: string) => {
    setPatients(prev => prev.filter(patient => patient.id !== id));
  };

  const handleSubmitPatient = (patientData: Patient) => {
    if (editingPatient) {
      setPatients(prev =>
        prev.map(patient =>
          patient.id === editingPatient.id ? patientData : patient
        )
      );
    } else {
      setPatients(prev => [...prev, patientData]);
    }
  };

  const handleSendReminder = async (patient: Patient) => {
    const message = `This is a reminder for your upcoming appointment and to take your medication as prescribed.`;
    const result = await sendSMS(patient.contact, message, patient.name);

    if (result.success) {
      setSmsStatus(`✅ Reminder sent to ${patient.name}`);
    } else {
      setSmsStatus(`❌ Failed to send SMS: ${result.error}`);
    }

    setTimeout(() => setSmsStatus(null), 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Patients</h1>
          <p className="text-slate-600 mt-1">Manage your patient records and information</p>
        </div>
        <Button onClick={handleAddPatient} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="grid gap-4">
        {patients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="font-medium text-slate-800">{patient.name}</span>
                    </div>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-slate-600">
                    <span>Age: {patient.age}</span>
                    <span>Gender: {patient.gender}</span>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>{patient.contact}</span>
                    </div>
                  </div>

                  {patient.lastVisit && (
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>Last visit: {patient.lastVisit}</span>
                    </div>
                  )}

                  <Button
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                    onClick={() => handleSendReminder(patient)}
                  >
                    📩 Send Reminder
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPatient(patient)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePatient(patient.id)}
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

      {smsStatus && (
        <p className="text-sm text-center text-blue-700 bg-blue-100 py-2 rounded">
          {smsStatus}
        </p>
      )}

      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitPatient}
        patient={editingPatient}
      />
    </div>
  );
};

export default PatientsView;
