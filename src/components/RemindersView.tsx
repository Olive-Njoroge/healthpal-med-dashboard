// src/components/RemindersView.tsx
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';

const RemindersView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ReminderForm />
      <ReminderList />
    </div>
  );
};

export default RemindersView;
