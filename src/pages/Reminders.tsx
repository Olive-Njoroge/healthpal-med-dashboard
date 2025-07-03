// import ReminderForm from "@/components/ReminderForm";
// import ReminderList from "@/components/ReminderList";

// const Reminders = () => {
//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-4">
//       <h1 className="text-2xl font-bold mb-4 text-center">Schedule Medication Reminder</h1>
//       <ReminderForm />
//       <ReminderList />
//     </div>
//   );
// };

// export default Reminders;
// src/pages/Reminders.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import ReminderForm from "@/components/ReminderForm";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/reminders").then((res) => {
      setReminders(res.data);
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Schedule Medication Reminder</h1>
      <ReminderForm />

      <h2 className="text-xl font-semibold mt-10 mb-2">Scheduled Reminders</h2>
      <ul className="space-y-2">
        {reminders.map((r) => (
          <li key={r._id} className="border p-3 rounded bg-gray-50">
            <p><strong>{r.name}</strong> — {r.medication}</p>
            <p>📅 {new Date(r.sendAt).toLocaleString()}</p>
            <p>📞 {r.phone}</p>
            <p>{r.sent ? "✅ Sent" : "⏳ Pending"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;
