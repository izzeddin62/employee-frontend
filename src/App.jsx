import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Employees, { loader as employeesLoader, action as employeesAction } from "./pages/Employees";
import Employee, { loader as employeeLoader, action as employeeAction } from "./pages/Employee";
import Wrapper from "./pages/Wrapper";
import Departments, { loader as DepartmentsLoader, action as DepartmentsAction } from "./pages/Departments";
import Login, { action as loginAction } from "./pages/Login";
import Signup, {action as signupAction } from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/",
        loader: employeesLoader,
        element: <Employees />,
        action: employeesAction
      },
      {
        path: "/employee/:id",
        element: <Employee />,
        loader: employeeLoader,
        action: employeeAction
      },
      {
        path: "/departments",
        loader: DepartmentsLoader,
        element: <Departments />,
        action: DepartmentsAction
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction
  },
  {
    path: "/signup",
    element: <Signup />,
    action: signupAction
  }
]);

function App() {
  

  return (
    <RouterProvider router={router} />
  )
}

export default App
