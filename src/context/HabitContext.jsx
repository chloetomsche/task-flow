import { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const HabitContext = createContext(null);
export function HabitProvider({ children }) {
  const [stored, setStored] = useLocalStorage("MY_HABITS", []);
  const initialState = {
    habits: stored,
    //all active and completed
    filter: "all",
    search: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setStored(state.habits);
  }, [state.habits]);

  const value = { state, dispatch };

  function reducer(habitState, action) {
   
    switch (action.type) {
      case "ADD_HABIT":
        const newHabit = {
          id: action.payload.id,
          name: action.payload.name,
          completedToday: false,
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
          habits: habitState.habits.filter((habit) => habit.id !== action.payload.id),
        };
    }
  }

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
}

export function useHabitContext() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useTaskContext must be used inside a provider");
  }
  return context;
}
