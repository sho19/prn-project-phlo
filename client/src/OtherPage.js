import { Link } from "react-router-dom";
import Login from "./components/login/login";

const OtherPage = () => {
  return (
    <div>
      I'm an other page!
      <Login></Login>
      <br />
      <br />
      <Link to="/">Go back to home screen</Link>
    </div>
  );
};

export default OtherPage;
