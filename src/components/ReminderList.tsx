import { useEffect, useState } from 'react';
import axios from 'axios';

interface Reminder {
  _id: string;
  name: string;
  phone: string;
  medication?: string;
  type: string;
  sendAt: string;
  sent: boolean;
}

const ReminderList = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/reminders');
        setReminders(res.data);
      } catch (err) {
        console.error('Failed to fetch reminders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  if (loading) return <p className="text-center">Loading reminders...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">📋 All Scheduled Reminders</h2>
      {reminders.length === 0 ? (
        <p>No reminders scheduled.</p>
      ) : (
        <ul className="space-y-3">
          {reminders.map((r) => (
            <li key={r._id} className="p-4 border rounded shadow-sm bg-white">
              <p><strong>Name:</strong> {r.name}</p>
              <p><strong>Phone:</strong> {r.phone}</p>
              <p><strong>Type:</strong> {r.type}</p>
              {r.medication && <p><strong>Medication:</strong> {r.medication}</p>}
              <p><strong>Send At:</strong> {new Date(r.sendAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {r.sent ? '✅ Sent' : '⏳ Pending'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReminderList;
