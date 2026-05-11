import RemoveIcon from "../assets/remove.png";
import { useHabitContext } from "../context/HabitContext.jsx";

function HabitItem({ habit }) {
  const { dispatch } = useHabitContext();

  return (
    <div className="flex justify-between items-center border min-h-24 px-4 py-4 rounded-sm w-full">
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-3 items-center">
          <p className="font-medium text-xl md:text-2xl break-words">
            {habit.name}
          </p>
          <p className="border px-2 py-1 rounded-full">{habit.icon}</p>
        </div>

        <button
          disabled={habit.completedToday}
          className={
            habit.completedToday
              ? "bg-yellow-600 px-2 py-1 text-white rounded-sm"
              : "bg-yellow-400 px-2 py-1 text-white rounded-sm hover:bg-yellow-600 cursor-pointer"
          }
          onClick={() =>
            dispatch({
              type: "COMPLETE_HABIT",
              payload: {
                id: habit.id,
              },
            })
          }
        >
          {habit.completedToday ? "✓ Done Today" : "Done Today"}
        </button>

          {habit.streak >= 3 ?  <p className=" bg-orange-500 text-white border-2 border-yellow-400 px-4 py-2 rounded-full ">
            {habit.streak}
          </p> :  <p className=" px-2 py-1rounded-sm ">
            Streak: {habit.streak}
          </p>}
        
         
       
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
