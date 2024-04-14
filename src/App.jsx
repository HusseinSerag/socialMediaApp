import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const Homepage = lazy(() => import("./pages/homepage"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
import DarkMode from "./ui/DarkMode";
import FullPageSpinner from "./ui/FullPageSpinner";
import PageNotFound from "./ui/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Profile from "./pages/Profile";
import FriendsSearch from "./pages/FriendsSearch";
import UserPage from "./pages/UserPage";
import AuthLayout from "./ui/AuthLayout";
import SavedPostsPage from "./pages/SavedPostsPage";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <Toaster />
      {/* <DarkMode /> */}
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/search" element={<FriendsSearch />} />
              <Route path="you" element={<UserPage />} />
              <Route path="/saved" element={<SavedPostsPage />} />
              <Route path="/notifications" element={<Notifications />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
