import { useState } from "react";
import { useHabitContext } from "../context/HabitContext.jsx";
import ProgressBar from "../UI/ProgressBar.jsx";
import HabitList from "../components/HabitList.jsx";

function HabitPage() {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const { dispatch, stats } = useHabitContext();
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleAddHabit = () => {
    if (!userInput.trim()) return;

    dispatch({
      type: "ADD_HABIT",
      payload: {
        id: Math.floor(Math.random() * 1000),
        name: userInput,
      },
    });

    setShowAddHabit(false);
    setUserInput("");
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center w-full border-2 rounded-sm mt-5 py-4 px-4 gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">Focus Timer</h1>
          <p>Track your work sessions</p>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-2 rounded-sm hover:bg-green-800 cursor-pointer">
              Start
            </button>
            <button className="bg-red-600 text-white px-2 rounded-sm hover:bg-red-800 cursor-pointer">
              Reset
            </button>
          </div>
        </div>
        <h1>Timer</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center w-full py-4 px-4 gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="font-semibold">Daily Habits</h1>
          <p>Done Today:</p>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar
                completed={stats.completedToday}
                total={stats.total}
              />
            </div>

            {stats.total > 0 && (
              <p className="text-gray-600 whitespace-nowrap">
                {stats.completionRate}%
              </p>
            )}
          </div>
        </div>

        <button
          className="border-2 border-black px-3 py-1 rounded-sm hover:bg-black hover:text-white cursor-pointer"
          onClick={() => setShowAddHabit(true)}
        >
          + New Habit
        </button>
      </div>

      {showAddHabit && (
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-gray-200 w-full py-6 px-4 rounded-sm">
          <input
            className="border-2 rounded-full flex-1 px-3 py-2 min-w-0 bg-white"
            placeholder="add new habit..."
            onChange={handleUserInput}
            value={userInput}
          />
          <div className="flex gap-2">
            <button
              className="bg-gray-400 px-4 py-2 rounded-sm text-white hover:bg-gray-600 cursor-pointer"
              onClick={() => setShowAddHabit(false)}
            >
              Cancel
            </button>
            <button
              className="bg-gray-400 px-4 py-2 rounded-sm text-white hover:bg-gray-600 cursor-pointer"
              onClick={handleAddHabit}
            >
              Add
            </button>
          </div>
        </div>
      )}

      <HabitList />
    </div>
  );
}

export default HabitPage;
