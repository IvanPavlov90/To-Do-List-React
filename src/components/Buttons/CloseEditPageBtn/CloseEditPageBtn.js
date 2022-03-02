import { Link } from "react-router-dom";
import "./_closeEditPage.scss";

export const CloseEditPageBtn = (props) => {
  return (
    <button className="close-btn">
      <Link to={`/categories/${props.activeCategory}`}>Cancel</Link>
    </button>
  );
};
