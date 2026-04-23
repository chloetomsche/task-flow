import { useState } from "react";
import { useHabitContext } from "../context/HabitContext.jsx";
import ProgressBar from "../UI/ProgressBar.jsx";
import HabitList from "../components/HabitList.jsx";
import useTimer from "../hooks/useTimer.js";
import HabitForm from "../components/HabitForm.jsx";

function HabitPage() {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const { stats } = useHabitContext();

  const timer = useTimer();

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center w-full border-2 rounded-sm mt-5 py-4 px-4 gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">Focus Timer</h1>
          <p>Track your work sessions</p>
          <h1>
            {String(timer.minutes).padStart(2, "0")}:
            {String(timer.remainingSeconds).padStart(2, "0")}
          </h1>
          <div className="flex gap-4">
            {!timer.isRunning ? (
              <button
                className="bg-green-600 text-white px-2 rounded-sm hover:bg-green-800 cursor-pointer"
                onClick={timer.start}
              >
                Start
              </button>
            ) : (
              <button
                className="bg-yellow-600 text-white px-2 rounded-sm hover:bg-green-800 cursor-pointer"
                onClick={timer.pause}
              >
                Pause
              </button>
            )}
            <button
              className="bg-red-600 text-white px-2 rounded-sm hover:bg-red-800 cursor-pointer"
              onClick={timer.reset}
            >
              Reset
            </button>
          </div>
        </div>
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

      {showAddHabit && <HabitForm setShowAddHabit={setShowAddHabit} />}

      <HabitList />
    </div>
  );
}

export default HabitPage;
