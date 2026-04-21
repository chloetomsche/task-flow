import { useTaskContext } from "../context/TaskContext.jsx";
import { useHabitContext } from "../context/HabitContext.jsx";
import ProgressBar from "../UI/ProgressBar.jsx";

function Header({ activePage, setActivePage }) {
  const { stats } = useTaskContext();
  const { state: taskState } = useTaskContext();
  const { state: habitState } = useHabitContext();

  return (
    <div className="flex justify-between items-center bg-amber-100 py-5 h-56 px-5">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-3xl font-semibold">Hello!</h1>
        <p>Date: {new Date().toLocaleDateString()}</p>

        <div className="flex flex-col gap-3 w-64">
          <p className="font-medium">Task Completion:</p>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar completed={stats.completed} total={stats.total} />
            </div>

            {stats.total > 0 && (
              <p className="text-gray-600 whitespace-nowrap">
                {stats.completionRate}%
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className={
              activePage === "tasks"
                ? "border-2 border-black rounded-sm px-2 cursor-pointer bg-black text-white "
                : "border-2 border-black rounded-sm px-2 cursor-pointer hover:bg-black hover:text-white "
            }
            onClick={() => setActivePage("tasks")}
          >
            Tasks
          </button>
          <button
            className={
              activePage === "habits"
                ? "border-2 border-black rounded-sm px-2 cursor-pointer bg-black text-white "
                : "border-2 border-black rounded-sm px-2 cursor-pointer hover:bg-black hover:text-white "
            }
            onClick={() => setActivePage("habits")}
          >
            Habits
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <p>
            {taskState.tasks.filter((task) => task.completed === false).length}/
            {taskState.tasks.length}
          </p>
          <p>tasks left</p>
        </div>
        <div className="flex flex-col items-center">
          <p>
            {
              habitState.habits.filter(
                (habit) => habit.completedToday === false
              ).length
            }
            /{habitState.habits.length}
          </p>
          <p>habits left</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
