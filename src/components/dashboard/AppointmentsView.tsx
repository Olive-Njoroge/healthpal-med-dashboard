
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppointmentModal from './AppointmentModal';

interface Appointment {
  id: string;
  patient: string;
  date: string;
  time: string;
  type: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-show';
  notes: string;
}

const AppointmentsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patient: 'Sarah Johnson',
      date: '2024-01-20',
      time: '09:00',
      type: 'Consultation',
      status: 'Scheduled',
      notes: 'Regular checkup for hypertension'
    },
    {
      id: '2',
      patient: 'Michael Chen',
      date: '2024-01-20',
      time: '10:30',
      type: 'Follow-up',
      status: 'Scheduled',
      notes: 'Diabetes management review'
    },
    {
      id: '3',
      patient: 'Emma Wilson',
      date: '2024-01-20',
      time: '14:00',
      type: 'Check-up',
      status: 'Completed',
      notes: 'Asthma medication adjustment'
    }
  ]);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = appointment.date === selectedDate;
    return matchesSearch && matchesDate;
  });

  const handleAddAppointment = () => {
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(a => a.id !== appointmentId));
    }
  };

  const handleSaveAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    if (selectedAppointment) {
      setAppointments(appointments.map(a => 
        a.id === selectedAppointment.id 
          ? { ...appointmentData, id: selectedAppointment.id }
          : a
      ));
    } else {
      const newAppointment = {
        ...appointmentData,
        id: Date.now().toString()
      };
      setAppointments([...appointments, newAppointment]);
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'No-show':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Appointments</h1>
          <p className="text-slate-600 mt-1">Schedule and manage patient appointments</p>
        </div>
        <Button 
          onClick={handleAddAppointment}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Schedule Appointment
        </Button>
      </div>

      {/* Search and Date Filter */}
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search by patient name or appointment type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="w-48">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-11"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Slots */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">
                Time Slots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {timeSlots.map(time => {
                  const hasAppointment = filteredAppointments.some(apt => apt.time === time);
                  return (
                    <div
                      key={time}
                      className={`p-3 rounded-lg border-2 border-dashed transition-colors ${
                        hasAppointment 
                          ? 'border-teal-300 bg-teal-50' 
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">{time}</span>
                        {hasAppointment ? (
                          <Badge className="bg-teal-100 text-teal-800">Booked</Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-500">Available</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">
                Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredAppointments.length > 0 ? (
                <div className="space-y-4">
                  {filteredAppointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((appointment) => (
                    <div key={appointment.id} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="font-semibold text-slate-800 text-lg">{appointment.time}</span>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditAppointment(appointment)}
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
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Cancel
                          </Button>
                        </div>
                      </div>
                      <div className="ml-5">
                        <h4 className="font-medium text-slate-800 mb-1">{appointment.patient}</h4>
                        <p className="text-sm text-slate-600 mb-2">{appointment.type}</p>
                        {appointment.notes && (
                          <p className="text-sm text-slate-500 italic">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No appointments scheduled</h3>
                  <p className="text-slate-600 mb-4">
                    {searchTerm ? 'No appointments match your search' : 'No appointments for this date'}
                  </p>
                  <Button onClick={handleAddAppointment} className="bg-teal-600 hover:bg-teal-700 text-white">
                    Schedule New Appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {isModalOpen && (
        <AppointmentModal
          appointment={selectedAppointment}
          onSave={handleSaveAppointment}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AppointmentsView;
