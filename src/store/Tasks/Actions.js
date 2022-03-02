import { DataService } from "../../services/DataService";
import { getTaskID } from "../../services/Utils";
import { hideSpinner, showSpinner } from "../Spinner/Actions";
import { taskType } from "./ActionTypes";

export const getTasksAction = (tasks) => {
  return {
    type: taskType.getTasks,
  };
};

export const openTasks = (id) => {
  return {
    type: taskType.showTasks,
    payload: id,
  };
};

export const changeTask = (id, category_id, header, description, isDone) => {
  return {
    type: taskType.changeTask,
    payload: {
      id: parseInt(id),
      category_id: category_id,
      header: header,
      description: description,
      isDone: isDone,
    },
  };
};

export const addTask = (header, category_id) => {
  return async (dispatch) => {
    dispatch(showSpinner("Processing..."));
    await DataService.getCategories().then((value) => {
      dispatch(addTaskAction(header, category_id));
      dispatch(hideSpinner());
    });
  }
}

export const addTaskAction = (header, category_id) => {
  return {
    type: taskType.addTask,
    payload: {
      id: getTaskID(),
      category_id: category_id,
      header: header,
    },
  };
}

export const deleteTask = (IDsToDeleteArray) => {
  return {
    type: taskType.deleteTask,
    payload: IDsToDeleteArray,
  };
}

export const markTask = (value, taskID) => {
  return {
    type: taskType.markTaks,
    payload: {
      value: value,
      taskID: taskID,
    }
  };
}

export const showDone = (value) => {
  return {
    type: taskType.showDone,
    payload: value,
  };
}
