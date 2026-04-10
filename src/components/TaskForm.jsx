import { useTaskContext } from "../context/TaskContext";
import { priorities } from "../utilities/helpers.js";
function TaskForm() {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const { dispatch } = useTaskContext();

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
        <div>
            {Object.entries(priorities).map(([index, value]) => (
                <button key={index}
                onClick={() => setPriority(index)}
                className={priority === index ? `${value.bg} ${value.color} ${value.border}` :" bg-red-200 text-red-300 border-red-500"}
                >{value.label}</button>
            )
            )}
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
  );
}
