
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PatientModal from './PatientModal';

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

const PatientsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 34,
      gender: 'Female',
      condition: 'Hypertension',
      lastVisit: '2024-01-15',
      status: 'Active',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@email.com'
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 45,
      gender: 'Male',
      condition: 'Diabetes Type 2',
      lastVisit: '2024-01-12',
      status: 'Active',
      phone: '(555) 234-5678',
      email: 'michael.chen@email.com'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      age: 28,
      gender: 'Female',
      condition: 'Asthma',
      lastVisit: '2024-01-18',
      status: 'Critical',
      phone: '(555) 345-6789',
      email: 'emma.wilson@email.com'
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleDeletePatient = (patientId: string) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== patientId));
    }
  };

  const handleSavePatient = (patientData: Omit<Patient, 'id'>) => {
    if (selectedPatient) {
      // Edit existing patient
      setPatients(patients.map(p => 
        p.id === selectedPatient.id 
          ? { ...patientData, id: selectedPatient.id }
          : p
      ));
    } else {
      // Add new patient
      const newPatient = {
        ...patientData,
        id: Date.now().toString()
      };
      setPatients([...patients, newPatient]);
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Patients</h1>
          <p className="text-slate-600 mt-1">Manage your patient records</p>
        </div>
        <Button 
          onClick={handleAddPatient}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search patients by name or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11"
              />
            </div>
            <Button variant="outline" className="h-11">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-slate-600">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-slate-800">{patient.name}</h3>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span>{patient.age} years • {patient.gender}</span>
                      <span>•</span>
                      <span>{patient.condition}</span>
                      <span>•</span>
                      <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                      <span>{patient.phone}</span>
                      <span>•</span>
                      <span>{patient.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPatient(patient)}
                    className="text-teal-600 border-teal-200 hover:bg-teal-50"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePatient(patient.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="border-0 shadow-md bg-white">
          <CardContent className="p-12 text-center">
            <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No patients found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first patient'}
            </p>
            {!searchTerm && (
              <Button onClick={handleAddPatient} className="bg-teal-600 hover:bg-teal-700 text-white">
                Add Your First Patient
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {isModalOpen && (
        <PatientModal
          patient={selectedPatient}
          onSave={handleSavePatient}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PatientsView;
