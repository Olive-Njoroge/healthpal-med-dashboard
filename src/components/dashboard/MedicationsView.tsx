
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MedicationModal from './MedicationModal';

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

const MedicationsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      patient: 'Sarah Johnson',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      startDate: '2024-01-01',
      endDate: '2024-03-01',
      status: 'Active',
      instructions: 'Take with food in the morning',
      nextDose: '2024-01-21 08:00'
    },
    {
      id: '2',
      patient: 'Michael Chen',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2024-01-05',
      endDate: '2024-04-05',
      status: 'Active',
      instructions: 'Take with meals',
      nextDose: '2024-01-21 18:00'
    },
    {
      id: '3',
      patient: 'Emma Wilson',
      medication: 'Albuterol Inhaler',
      dosage: '90mcg',
      frequency: 'As needed',
      startDate: '2024-01-10',
      endDate: '2024-07-10',
      status: 'Active',
      instructions: 'Use as needed for breathing difficulties'
    }
  ]);

  const filteredMedications = medications.filter(medication => {
    const matchesSearch = medication.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medication.medication.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || medication.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddMedication = () => {
    setSelectedMedication(null);
    setIsModalOpen(true);
  };

  const handleEditMedication = (medication: Medication) => {
    setSelectedMedication(medication);
    setIsModalOpen(true);
  };

  const handleDeleteMedication = (medicationId: string) => {
    if (confirm('Are you sure you want to delete this medication?')) {
      setMedications(medications.filter(m => m.id !== medicationId));
    }
  };

  const handleSaveMedication = (medicationData: Omit<Medication, 'id'>) => {
    if (selectedMedication) {
      setMedications(medications.map(m => 
        m.id === selectedMedication.id 
          ? { ...medicationData, id: selectedMedication.id }
          : m
      ));
    } else {
      const newMedication = {
        ...medicationData,
        id: Date.now().toString()
      };
      setMedications([...medications, newMedication]);
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Discontinued':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUpcomingDoses = () => {
    return medications
      .filter(med => med.nextDose && med.status === 'Active')
      .sort((a, b) => new Date(a.nextDose!).getTime() - new Date(b.nextDose!).getTime())
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Medications</h1>
          <p className="text-slate-600 mt-1">Manage patient medications and schedules</p>
        </div>
        <Button 
          onClick={handleAddMedication}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Medication
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search by patient name or medication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="flex space-x-2">
              {['All', 'Active', 'Completed', 'Discontinued'].map(status => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className={filterStatus === status ? 'bg-teal-600 hover:bg-teal-700' : ''}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medications List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredMedications.map((medication) => (
            <Card key={medication.id} className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">{medication.medication}</h3>
                        <Badge className={getStatusColor(medication.status)}>
                          {medication.status}
                        </Badge>
                      </div>
                      <p className="text-slate-600 font-medium mb-1">{medication.patient}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>{medication.dosage}</span>
                        <span>•</span>
                        <span>{medication.frequency}</span>
                        <span>•</span>
                        <span>{new Date(medication.startDate).toLocaleDateString()} - {new Date(medication.endDate).toLocaleDateString()}</span>
                      </div>
                      {medication.instructions && (
                        <p className="text-sm text-slate-600 mt-2 italic">{medication.instructions}</p>
                      )}
                      {medication.nextDose && (
                        <p className="text-sm text-orange-600 mt-2 font-medium">
                          Next dose: {new Date(medication.nextDose).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditMedication(medication)}
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
                      onClick={() => handleDeleteMedication(medication.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredMedications.length === 0 && (
            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-12 text-center">
                <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No medications found</h3>
                <p className="text-slate-600 mb-4">
                  {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first medication'}
                </p>
                {!searchTerm && (
                  <Button onClick={handleAddMedication} className="bg-teal-600 hover:bg-teal-700 text-white">
                    Add Your First Medication
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upcoming Doses Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">
                Upcoming Doses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getUpcomingDoses().map((medication) => (
                  <div key={medication.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 text-sm truncate">{medication.medication}</p>
                        <p className="text-xs text-slate-600 truncate">{medication.patient}</p>
                        <p className="text-xs text-orange-600 font-medium mt-1">
                          {new Date(medication.nextDose!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-1 flex-shrink-0"></div>
                    </div>
                  </div>
                ))}
                {getUpcomingDoses().length === 0 && (
                  <div className="text-center py-6">
                    <svg className="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-slate-600">No upcoming doses scheduled</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-md bg-white mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">
                Medication Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Active Medications</span>
                  <span className="font-semibold text-green-600">
                    {medications.filter(m => m.status === 'Active').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Patients</span>
                  <span className="font-semibold text-slate-800">
                    {new Set(medications.map(m => m.patient)).size}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Due Today</span>
                  <span className="font-semibold text-orange-600">
                    {getUpcomingDoses().filter(m => 
                      new Date(m.nextDose!).toDateString() === new Date().toDateString()
                    ).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isModalOpen && (
        <MedicationModal
          medication={selectedMedication}
          onSave={handleSaveMedication}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MedicationsView;
