import { useTaskContext } from "../context/TaskContext.jsx";

function Header({ activePage, setActivePage }) {
  const {state} = useTaskContext();
  return (
    <div className="flex justify-between items-center bg-amber-100 py-5 h-56 px-5">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-3xl font-semibold">Hello!</h1>
        <p>Date</p>
        <p>Task Completion</p>
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
          <p>{state.tasks.filter((task) => task.completed === false).length}/{state.tasks.length}</p>
        <p>tasks left</p>
        </div>
        <p>habits done</p>
      </div>
    </div>
  );
}

export default Header;
