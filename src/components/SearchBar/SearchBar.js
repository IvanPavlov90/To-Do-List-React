import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCheckbox } from "../../hooks/customHooks";
import debounce from "../../services/Debounce";
import { showDone } from "../../store/Tasks/Actions";
import "./_searchBar.scss";

export const SearchBar = () => {
  const done = useCheckbox(false);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const search = (event) => {
    navigate(`/categories/${params.id}?task=${event.target.value}`);
  };

  const setShowDone = (value) => {
    dispatch(showDone(value));
  };

  return (
    <div className="search-container">
      <p className="search-container__name">To-Do List</p>
      <input
        type="checkbox"
        className="search-container__checkbox"
        id="searchCheckbox"
        defaultChecked={done.value}
        onChange={() => {
          done.onChange();
          setShowDone(!done.value);
        }}
      />
      <label
        htmlFor="searchCheckbox"
        className="search-container__checkbox-label"
      >
        Show done
      </label>
      <input
        type="search"
        className="search-container__search-input"
        placeholder="Search"
        onChange={debounce(search, 1000)}
        disabled={location.pathname === "/" ? "disabled" : null}
      />
    </div>
  );
};
