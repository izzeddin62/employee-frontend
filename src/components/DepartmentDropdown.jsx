import { useState } from "react";

/* eslint-disable react/prop-types */
export default function DepartmentDropdown({
  departments,
  setDepartment,
  department,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="relative">
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        onClick={() => setOpenMenu(!openMenu)}
        className="text-white z-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Choose department {department ? " - " + department?.name : ""}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="dropdownHover"
        className={`z-10 ${
          openMenu ? "" : "hidden"
        } mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          {departments?.map((department) => (
            <li key={department.id}>
              <button
                type="button"
                onClick={() => {
                  setDepartment(department);
                  setOpenMenu(false);
                }}
                className="w-full flex justify-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {department.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
