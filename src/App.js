import "./App.css";
import LoginPage from "./Layouts/Pages/LoginPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Layout from "./Layouts/Components/Layout";
import "rsuite/styles/index.less"; // or 'rsuite/dist/rsuite.min.css'
import TasksList from "./Layouts/Pages/Tasks/TasksList";
import SignUp from "./Layouts/Components/SignUp";
import UsersList from "./Layouts/Pages/User/UsersList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUsers from "./Layouts/Pages/User/AddUsers";
import AddTasks from "./Layouts/Pages/Tasks/AddTasks";
function App() {
  let { param } = useParams();
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/AddUsers"
          element={
            <Layout>
              <AddUsers />
            </Layout>
          }
        />

        <Route
          path="/UsersList"
          element={
            <Layout>
              <UsersList />
            </Layout>
          }
        />

        <Route path="/SignUp" element={<SignUp />} />

        <Route
          path="/TasksList"
          element={
            <Layout>
              <TasksList />
            </Layout>
          }
        />
        <Route
          path="/AddTasks"
          element={
            <Layout>
              <AddTasks />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
