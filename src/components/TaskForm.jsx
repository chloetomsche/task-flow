import { useTaskContext } from "../context/TaskContext";
import { priorities } from "../utilities/helpers.js";
import { categories } from "../utilities/helpers.js";
import { useState } from "react";

function TaskForm({setShowAddTask}) {
  const [userInput, setUserInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const { dispatch } = useTaskContext();

  const handleUserInput = (e) => {
    const input = e.target.value;
    setUserInput(input);
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

    setShowAddTask(false);

    setUserInput("");
  };

  return (
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
          {Object.entries(priorities).map(([index, value]) => (
            <button
              key={index}
              onClick={() => setPriority(index)}
              className={
                priority === index
                  ? `${value.bg} ${value.color} ${value.border} ${value.padding}`
                  : " bg-gray-400 text-white px-2 rounded-sm cursor-pointer"
              }
            >
              {value.label}
            </button>
          ))}
        </div>
      </div>
      <div className="">
        <p>CATEGORY</p>
        <div className="flex gap-4">
          {Object.entries(categories).map(([index, value]) => (
            <button
              key={index}
              onClick={() => setCategory(index)}
              className={
                category === index
                  ? `${value.bg} ${value.color} ${value.border} ${value.padding}`
                  : " bg-gray-400 text-white px-2 rounded-sm cursor-pointer"
              }
            >
              {value.label}
            </button>
          ))}
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
  );
}

export default TaskForm;
