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
    dispatch({ type: "RESET_DAILY" });
  }, []);

  useEffect(() => {
    setStored(state.habits);
  }, [state.habits]);

  const stats = useMemo(
    () => ({
      total: state.habits.length,
      completedToday: state.habits.filter((habit) => habit.completedToday)
        .length,
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
          lastChecked: null,
          createdAt: new Date().toISOString(),
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

      case "COMPLETE_HABIT":
        return {
          ...habitState,
          habits: habitState.habits.map((habit) => {
            if (habit.id !== action.payload.id) {
              return habit;
            }

            const todayObject = new Date();
            const yesterdayObject = new Date(todayObject);
            yesterdayObject.setDate(todayObject.getDate() - 1);
            const yesterday = yesterdayObject.toISOString().split("T")[0];

            const today = todayObject.toISOString().split("T")[0];

            if (habit.completedToday) {
              return habit;
            }
            const newStreak =
              habit.lastChecked === yesterday ? habit.streak + 1 : 1;

            return {
              ...habit,
              completedToday: true,
              lastChecked: today,
              streak: newStreak,
              bestStreak: Math.max(newStreak, habit.bestStreak),
            };
          }),
        };

      case "RESET_DAILY":
        return {
          ...habitState,
          habits: habitState.habits.map((habit) => {
            const todayObject = new Date();
            const yesterdayObject = new Date(todayObject);
            yesterdayObject.setDate(todayObject.getDate() - 1);
            const yesterday = yesterdayObject.toISOString().split("T")[0];

            const today = todayObject.toISOString().split("T")[0];
            if (habit.lastChecked === today) {
              return {
                ...habit,
                completedToday: true,
              };
            }
            if (habit.lastChecked === yesterday) {
              return {
                ...habit,
                completedToday: false,
              };
            }
            if (
              habit.lastChecked !== today &&
              habit.lastChecked !== yesterday
            ) {
              return {
                ...habit,
                streak: 0,
                completedToday: false,
              };
            }
            return habit;
          }),
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
    throw new Error("useHabitContext must be used inside a provider");
  }
  return context;
}
