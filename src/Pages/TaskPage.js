import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import { CategoryList } from "../components/CategoriesList/CategoryList";
import { TaskEditForm } from "../components/TaskEditForm/TaskEditForm";
import { changeTask } from "../store/Tasks/Actions";
import './_taskPage.scss';
import { ErrorPage } from "./ErrorPage";

export const TaskPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.task[+params.taskid]);
  const activeCategory = useSelector(state => state.categories.isActive);

  const editTask = useCallback((event, header, description, isDone) => {
    event.preventDefault();
    if (!header.trim().length) {
      alert('You cant add task with empty header');
    } else {
      dispatch(changeTask(+params.taskid, activeCategory, header, description, isDone));
      navigate(`/categories/${activeCategory}`);
    }  
  }, [dispatch, params.taskid, activeCategory, navigate]);

  return (
    task === undefined ? 
    <Routes>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    :
     <main className="task-page">
         <p className="task-page__task-name">{task.header}</p>
        <div className="task-page__categories-container">
            <CategoryList page="taskPage"/>
        </div>
        <div className="task-page__form-container">
            <TaskEditForm activeCategory={+params.id} task={task} editTask={editTask}/>
        </div>
     </main> 
  );
};
