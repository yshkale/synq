import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
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
          // Protected routes for authenticated users
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route index element={<Inbox />} />
                  <Route path="/today" element={<div>today</div>} />
                  <Route path="/upcoming" element={<div>upcoming</div>} />
                  {/* Redirect any other paths to inbox */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            }
          />
        ) : (
          // Routes for non-authenticated users
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* Redirect any other paths to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Provider>
  );
};
