/* eslint-disable react/prop-types */
import { Dialog } from "@reach/dialog";
import { Form } from "react-router-dom";

export default function CreateDepartmentsModal({ showDialog, close, action }) {
  return (
    <Dialog isOpen={showDialog} onDismiss={close}>
      <Form className="max-w-sm mx-auto" method="post" action={action}>
      <h1 className="mb-8">New Department</h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Department Name
          </label>
        </div>

        <button
          type="submit"
          name="intent"
          value="add"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Add Department
        </button>
      </Form>
    </Dialog>
  );
}
