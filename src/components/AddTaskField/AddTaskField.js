import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/Tasks/Actions";
import { useLocation, useParams } from "react-router-dom";
import "./_addTaskField.scss";
import { useInput } from "../../hooks/customHooks";

export const AddTaskField = () => {
  const dispatch = useDispatch();
  const taskName = useInput('');
  const params = useParams();
  const location = useLocation();

  const addNewTask = useCallback((header) => {
    if (!header.trim().length || header.trim().length > 60) {
      alert('You cant add task with empty name or name with more then 60 symbols');
    } else {
      dispatch(addTask(header, parseInt(params.id)));
    }
  }, [dispatch, params.id]);

  return (
    <div className="add-task-container">
      <input
        type="text"
        className="text-input text-input-right-position small-input"
        placeholder="Add New Task"
        onChange={taskName.onChange}
      />
      <input
        type="button"
        value="Add"
        className="add-btn add-btn-right-position"
        onClick={() => addNewTask(taskName.value)}
        disabled={location.pathname === '/' ? 'disabled' : null}
      />
    </div>
  );
};
