import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const HabitContext = createContext(null);
export function HabitProvider({ children }) {
  const [stored, setStored] = useLocalStorage("MY_HABITS", []);
  const initialState = {
    habits: stored,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setStored(state.habits);
  }, [state.habits]);

  const stats = useMemo(
    () => ({
      total: state.habits.length,
      completedToday: state.habits.filter((habit) => habit.completedToday).length,
      active: state.habits.filter((habit) => !habit.completedToday),
      completionRate:
        state.habits.length > 0
          ? Math.round(
              (state.habits.filter((habit) => habit.completedToday).length /
                state.habits.length) *
                100
            )
          : 0,
    }),
    [state.habits]
  );

  const value = { state, dispatch, stats };

  function reducer(habitState, action) {
    switch (action.type) {
      case "ADD_HABIT":
        const newHabit = {
          id: action.payload.id,
          name: action.payload.name,
          completedToday: false,
          icon: action.payload.icon,
          streak: 0,
          bestStreak: 0,
        };
        return {
          ...habitState,
          habits: [...habitState.habits, newHabit],
        };

      case "REMOVE_HABIT":
        return {
          ...habitState,
          habits: habitState.habits.filter(
            (habit) => habit.id !== action.payload.id
          ),
        };

      case "TOGGLE_COMPLETED":
        return {
          ...habitState,
          habits: habitState.habits.map((habit) =>
            habit.id === action.payload.id
              ? { ...habit, completedToday: !habit.completedToday }
              : habit
          ),
        };
        
    }
  }
  console.log("habits:", state.habits);
  console.log("stats:", stats);
  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
}

export function useHabitContext() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabitContext must be used inside a provider");
  }
  return context;
}
