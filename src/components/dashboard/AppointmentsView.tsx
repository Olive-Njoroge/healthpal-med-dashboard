
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Plus, Edit, Trash2 } from 'lucide-react';
import AppointmentModal from './AppointmentModal';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  notes?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

const AppointmentsView = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'John Smith',
      date: '2024-01-20',
      time: '10:00',
      reason: 'Regular Checkup',
      notes: 'Annual physical examination',
      status: 'Scheduled'
    },
    {
      id: '2',
      patientName: 'Sarah Johnson',
      date: '2024-01-20',
      time: '14:30',
      reason: 'Follow-up',
      notes: 'Blood pressure monitoring',
      status: 'Completed'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | undefined>();

  const handleAddAppointment = () => {
    setEditingAppointment(undefined);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== id));
  };

  const handleSubmitAppointment = (appointmentData: Appointment) => {
    if (editingAppointment) {
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === editingAppointment.id ? appointmentData : appointment
        )
      );
    } else {
      setAppointments(prev => [...prev, appointmentData]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Appointments</h1>
          <p className="text-slate-600 mt-1">Manage patient appointments and schedules</p>
        </div>
        <Button onClick={handleAddAppointment} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="font-medium text-slate-800">{appointment.patientName}</span>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-700">Reason: {appointment.reason}</p>
                    {appointment.notes && (
                      <p className="text-sm text-slate-600 mt-1">Notes: {appointment.notes}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditAppointment(appointment)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteAppointment(appointment.id)}
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

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitAppointment}
        appointment={editingAppointment}
      />
    </div>
  );
};

export default AppointmentsView;
