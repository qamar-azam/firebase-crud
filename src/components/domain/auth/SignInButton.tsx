import { Link } from "react-router-dom";

export const SignInButton = () => (
  <Link
    to="/signin"
    className="btn btn-primary normal-case"
  >
    Sign In
  </Link>
);