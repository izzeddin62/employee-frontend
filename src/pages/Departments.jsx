/* eslint-disable react-refresh/only-export-components */

import { useActionData, useLoaderData } from "react-router-dom";
import {
    createDepartment,
  getDepartments,
  getEmployees,
} from "../api";
import "@reach/dialog/styles.css";
import { useEffect, useState } from "react";
import CreateDepartmentsModal from "../components/CreateDepartmentModal";
import { checkAuthenticity } from "../api/auth";

export async function loader() {
  const [employees, departments] = await Promise.all([
    getEmployees(),
    getDepartments(),
  ]);
  return { employees, departments };
}

export async function action({ request }) {
  checkAuthenticity();
  try {
    const formData = await request.formData();

    const name = formData.get("floating_name");
    const department = { name };
    await createDepartment(department);
    return {
      status: 302,
      headers: { location: `/departments` },
      modal: { show: false },
    };
  } catch (error) {
    console.log(error, "error");
    alert("There was an error: " + error.message);
    return null;
  }
}

export default function Departments() {
  const { departments } = useLoaderData();
  const [showDialog, setShowDialog] = useState(false);
  const actionData = useActionData();
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  useEffect(() => {
    setShowDialog(!!actionData?.modal?.show);
  }, [actionData?.modal?.show]);

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 ">Departments</h1>
          <button
            type="button"
            onClick={open}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Department
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
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  members
                </th>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {department.name}
                  </th>
                  <td className="px-6 py-4">{department.members}</td>
                  <td className="px-6 py-4">{department.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateDepartmentsModal
        showDialog={showDialog}
        close={close}
        action={action}
      />
    </>
  );
}
