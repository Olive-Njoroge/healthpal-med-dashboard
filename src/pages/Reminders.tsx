import ReminderForm from "@/components/ReminderForm";

const Reminders = () => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Schedule Medication Reminder</h1>
      <ReminderForm />
    </div>
  );
};

export default Reminders;
