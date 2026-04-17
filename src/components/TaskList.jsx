import TaskItem from "./TaskItem";
function TaskList({ sortedList }) {
  return (
    <ul>
      <div className="flex flex-col gap-4">
        {sortedList.map((task) => (
          <li key={task.id}>
            <TaskItem task={task} />
          </li>
        ))}
      </div>
    </ul>
  );
}

export default TaskList;
