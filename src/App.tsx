import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { Landing } from "./components/Landing";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { store } from "./store";
import { Layout } from "./components/Layout";
import { Inbox } from "./components/Inbox";
import { useAuth } from "./context/AuthContext";

export const App = () => {
  const { userToken } = useAuth();

  return (
    <Provider store={store}>
      <Routes>
        {userToken ? (
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
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Provider>
  );
};
