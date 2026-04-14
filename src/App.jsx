import { useState } from "react";
import Header from "./components/Header.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import HabitPage from "./pages/HabitPage.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { HabitProvider } from "./context/HabitContext.jsx";

function App() {
  const [activePage, setActivePage] = useState("tasks");

  return (
    <>
      <TaskProvider>
        <HabitProvider>
          <Header activePage={activePage} setActivePage={setActivePage} />

          <div className="flex flex-col items-center">
            {activePage === "tasks" && <TaskPage />}
            {activePage === "habits" && <HabitPage />}
          </div>
        </HabitProvider>
      </TaskProvider>
    </>
  );
}

export default App;
