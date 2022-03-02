import { useSelector } from "react-redux";

export const GetCategories = () => {
  const categories = useSelector((state) => state.categories.category);
  return categories;
};

export const GetCategoriesID = () => {
  const categoriesID = useSelector((state) => state.categories.ids);
  return categoriesID;
};

export const GetActiveCategory = () => {
  const active = useSelector((state) => state.categories.isActive);
  return active;
};

export const GetCategory = (id) => {
  const active = useSelector((state) => state.categories.category[id]);
  return active;
};

export const GetModalState = () => {
  const modal = useSelector((state) => state.modal);
  return modal;
};

export const GetTasks = () => {
  const tasks = useSelector((state) => state.tasks.task);
  return tasks;
};

export const GetTask = (id) => {
  const task = useSelector((state) => state.tasks.task[id]);
  return task;
};

export const GetShowDoneFilterState = () => {
  const done = useSelector((state) => state.tasks.showDone);
  return done;
};

export const GetTasksSpecifyID = () => {
  const tasksID = useSelector((state) => state.tasks.specifyIDs);
  return tasksID;
};

export const GetSpinnerState = () => {
  const spinner = useSelector((state) => state.spinner);
  return spinner;
};
