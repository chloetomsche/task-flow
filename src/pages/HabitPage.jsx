import { useState } from "react";
import { useHabitContext } from "../context/HabitContext.jsx";

function HabitPage() {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const { state, dispatch } = useHabitContext();
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    const input = e.target.value;
    setUserInput(input);
  };

  const handleAddHabit = () => {
    dispatch({
      type: "ADD_HABIT",
      payload: {
        id: Math.floor(Math.random() * 1000),
        name: userInput,
      },
    });
    setUserInput("");
  };

  console.log(state.habits);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-2xl border-2 rounded-sm mt-5 py-4 px-4">
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
      <div className="flex justify-between w-2xl py-4 px-4">
        <div>
          <h1 className="font-semibold">Daily Habits</h1>
          <p>... done today</p>
        </div>

        <button
          className="border-2 border-black px-2 rounded-sm hover:bg-black hover:text-white cursor-pointer"
          onClick={() => setShowAddHabit(true)}
        >
          + New Habit
        </button>
      </div>
      {showAddHabit && (
        <div className="flex justify-between bg-gray-200 w-2xl py-8 px-4 rounded-sm">
          <input
            className="border-2 rounded-full w-96 px-2"
            placeholder="add new habit..."
            onChange={handleUserInput}
            value={userInput}
          ></input>
          <button
            className="bg-blue-500 px-2 rounded-sm text-white hover:bg-blue-700 cursor-pointer"
            onClick={handleAddHabit}
          >
            Add
          </button>
        </div>
      )}
      {state.habits.map((habit) => (
        <div className="flex justify-between items-center bg-blue-200 h-24 px-4 rounded-sm">
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium text-2xl">{habit.name}</p>
            <button
              className={
                habit.completedToday
                  ? "bg-yellow-600 cursor-pointer px-2 text-white rounded-sm"
                  : "bg-yellow-400 px-2 text-white rounded-sm hover:bg-yellow-600 cursor-pointer"
              }
              onClick={() =>
                dispatch({
                  type: "TOGGLE_COMPLETED",
                  payload: {
                    id: habit.id,
                    completedToday: habit.completedToday,
                  },
                })
              }
            >
              {habit.completedToday ? "✓ Done Today" : "Done Today"}
            </button>
          </div>
          <button
            className="bg-gray-500 px-2 rounded-sm text-white hover:bg-gray-700 cursor-pointer"
            onClick={() =>
              dispatch({
                type: "REMOVE_HABIT",
                payload: {
                  id: habit.id,
                },
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default HabitPage;
