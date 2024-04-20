/* eslint-disable react/prop-types */
import { Dialog } from "@reach/dialog";
import { Form } from "react-router-dom";
import DepartmentDropdown from "./DepartmentDropdown";
import { useState } from "react";

export default function UpdateEmployeeModal({ showDialog, close, action, departments }) {
  const [dep, setDep] = useState(null);
  return (
    <Dialog isOpen={showDialog} onDismiss={close}>
      <Form className="max-w-sm mx-auto" method="post" action={action}>
        <h1 className="mb-4">Update Employee</h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Employee Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
        <input type="hidden" value={dep?.id} name="floating_department" />
        <DepartmentDropdown departments={departments} department={dep} setDepartment={setDep} />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="floating_salary"
            id="floating_salary"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_salary"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Employee Salary
          </label>
        </div>
        <button
          type="submit"
          name="intent"
          value={"update"}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Update employee
        </button>
      </Form>
    </Dialog>
  );
}
