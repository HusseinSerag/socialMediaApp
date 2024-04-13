import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useUser } from "../features/auth/useUser";
import FullPageSpinner from "./FullPageSpinner";
import NotificationsReceived from "../features/notifications/NotificationsReceived";
export default function LayoutWrapper() {
  const { isLoading } = useUser();
  if (isLoading) return <FullPageSpinner />;
  return (
    <>
      <NotificationsReceived />
      <div className=" mx-auto  flex max-w-4xl gap-6 p-4">
        <div className="w-3/12">
          <Navbar />
        </div>
        <main className="order-1 w-9/12 overflow-auto sm:order-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
