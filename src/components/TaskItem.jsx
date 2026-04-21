import { useTaskContext } from "../context/TaskContext.jsx";
import { priorities, categories } from "../utilities/helpers.js";
import {
  useState,
  useContext,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import EditIcon from "../assets/edit.png";
import RemoveIcon from "../assets/remove.png";

const TaskItem = ({ task }) => {
  const { dispatch } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedCategory, setEditedCategory] = useState(task.category);

  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleSave = () => {
    dispatch({
      type: "EDIT_TASKS",
      payload: {
        text: editedText,
        id: task.id,
        priority: editedPriority,
        category: editedCategory,
      },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      {!isEditing && (
        <div className="flex flex-col px-2 w-xl py-2 border rounded-lg gap-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex gap-4 items-start flex-1 min-w-0">
              <button
                className="border bg-gray-100 w-6 h-6 rounded-full hover:bg-gray-300 shrink-0"
                onClick={() =>
                  dispatch({
                    type: "TOGGLE_TASK",
                    payload: {
                      id: task.id,
                      completed: task.completed,
                      completedAt: task.completedAt,
                    },
                  })
                }
              >
                {task.completed ? "✓" : ""}
              </button>

              <p className="font-bold text-black flex-1 min-w-0 break-words">
                {task.text}
              </p>
            </div>

            <div className="flex gap-5 shrink-0">
              <button
                className="border rounded-full w-6 h-6 mt-4 hover:bg-gray-200 cursor-pointer"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_TASKS",
                    payload: {
                      id: task.id,
                    },
                  })
                }
              >
                <img src={RemoveIcon} />
              </button>

              <button
                className="flex justify-center items-center border rounded-full w-6 h-6 mt-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                <img src={EditIcon} />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <p>{task.priority}</p>
            <p>{task.category}</p>
          </div>
        </div>
      )}

      <div>
        {isEditing && (
          <div
            className="flex flex-col gap-4 border w-xl mt-2 mb-6 rounded-sm px-4 py-4 "
            onKeyDown={handleKeyDown}
          >
            <img src={EditIcon} className="w-8 h-8" />
            <input
              ref={inputRef}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              
              className="border rounded-full px-2"
            ></input>

            <div className="flex gap-3">
              {Object.entries(priorities).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setEditedPriority(key)}
                  className={
                    editedPriority === key
                      ? `${value.color} ${value.bg} ${value.border} ${value.padding}`
                      : " bg-gray-400 text-white px-2 rounded-sm cursor-pointer"
                  }
                >
                  {value.label}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              {Object.entries(categories).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setEditedCategory(key)}
                  className={
                    editedCategory === key
                      ? `${value.color} ${value.bg} ${value.border} ${value.padding}`
                      : "bg-gray-400 text-white px-2 rounded-sm cursor-pointer"
                  }
                >
                  {value.label}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                className="bg-gray-400 text-white px-2 rounded-sm hover:bg-gray-600 cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-gray-400 text-white px-2 rounded-sm hover:bg-gray-600 cursor-pointer"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskItem;
