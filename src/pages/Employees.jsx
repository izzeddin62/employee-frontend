/* eslint-disable react-refresh/only-export-components */

import { Form, Link, redirect, useActionData, useLoaderData } from "react-router-dom";
import { createEmployee, deleteEmployee, getEmployees } from "../api";
import "@reach/dialog/styles.css";
import CreateEmployeeModal from "../components/CreateEmployeeModal";
import { useEffect, useState } from "react";
import binIcon from "../assets/bin.svg";
import editIcon from "../assets/edit.svg";

export async function loader() {
  const employees = await getEmployees();
  return { employees };
}

export async function action({ request }) {
  let formData = await request.formData();
  console.log(formData, "formData");
  const intent = formData.get("intent");
  console.log(intent, "intent");

  if (intent === "add") {
    const name = formData.get("floating_name");
    const department = formData.get("floating_department");
    const salary = parseInt(formData.get("floating_salary"), 10);
    const employee = { name, department, salary };
    await createEmployee(employee);
    return { status: 302, headers: { location: `/employees` }, modal: { show: false }};
  }
  if (intent === "delete") {
    console.log("delete");

    const id = formData.get("id");
    if (id) {
          await deleteEmployee(id);
    return redirect("/employees", { status: 302 });
    } else {
      alert("id is required");
      return null
    }

  }
}

export default function Employees() {
  const { employees } = useLoaderData();
  const [showDialog, setShowDialog] = useState(false);
  const actionData = useActionData();
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  useEffect(() => {
      setShowDialog(!!actionData?.modal?.show);
  }
  , [actionData?.modal?.show]);

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 ">Employees</h1>
          <button
            type="button"
            onClick={open}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add employee
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
                <th scope="col" className="px-6 py-3">
                  Salary
                </th>
                <th scope="col" className="px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {employee.name}
                  </th>
                  <td className="px-6 py-4">{employee.department}</td>
                  <td className="px-6 py-4">{employee.salary}</td>
                  <td className="flex gap-1 px-6 py-2">
                  <Link to={`/employee/${employee.id}`}><img src={editIcon} alt="edit" width={20} height={20} /></Link>
                  <Form method="post" action="/employees" >
                    <input type="hidden" name="id" value={employee.id} />
                    <button name="intent" value="delete">
                      <img src={binIcon} alt="delete" width={20} height={20} />
                    </button>
                  </Form>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateEmployeeModal showDialog={showDialog} close={close} />
    </>
  );
}
