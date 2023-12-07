import { NavLink } from "react-router-dom";

const SomethingWentWrong = () => {
  return (
    <>
      Something went wrong... <NavLink to="/">Go home</NavLink>
    </>
  );
};

export default SomethingWentWrong;
