import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Employees, { loader as employeesLoader, action as employeesAction } from "./pages/Employees";
import Employee, { loader as employeeLoader, action as employeeAction } from "./pages/Employee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/employees",
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
]);

function App() {
  

  return (
    <RouterProvider router={router} />
  )
}

export default App
