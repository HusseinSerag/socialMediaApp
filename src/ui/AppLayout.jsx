import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
export default function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-none grid-rows-[1fr_80px] sm:grid-cols-[1.2fr_5fr] sm:grid-rows-none">
      <Navbar />
      <main className="order-1 overflow-auto sm:order-4">
        <Outlet />
      </main>
    </div>
  );
}
