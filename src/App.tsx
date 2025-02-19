import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { Landing } from "./components/Landing";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { store } from "./store";
import { Layout } from "./components/Layout";
import { Inbox } from "./components/Inbox";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route index element={<Inbox />} />
                <Route path="/today" element={<div>today</div>} />
                <Route path="/upcoming" element={<div>upcoming</div>} />
              </Routes>
            </Layout>
          }
        />
        <Route path="/landing-temp" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Provider>
  );
};
