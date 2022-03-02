import { MainPage } from "./Pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./style/App.scss";
import { TaskPage } from "./Pages/TaskPage";
import { ErrorPage } from "./Pages/ErrorPage";

export function App() {
  const history = createBrowserHistory();

  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route exact path="/" element={<MainPage />}/>
        <Route exact path="/categories/:id" element={<MainPage />}/>
        <Route exact path="/categories/:id?task=:value" element={<MainPage />}/>
        <Route exact path="/categories/:id/task/:taskid" element={<TaskPage />}/>
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </BrowserRouter>
  );
}