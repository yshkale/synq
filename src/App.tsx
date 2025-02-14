import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { Home } from "./components/Home";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { store } from "./store";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Provider>
  );
};
