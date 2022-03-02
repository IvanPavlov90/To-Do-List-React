import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useInput } from "../../hooks/customHooks";
import { addNewCategory } from "../../store/Categories/Actions";
import "./_addCategoryField.scss";

export const AddCategoryField = () => {
  const dispatch = useDispatch();
  const categoryName = useInput('');
  
  const addCategory = useCallback((text) => {
    if (!text.trim().length || text.trim().length> 32) {
      alert('You cant add category with empty name or name with more then 32 symbols');
    } else {
      dispatch(addNewCategory(text));
    }
  }, [dispatch]);

  return (
    <div className="add-category-container">
      <input
        type="text"
        className="text-input"
        placeholder="Enter Category Title"
        onChange={categoryName.onChange}
      />
      <button className="add-btn" onClick={() => addCategory(categoryName.value)}>Add</button>
    </div>
  );
};
