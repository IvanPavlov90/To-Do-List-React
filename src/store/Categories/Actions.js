import { hideSpinner, showSpinner } from "../Spinner/Actions";
import { DataService } from "../../services/DataService";
import { categoryType } from "./ActionTypes";
import { getTasksAction } from "../Tasks/Actions";
import { getCategoryID } from "../../services/Utils";

export const getData = () => {
  return async (dispatch) => {
    dispatch(showSpinner("Loading Categories..."));
    await DataService.getCategories().then((value) => {
      dispatch(getCategoriesAction());
    });
    dispatch(showSpinner("Loading Tasks..."));
    await DataService.getTasks().then((value) => {
      dispatch(getTasksAction());
      dispatch(hideSpinner());
    });
  };
};

const getCategoriesAction = () => {
  return {
    type: categoryType.getCategories,
  }
}

export const makeCategoryActive = (id) => {
  return {
      type: categoryType.makeActive,
      payload: id,
  };
}

export const addNewCategory = (text) => {
  return async (dispatch) => {
    dispatch(showSpinner("Processing..."));
    await DataService.getCategories().then((value) => {
      dispatch(addNewCategoryAction(text));
      dispatch(hideSpinner());
    });
  }
}

export const addNewCategoryAction = (text) => {
  return {
      type: categoryType.addNewCategory,
      payload: {
        id: getCategoryID(),
        text: text,
      },
  };
}

export const addSubCategory = (id, text) => {
  return async (dispatch) => {
    dispatch(showSpinner("Processing..."));
    await DataService.getCategories().then((value) => {
      dispatch(addSubCategoryAction(id, text));
      dispatch(hideSpinner());
    });
  }
}

export const addSubCategoryAction = (id, text) => {
  return {
      type: categoryType.addSubCategory,
      payload: {
        id: getCategoryID(),
        parentID: id,
        text: text,
      },
  };
}

export const editCategory = (id, text) => {
  return async (dispatch) => {
    dispatch(showSpinner("Processing..."));
    await DataService.getCategories().then((value) => {
      dispatch(editCategoryAction(id, text));
      dispatch(hideSpinner());
    });
  }
}

export const editCategoryAction = (id, text) => {
  return {
      type: categoryType.editCategory,
      payload: {
        id: id,
        text: text,
      },
  };
}

export const deleteCategory = (deleteIDsArray, eventID) => {
  return async (dispatch) => {
    dispatch(showSpinner("Processing..."));
    await DataService.getCategories().then((value) => {
      dispatch(deleteCategoryAction(deleteIDsArray, eventID));
      dispatch(hideSpinner());
    });
  }
}

export const deleteCategoryAction = (deleteIDsArray, eventID) => {
  return {
      type: categoryType.deleteCategory,
      payload: {
        deleteIDsArray: deleteIDsArray,
        eventID: parseInt(eventID),
      } 
  };
}
