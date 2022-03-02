import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeCategoryActive } from "../../store/Categories/Actions";
import { GetCategories, GetCategoriesID } from "../../store/selectors";
import { CategoryItem } from "../CategoryItem/CategoryItem";
import "./_categoriesList.scss";

export const CategoryList = (props) => {
  const dispatch = useDispatch();
  const categoriesID = GetCategoriesID();
  const categories = GetCategories();
  const params = useParams();

  useEffect(() => {
    dispatch(makeCategoryActive(+params.id));
  }, [dispatch, params.id]);

  const categoryList = () => {
    return (
      <ul className="category-list">
        {categoriesID.map((id) =>
          categories[id].parentID === null ? (
            <CategoryItem
              key={id}
              id={id}
              page={props.page}
            />
          ) : null
        )}
      </ul>
    );
  };

  return categoryList();
};
