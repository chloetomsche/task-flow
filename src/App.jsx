import { useState } from "react";
import Header from "./components/Header.jsx";
import TaskPage from "./components/TaskPage.jsx";
import HabitPage from "./components/HabitPage.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { HabitProvider } from "./context/HabitContext.jsx";

function App() {
  const [activePage, setActivePage] = useState("tasks");

  return (
    <>
      <TaskProvider>
        <Header activePage={activePage} setActivePage={setActivePage} />
      </TaskProvider>

      <div className="flex flex-col items-center">
        {activePage === "tasks" && (
          <TaskProvider>
            <TaskPage />
          </TaskProvider>
        )}
        {activePage === "habits" && (
          <HabitProvider>
            <HabitPage />
          </HabitProvider>
        )}

        <div></div>
      </div>
    </>
  );
}

export default App;
