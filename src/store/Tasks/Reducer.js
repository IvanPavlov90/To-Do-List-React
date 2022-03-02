const initialState = {
  ids: [1, 2, 3, 4, 5, 6],
  specifyIDs: [],
  task: {
    1: {
      id: 1,
      header: "Task 1",
      category_id: 1,
      isDone: false,
      description: "Description for task 1",
    },
    2: {
      id: 2,
      header: "Task 2",
      category_id: 2,
      isDone: true,
      description: "Description for task 2",
    },
    3: {
      id: 3,
      header: "Task 3",
      category_id: 3,
      isDone: false,
      description: "Description for task 3",
    },
    4: {
      id: 4,
      header: "Task 4",
      category_id: 4,
      isDone: false,
      description: "Description for task 4",
    },
    5: {
      id: 5,
      header: "Task 5",
      category_id: 5,
      isDone: false,
      description: "Description for task 5",
    },
    6: {
      id: 6,
      header: "Task 6",
      category_id: 6,
      isDone: false,
      description: "Description for task 6",
    },
  },
  showDone: '',
};

export const tasks = (state = initialState, action) => {
  switch (action.type) {
    case "get_tasks":
      return { ...state };
    case "show_tasks":
      const copyState = { ...state, specifyIDs: [] };
      for (const key in copyState.task) {
        if (copyState.task[key].category_id === action.payload) {
          copyState.specifyIDs.push(key);
        }
      }
      return { ...state, specifyIDs: copyState.specifyIDs };
    case "edit_task":
      const editTaskState = { ...state.task };
      editTaskState[action.payload.id].category_id = action.payload.category_id;
      editTaskState[action.payload.id].header = action.payload.header;
      editTaskState[action.payload.id].description = action.payload.description;
      editTaskState[action.payload.id].isDone = action.payload.isDone;
      return { ...state, task: editTaskState };
    case "add_task":
      const addTaskState = { ...state.task };
      addTaskState[action.payload.id] = {
        id: action.payload.id,
        category_id: action.payload.category_id,
        header: action.payload.header,
        description: '',
        isDone: false,
      }
      return { ...state, ids: [...state.ids, action.payload.id], specifyIDs:[action.payload.id, ...state.specifyIDs], task: addTaskState };
    case "delete_task":
      const deleteTaskState = { ...state.task };
      const deleteTaskStateIDs = [ ...state.ids ];  
      const taskIDsToDelete = [];
      for (const key in deleteTaskState) {
        if (action.payload.indexOf(deleteTaskState[key].category_id) !== -1) {
          taskIDsToDelete.push(deleteTaskState[key].id);
          delete deleteTaskState[key];
        }
      }
      const remainIDs = deleteTaskStateIDs.filter(id => taskIDsToDelete.indexOf(id) === -1);
      return { ...state, ids: remainIDs, specifyIDs: [], task: deleteTaskState };  
    case "mark_task":
      const markTaskState = { ...state.task };
      markTaskState[action.payload.taskID].isDone = action.payload.value;
      return { ...state, task: markTaskState };
    case "show_done":
      let showDoneState = state.showDone;
      showDoneState = action.payload;
      return { ...state, showDone: showDoneState };    
    default:
      return { ...state };
  }
};
