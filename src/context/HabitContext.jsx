import { createContext, useContext } from "react";

const HabitContext = createContext(null);
const initialState = {
  habits: [],
  //all active and completed
  filter: "all",
  search: "",
};

export function HabitProvider() {
  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
}

export function useHabitContext() {
    const context = useContext(HabitContext)
    if(!context) {
        throw new Error('useTaskContext must be used inside a provider')
    }
    return context;
}
