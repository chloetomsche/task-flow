import { useHabitContext } from "../context/HabitContext.jsx";
import { useState } from "react";

function HabitForm({ setShowAddHabit }) {
  const [userInput, setUserInput] = useState("");
  const { dispatch } = useHabitContext();
  const [icon, setIcon] = useState('');

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
        icon: icon,
      },
    });

    setShowAddHabit(false);
    setUserInput("");
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-2 w-full py-6 px-4 rounded-sm">
      <div className="flex flex-col gap-2">
        <input
          className="border-2 w-80 rounded-full flex-1 px-3 py-2 min-w-0 bg-white"
          placeholder="add new habit..."
          onChange={handleUserInput}
          value={userInput}
        />
        <div>
          <p>PICK AN EMOJI</p>
        </div>
        <div className="flex gap-3">
          <button className={icon === '💧' ? "px-2 py-1 rounded-full bg-gray-400 cursor-pointer":"bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-400 cursor-pointer"} onClick={() => setIcon('💧')}>
            💧
          </button>
          <button className={icon === '💼' ? "px-2 py-1 rounded-full bg-gray-400 cursor-pointer":"bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-400 cursor-pointer"} onClick={() => setIcon('💼')}>
            💼
          </button>
          <button className={icon === '👩🏻‍💻' ? "px-2 py-1 rounded-full bg-gray-400 cursor-pointer":"bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-400 cursor-pointer"} onClick={() => setIcon('👩🏻‍💻')}>
            👩🏻‍💻
          </button>
          <button className={icon === '🍴' ? "px-2 py-1 rounded-full bg-gray-400 cursor-pointer":"bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-400 cursor-pointer"} onClick={() => setIcon('🍴')}>
            🍴
          </button>
          <button className={icon === '📚' ? "px-2 py-1 rounded-full bg-gray-400 cursor-pointer":"bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-400 cursor-pointer"} onClick={() => setIcon('📚')}>
            📚
          </button>
          <button className={icon === '🧹' ? "px-2 py-1 rounded-full bg-gray-400 cursor-pointer":"bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-400 cursor-pointer"} onClick={() => setIcon('🧹')}>
            🧹
          </button>
          <button className={icon === '🛏️' ? "px-2 py-1 rounded-full bg-gray-400 cursor-pointer":"bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-400 cursor-pointer"} onClick={() => setIcon('🛏️')}>
            🛏️
          </button>
          <button className={icon === '❤️' ? "px-2 py-1 rounded-full bg-gray-400 cursor-pointer":"bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-400 cursor-pointer"} onClick={() => setIcon('❤️')}>
            ❤️
          </button>
          <button className={icon === '🌻' ? "px-2 py-1 rounded-full bg-gray-400 cursor-pointer":"bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-400 cursor-pointer"} onClick={() => setIcon('🌻')}>
            🌻
          </button>
        </div>
      </div>
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
  );
}

export default HabitForm;
