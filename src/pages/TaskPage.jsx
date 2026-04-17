import { useState } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

function TaskPage() {
  const [showAddTask, setShowAddTask] = useState(false);
  const { state, dispatch } = useTaskContext();

  const handleAddTask = (e) => {
    e.preventDefault();
    setShowAddTask(true);
  };

  let filteredList;

  if (state.filter === "All") {
    filteredList = state.tasks;
  } else if (state.filter === "Active") {
    filteredList = state.tasks.filter((task) => task.completed === false);
  } else {
    filteredList = state.tasks.filter((task) => task.completed === true);
  }
  if (state.search) {
    filteredList = filteredList.filter((task) =>
      task.text.toLowerCase().includes(state.search.toLowerCase())
    );
  }

  const sortedList = [...filteredList].sort(
    (a, b) => a.completed - b.completed
  );

  return (
    <div className="flex flex-col mt-8 ml-8 gap-8">
      <form>
        <button
          className="w-xl border rounded-full cursor-pointer hover:bg-gray-100"
          onClick={handleAddTask}
        >
          + Add a new task...
        </button>
      </form>

      {showAddTask && <TaskForm setShowAddTask={setShowAddTask} />}

      <div className="flex gap-12">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="w-86 border rounded-sm px-2"
            placeholder="Search tasks..."
            value={state.search}
            onChange={(e) =>
              dispatch({
                type: "SEARCH_TASKS",
                payload: {
                  search: e.target.value,
                },
              })
            }
          ></input>
        </form>
        <div className="flex gap-6 border px-3 py-2 rounded-sm">
          <div className="flex gap-1">
            <button
              className={
                state.filter === "All"
                  ? "px-2 bg-gray-300 rounded-xs"
                  : "px-2 hover:bg-gray-300 rounded-xs"
              }
              onClick={() =>
                dispatch({
                  type: "FILTER_STATUS",
                  payload: {
                    status: "All",
                  },
                })
              }
            >
              All
            </button>
            <p className="flex bg-gray-500 w-4 h-4 rounded-full justify-center text-xs text-white">
              {state.tasks.length}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              className={
                state.filter === "Active"
                  ? "px-2 bg-gray-300 rounded-xs"
                  : "px-2 hover:bg-gray-300 rounded-xs"
              }
              onClick={() =>
                dispatch({
                  type: "FILTER_STATUS",
                  payload: {
                    status: "Active",
                  },
                })
              }
            >
              Active
            </button>
            <p className="flex bg-gray-500 w-4 h-4 rounded-full justify-center text-xs text-white">
              {state.tasks.filter((task) => task.completed === false).length}
            </p>
          </div>
          <button
            className={
              state.filter === "Done"
                ? "px-2 bg-gray-300 rounded-xs"
                : "px-2 hover:bg-gray-300 rounded-xs"
            }
            onClick={() =>
              dispatch({
                type: "FILTER_STATUS",
                payload: {
                  status: "Done",
                },
              })
            }
          >
            Done
          </button>
        </div>
      </div>
      <TaskList sortedList={sortedList}/>
      
    </div>
  );
}

export default TaskPage;
