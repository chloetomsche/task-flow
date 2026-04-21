import { useHabitContext } from "../context/HabitContext.jsx";
import HabitItem from "./HabitItem.jsx";

function HabitList() {
  const { state } = useHabitContext();

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 list-none p-0 m-0">
      {state.habits.map((habit) => (
        <li key={habit.id}>
          <HabitItem habit={habit} />
        </li>
      ))}
    </ul>
  );
}

export default HabitList;
