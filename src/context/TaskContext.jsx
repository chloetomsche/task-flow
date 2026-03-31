import { createContext, useContext, useReducer, useEffect } from "react";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const stored = localStorage.getItem("MY_TASKS");
  const initialState = {
    tasks: stored ? JSON.parse(stored) : [],
    //all active and completed
    filter: "All",
    search: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    localStorage.setItem("MY_TASKS", JSON.stringify(state.tasks));
  }, [state.tasks]);

  function reducer(taskState, action) {
    switch (action.type) {
      case "ADD_TASKS":
        const newTask = {
          id: action.payload.id,
          text: action.payload.text,
          category: action.payload.category || "General",
          priority: action.payload.priority || "Medium",
          completed: false,
          createdAt: action.payload.createdAt,
          completedAt: null,
        };
        return { ...taskState, tasks: [...taskState.tasks, newTask] };
      case "REMOVE_TASKS":
        return {
          ...taskState,
          tasks: taskState.tasks.filter(
            (task) => task.id !== action.payload.id
          ),
        };
      case "TOGGLE_TASK":
        return {
          ...taskState,
          tasks: taskState.map((task) =>
            task.id === action.payload.id
              ? {
                  ...task,
                  completed: !task.completed,
                  completedAt: !task.completed
                    ? new Date().toISOString()
                    : null,
                }
              : task
          ),
        };
      case "FILTER_STATUS":
        return {
          ...taskState,
          filter: action.payload.status,
        };
      case "SEARCH_TASKS":
        return {
          ...taskState,
          search: action.payload.seach,
        };
      default:
        return taskState;
    }
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used inside a provider");
  }
  return context;
}
