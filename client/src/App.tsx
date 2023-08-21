import "./App.css";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/common/layout";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Root from "./views/Root";
import Login from "@/views/Login";
import TaskPage from "./views/Tasks";
import MessagePage from "./views/Messages";
import SettingsProfilePage from "./views/Settings";

const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    id: "root",
    path: "/*",
    Component: RequireAuth,
    children: [
      {
        index: true,
        Component: Root,
      },
      {
        path: "settings/*",
        Component: SettingsProfilePage,
      },
      {
        path: "tasks",
        Component: TaskPage,
      },
      {
        path: "messages",
        Component: MessagePage,
      },
    ],
  },
]);

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </AuthProvider>
  );
}

export default App;
