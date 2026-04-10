import { useState } from "react";
import { useTaskContext } from "../context/TaskContext.jsx";

function TaskPage() {
  const [showAddTask, setShowAddTask] = useState(false);
  const { state, dispatch } = useTaskContext();
  const [userInput, setUserInput] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
 

  const handleUserInput = (e) => {
    const input = e.target.value;
    setUserInput(input);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setShowAddTask(true);
  };

  const handleSubmittingTask = () => {
    dispatch({
      type: "ADD_TASKS",
      payload: {
        id: Math.floor(Math.random() * 1000),
        text: userInput,
        category: category,
        priority: priority,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      },
    });

    setUserInput("");
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
    filteredList = filteredList.filter(task => task.text.toLowerCase().includes(state.search.toLowerCase()))
  }

  console.log(state.tasks);
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

      {showAddTask && (
        <div className="border rounded-lg flex flex-col gap-4 px-4 py-4 w-xl">
          <h1 className="text-2xl">New Task</h1>
          <input
            className="border rounded-md px-2"
            placeholder="What needs to be done...?"
            value={userInput}
            onChange={handleUserInput}
          ></input>
          <div>
            <p>PRIORITY</p>
            <div className="flex gap-4">
              <button
                className={
                  priority === "High"
                    ? "border rounded-full px-2 bg-red-800 text-white cursor-pointer"
                    : "border rounded-full px-2 bg-red-600 text-white hover:bg-red-800 cursor-pointer"
                }
                onClick={() => setPriority("High")}
              >
                High
              </button>
              <button
                className={
                  priority === "Medium"
                    ? "border rounded-full px-2 bg-yellow-700 text-white cursor-pointer"
                    : "border rounded-full px-2 bg-yellow-500 text-white hover:bg-yellow-700 cursor-pointer"
                }
                onClick={() => setPriority("Medium")}
              >
                Medium
              </button>
              <button
                className={
                  priority === "Low"
                    ? "border rounded-full px-2 bg-green-800 text-white cursor-pointer"
                    : "border rounded-full px-2 bg-green-600 text-white hover:bg-green-800 cursor-pointer"
                }
                onClick={() => setPriority("Low")}
              >
                Low
              </button>
            </div>
          </div>
          <div className="">
            <p>CATEGORY</p>
            <div className="flex gap-4">
              <button
                className={
                  category === "General"
                    ? "border rounded-full px-2 bg-amber-950 text-white cursor-pointer"
                    : "border rounded-full px-2 bg-amber-800 hover:bg-amber-950 text-white cursor-pointer"
                }
                onClick={() => setCategory("General")}
              >
                General
              </button>
              <button
                className={
                  category === "Work"
                    ? "border rounded-full px-2 bg-amber-950 text-white cursor-pointer"
                    : "border rounded-full px-2 bg-amber-800 hover:bg-amber-950 text-white cursor-pointer"
                }
                onClick={() => setCategory("Work")}
              >
                Work
              </button>
              <button
                className={
                  category === "Personal"
                    ? "border rounded-full px-2 bg-amber-950 text-white cursor-pointer"
                    : "border rounded-full px-2 bg-amber-800 hover:bg-amber-950 text-white cursor-pointer"
                }
                onClick={() => setCategory("Personal")}
              >
                Personal
              </button>
              <button
                className={
                  category === "Health"
                    ? "border rounded-full px-2 bg-amber-950 text-white cursor-pointer"
                    : "border rounded-full px-2 bg-amber-800 hover:bg-amber-950 text-white cursor-pointer"
                }
                onClick={() => setCategory("Health")}
              >
                Health
              </button>
              <button
                className={
                  category === "Learning"
                    ? "border rounded-full px-2 bg-amber-950 text-white cursor-pointer"
                    : "border rounded-full px-2 bg-amber-800 hover:bg-amber-950 text-white cursor-pointer"
                }
                onClick={() => setCategory("Learning")}
              >
                Learning
              </button>
              <button
                className={
                  category === "Shopping"
                    ? "border rounded-full px-2 bg-amber-950 text-white cursor-pointer"
                    : "border rounded-full px-2 bg-amber-800 hover:bg-amber-950 text-white cursor-pointer"
                }
                onClick={() => setCategory("Shopping")}
              >
                Shopping
              </button>
            </div>
          </div>
          <div className="flex gap-12">
            <button
              className="bg-gray-200 px-2 rounded-sm cursor-pointer hover:bg-gray-400"
              onClick={() => setShowAddTask(false)}
            >
              Cancel
            </button>
            <button
              className="bg-gray-200 px-2 rounded-sm cursor-pointer hover:bg-gray-400"
              onClick={handleSubmittingTask}
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-12">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="w-86 border rounded-sm px-2"
            placeholder="Search tasks..."
            value={state.search}
            onChange={(e) => dispatch({type: "SEARCH_TASKS", payload: {
              search: e.target.value
            }})}
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
          {filteredList.map((task) => (
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
                  &#x2713;
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
