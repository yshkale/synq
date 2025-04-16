import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { Landing } from "./components/Landing";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { store } from "./store";
import { Layout } from "./components/Layout";
import { Inbox } from "./components/Tasks/components/Inbox";
import { useAuth } from "./context/AuthContext";
import { Today } from "./components/Tasks/components/Today";
import { Upcoming } from "./components/Tasks/components/Upcoming";
import { Completed } from "./components/Tasks/components/Completed";
import { ProjectView } from "./components/Tasks/components/ProjectView";
import { AccountSettings } from "./components/AccountSettings";

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
                  <Route path="/today" element={<Today />} />
                  <Route path="/upcoming" element={<Upcoming />} />
                  <Route path="/completed" element={<Completed />} />
                  <Route path="/project/:name" element={<ProjectView />} />
                  <Route
                    path="/account-settings"
                    element={<AccountSettings />}
                  />
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
