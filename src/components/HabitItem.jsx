import RemoveIcon from "../assets/remove.png";
import { useHabitContext } from "../context/HabitContext.jsx";

function HabitItem({ habit }) {
  const { dispatch } = useHabitContext();

  return (
    <div className="flex justify-between items-center border min-h-24 px-4 py-4 rounded-sm w-full">
      <div className="flex flex-col items-start gap-2">
        <p className="font-medium text-xl md:text-2xl break-words">
          {habit.name}
        </p>

        <button
          className={
            habit.completedToday
              ? "bg-yellow-600 cursor-pointer px-2 py-1 text-white rounded-sm"
              : "bg-yellow-400 px-2 py-1 text-white rounded-sm hover:bg-yellow-600 cursor-pointer"
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
        className="border rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 cursor-pointer shrink-0"
        onClick={() =>
          dispatch({
            type: "REMOVE_HABIT",
            payload: {
              id: habit.id,
            },
          })
        }
      >
        <img src={RemoveIcon} alt="Remove habit" className="w-4 h-4" />
      </button>
    </div>
  );
}

export default HabitItem;
