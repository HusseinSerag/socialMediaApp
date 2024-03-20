import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./ui/AuthLayout";

const Homepage = lazy(() => import("./pages/homepage"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
import DarkMode from "./ui/DarkMode";
import FullPageSpinner from "./ui/FullPageSpinner";
import PageNotFound from "./ui/PageNotFound";
import AppLayout from "./ui/AppLayout";

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
      <ReactQueryDevtools position="top" />

      <Toaster />
      <DarkMode />
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Homepage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
