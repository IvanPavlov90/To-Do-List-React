import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { makeCategoryActive } from "../../store/Categories/Actions";
import { showModal } from "../../store/Modals/Actions";
import { GetActiveCategory, GetCategory } from "../../store/selectors";
import { AddEditModal } from "../Modals/AddEditModal";
import { DeleteModal } from "../Modals/DeleteModal";
import "./_categoryItem.scss";

export const CategoryItem = (props) => {
  const active = GetActiveCategory();
  const category = GetCategory(props.id);
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search).get("task");
  const params = useParams();

  const makeActive = (id) => {
    dispatch(makeCategoryActive(id));
  };

  const openModal = (element) => {
    dispatch(showModal(element));
  };

  const renderInnerList = useCallback(
    (list) => {
      return (
        <ul className="subcategory-list">
          {list.map((id) => (
            <CategoryItem
              key={id}
              id={id}
              page={props.page}
            />
          ))}
        </ul>
      );
    },
    [props.page]
  );

  const renderItemForTaskPage = () => {
    return (
      <li key={props.id} id={props.id}>
        <div
          className={
            active === props.id
              ? "category-item background-green"
              : "category-item"
          }
        >
          <div className="category-item__text-edit-container">
            <span className="category-item__text">{category.text}</span>
          </div>
          <button
            className="category-item__choose-category-btn"
            onClick={() => makeActive(props.id)}
          >
            <img
              src="/pictures/arrow.png"
              alt="arrow"
              className="choose-category-btn-img"
            />
          </button>
        </div>
        {!!category.subcategory.length
          ? renderInnerList(category.subcategory)
          : null}
      </li>
    );
  };

  const renderItemForMainPage = () => {
    return (
      <li key={props.id} id={props.id}>
        <div
          className={
            Number.parseInt(params.id) === props.id
              ? "category-item background-green"
              : "category-item"
          }
        >
          <div className="category-item__text-edit-container">
            {!!category.subcategory.length ? (
              <button
                className="category-item__close-list-btn"
                onClick={() => setCollapse(!collapse)}
              >
                &dArr;
              </button>
            ) : null}
            <span className="category-item__text">
              {searchParams !== null ? (
                <Link to={`/categories/${props.id}/?task=${searchParams}`}>
                  {category.text}
                </Link>
              ) : (
                <Link to={`/categories/${props.id}`}>{category.text}</Link>
              )}
            </span>
            <button
              className="category-item__edit-btn"
              onClick={() => openModal(
                <AddEditModal
                  id={props.id}
                  parentCategoryText={category.text}
                  type="Edit"
                />
              )}
            >
              <img src="/pictures/edit.png" alt="Edit Category" />
            </button>
          </div>
          <button
            className="category-item__delete-btn"
            onClick={() => openModal(
              <DeleteModal
                id={props.id}
                parentCategoryText={category.text}
                closeModal={props.closeModal}
              />
            )}
          >
            <img src="/pictures/basket.png" alt="Delete Category" />
          </button>
          <button
            className="category-item__add-btn"
            onClick={() => openModal(
              <AddEditModal
                id={props.id}
                parentCategoryText={category.text}
                closeModal={props.closeModal}
                type="Add"
              />
            )}
          >
            <img
              className="category-item__add-img"
              src="/pictures/add.png"
              alt="Add Category"
            />
          </button>
        </div>
        {collapse && !!category.subcategory.length
          ? renderInnerList(category.subcategory)
          : null}
      </li>
    );
  };

  return props.page === "mainPage"
    ? renderItemForMainPage()
    : renderItemForTaskPage();
};
