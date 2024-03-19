import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./ui/AuthLayout";
import DarkMode from "./ui/DarkMode";
const Homepage = lazy(() => import("./pages/homepage"));
function App() {
  return (
    <>
      <DarkMode />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
