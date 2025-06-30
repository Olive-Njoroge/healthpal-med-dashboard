// src/components/ReminderForm.tsx
import { useState } from 'react';
import axios from 'axios';

interface ReminderFormProps {
  prefill?: {
    name?: string;
    to?: string;
  };
}

interface ReminderFormState {
  name: string;
  to: string;
  message: string;
  sendAt: string;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ prefill }) => {
  const [form, setForm] = useState<ReminderFormState>({
    name: prefill?.name || '',
    to: prefill?.to || '',
    message: '',
    sendAt: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      await axios.post('http://localhost:8081/api/reminders', form);
      setStatus('✅ Reminder scheduled successfully');
      setForm({ name: '', to: '', message: '', sendAt: '' });
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setStatus('❌ Failed to schedule reminder');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Schedule Reminder</h2>

      <input
        type="text"
        name="name"
        placeholder="Patient Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="to"
        placeholder="Phone Number (e.g. 0712345678)"
        value={form.to}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="message"
        placeholder="Reminder Message (e.g. Take 1 tablet of Paracetamol)"
        value={form.message}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="datetime-local"
        name="sendAt"
        value={form.sendAt}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
        Schedule Reminder
      </button>

      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
};

export default ReminderForm;
