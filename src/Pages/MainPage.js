import React, { useEffect } from "react";
import './_mainPage.scss';
import { ProgressBar } from "../components/ProgressBar/ProgressBar";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { Content } from "../components/Containers/ContentContainer/Content";
import { ModalContainer } from "../components/Containers/ModalContainer/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../components/Spinner/Spinner";
import { getData } from "../store/Categories/Actions";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";

export const MainPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const activeCategory = useSelector(
    (state) => state.categories.category[+params.id]
  );

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    (activeCategory === undefined && location.pathname !== '/') ? 
    <Routes>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    :
    <main>
      <Spinner />
      <SearchBar />
      <ProgressBar />
      <Content />
      <ModalContainer />
    </main>
  )
};
