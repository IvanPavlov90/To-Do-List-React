import { GetTasksSpecifyID } from "../../store/selectors";
import { TasksItem } from "../TaskItem/TaskItem";
import "./_tasksList.scss";

export const TasksList = () => {
  const tasksID = GetTasksSpecifyID();
  return (
    <ul className="tasks-list">
      {tasksID.map((id) => (
        <TasksItem key={id} id={id} />
      ))}
    </ul>
  )
};
