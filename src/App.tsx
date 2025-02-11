import { Route, Routes } from "react-router";
import { Home } from "./components/Home";
import { Signup } from "./components/Signup";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
