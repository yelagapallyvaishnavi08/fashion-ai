import { Outlet } from "react-router";
import { Navigation } from "./Navigation";

export function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navigation />
      <Outlet />
    </div>
  );
}
