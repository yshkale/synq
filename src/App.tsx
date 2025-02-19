import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { Landing } from "./components/Landing";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { store } from "./store";
import { Home } from "./components/Home";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/temp" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Provider>
  );
};
