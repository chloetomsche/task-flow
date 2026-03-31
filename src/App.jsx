import { useState} from "react"; 
import Header from './components/Header.jsx';
import TaskPage from "./components/TaskPage.jsx";
import HabitPage from "./components/HabitPage.jsx"
import { TaskProvider } from "./context/TaskContext.jsx";

function App() {
  const [activePage, setActivePage] = useState("tasks");

  
  

  return (
    <>
      <Header activePage={activePage} setActivePage={setActivePage} />

      {activePage === "tasks" &&
      <TaskProvider><TaskPage /></TaskProvider> }
      {activePage === "habits" && <HabitPage />}

      <div></div>
    </>
  );
}

export default App;
