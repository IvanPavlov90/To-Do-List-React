import { AddCategoryField } from "../../AddCategoryField/AddCategoryField";
import { CategoryList } from "../../CategoriesList/CategoryList";
import "./_categoriesContainer.scss";

export const CategoriesContainer = () => {
  return (
    <div className="categories-container">
      <AddCategoryField />
      <CategoryList page="mainPage"/>
    </div>
  );
};
