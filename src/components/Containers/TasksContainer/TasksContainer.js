import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { hideModal, showModal } from "../../../store/Modals/Actions";
import { openTasks } from "../../../store/Tasks/Actions";
import { AddTaskField } from "../../AddTaskField/AddTaskField";
import { TasksList } from "../../TasksList/TasksList";
import "./_tasksContainer.scss";

export const TasksContainer = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openTasks(Number.parseInt(params.id)));
  }, [dispatch, params.id]);

  const openModal = useCallback(
    (element) => {
      dispatch(showModal(element));
    },
    [dispatch]
  );

  const closeModal = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch])

  return (
    <div className="tasks-container">
      <AddTaskField closeModal={closeModal} openModal={openModal}/>
      <TasksList />
    </div>
  )
};
