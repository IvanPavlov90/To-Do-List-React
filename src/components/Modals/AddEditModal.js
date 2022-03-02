import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addSubCategory, editCategory } from "../../store/Categories/Actions";
import { hideModal } from "../../store/Modals/Actions";
import "./_Modals.scss";
import { ModalBtn } from "../Buttons/ModalBtn/ModalBtn";
import { useInput } from "../../hooks/customHooks";

export const AddEditModal = (props) => {
  const dispatch = useDispatch();
  const categoryName = useInput('');

  const changeCategory = useCallback((id, text) => {
    if (props.type === "Add" && text.trim().length) {
      dispatch(addSubCategory(id, text))
      dispatch(hideModal());
    } else if (props.type === "Edit" && text.trim().length) {
      dispatch(editCategory(id, text))
      dispatch(hideModal());
    } else {
      alert("Uncorrect category name.")
    }
  }, [dispatch, props.type]);

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <div className="modal">
      <div className="modal__container">
        <p className="modal__text">
          {props.type === "Add"
            ? `Your category will be a subcategory for ${props.parentCategoryText}`
            : `Would you like to change category name from ${props.parentCategoryText}?`}
        </p>
        <input
          className="modal__input"
          type="text"
          placeholder="Type your text here"
          onChange={categoryName.onChange}
          defaultValue={props.type === "Edit" ? props.parentCategoryText : ''}
        />
        <div className="modal__btn-container">
          <ModalBtn type="submit" active = {() => changeCategory(props.id, categoryName.value)}/>
          <ModalBtn type="close" active={closeModal} />
        </div>
      </div>
    </div>
  );
};
