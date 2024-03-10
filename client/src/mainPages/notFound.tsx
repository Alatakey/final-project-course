import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-2 font-bold">
      <h1>Page Not Found</h1>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
}
