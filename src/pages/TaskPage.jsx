import { useState } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";
import TaskForm from "../components/TaskForm.jsx";

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

  const sortedList = [...filteredList].sort((a,b) => a.completed - b.completed)
  
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

      <ul>
        <div className="relative flex flex-col gap-4">
          {sortedList.map((task) => (
            <div className="flex flex-col px-2 w-xl  py-2 border rounded-lg gap-3">
              <div className="flex gap-4">
                <button
                  className="border bg-gray-100 w-6 h-6 rounded-full hover:bg-gray-300"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_TASK",
                      payload: {
                        id: task.id,
                        completed: task.completed,
                        completedAt: task.completedAt,
                      },
                    })
                  }
                >
                  {task.completed ? "✓" : ""}
                </button>
                <li className="font-bold text-black">{task.text}</li>
              </div>
              <button
                className="absolute left-96 border rounded-full w-6 h-6 mt-4 bg-red-500 text-white hover:bg-red-900 cursor-pointer"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_TASKS",
                    payload: {
                      id: task.id,
                    },
                  })
                }
              >
                -
              </button>
              <div className="flex gap-4">
                <p>{task.priority}</p>
                <p>{task.category}</p>
              </div>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default TaskPage;
