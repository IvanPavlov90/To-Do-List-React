import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../store/Categories/Actions";
import { hideModal } from "../../store/Modals/Actions";
import { deleteTask } from "../../store/Tasks/Actions";
import { useNavigate } from "react-router-dom";
import "./_Modals.scss";
import { ModalBtn } from "../Buttons/ModalBtn/ModalBtn";

export const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.category);
  let navigate = useNavigate();

  const findIDsToDelete = useCallback((id, deleteArray = []) => {
    if (categories[id].subcategory.length > 0) {
      deleteArray.push(id);
      categories[id].subcategory.forEach((id) =>
        findIDsToDelete(id, deleteArray)
      );
    } else if (categories[id].subcategory.length === 0) {
      deleteArray.push(id);
    }
    return deleteArray;
  }, [categories])


  const deleteCategoryItem = useCallback(
    (id) => {
      const deleteIDsArray = findIDsToDelete(id);
      dispatch(deleteCategory(deleteIDsArray, id));
      dispatch(deleteTask(deleteIDsArray))
      dispatch(hideModal());
      navigate('/');
    },
    [dispatch, findIDsToDelete, navigate]
  );

  return (
    <div className="modal">
      <div className="modal__container">
        <p className="modal__text">
          Do you <b>really</b> want to delete {props.parentCategoryText}?
        </p>
        <div className="modal__btn-container">
          <ModalBtn type="submit" active={() => deleteCategoryItem(props.id)} />
          <ModalBtn type="close" active={props.closeModal} />
        </div>
      </div>
    </div>
  );
};
