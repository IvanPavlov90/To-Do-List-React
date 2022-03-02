import { findCategoriesToRemain } from "../../services/Utils";

const initialState = {
  ids: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  category: {
    1: { id: 1, text: "Category 1", subcategory: [3], parentID: null },
    2: { id: 2, text: "Category 2", subcategory: [7, 9], parentID: null },
    3: { id: 3, text: "Category 3", subcategory: [8], parentID: 1 },
    4: { id: 4, text: "Category 4", subcategory: [], parentID: null },
    5: { id: 5, text: "Category 5", subcategory: [], parentID: 8 },
    6: { id: 6, text: "Category 6", subcategory: [], parentID: null },
    7: { id: 7, text: "Category 7", subcategory: [], parentID: 2 },
    8: { id: 8, text: "Category 8", subcategory: [5], parentID: 3 },
    9: { id: 9, text: "Category 9", subcategory: [], parentID: 2 },
  },
  isActive: null,
};

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case "get_categories":
      return { ...state };
    case "make_active":
      let makeActiveState = { ...state.isActive };
      makeActiveState = action.payload;
      return { ...state, isActive: makeActiveState };
    case "add_category":
      const addCategoryState = { ...state.category };
      addCategoryState[action.payload.id] = {
        id: action.payload.id,
        text: action.payload.text,
        subcategory: [],
        parentID: null,
      };
      return {
        ...state,
        ids: [action.payload.id, ...state.ids],
        category: addCategoryState,
      };
    case "add_subcategory":
      const addSubCategoryState = { ...state.category };
      addSubCategoryState[action.payload.id] = {
        id: action.payload.id,
        text: action.payload.text,
        subcategory: [],
        parentID: action.payload.parentID,
      };
      addSubCategoryState[action.payload.parentID].subcategory.unshift(
        action.payload.id
      );
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        category: addSubCategoryState,
      };
    case "edit_category":
      const editCategoryState = { ...state.category };
      editCategoryState[action.payload.id].text = action.payload.text;
      return { ...state, category: editCategoryState };
    case "delete_category":
      const deleteStateCategory = { ...state.category };
      const deleteStateIDs = [...state.ids];
      const remainStateIDs = deleteStateIDs.filter(id => action.payload.deleteIDsArray.indexOf(id) === -1)
      const remainStateCategory = findCategoriesToRemain(
        deleteStateCategory,
        action.payload.deleteIDsArray,
        action.payload.eventID
      );
      return { ...state, ids: remainStateIDs, category: remainStateCategory };
    default:
      return { ...state };
  }
};
