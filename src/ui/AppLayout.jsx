import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
export default function AppLayout() {
  return (
    <div className="bg-socialBg grid h-screen grid-cols-none grid-rows-[1fr_100px] gap-6 p-4 sm:grid-cols-[2fr_5fr] sm:grid-rows-none">
      <Navbar />
      <main className="order-1 overflow-auto sm:order-4">
        <Outlet />
      </main>
    </div>
  );
}
