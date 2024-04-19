/* eslint-disable react-refresh/only-export-components */
import { Form, useActionData, useLoaderData } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { getEmployee, getReport, updateEmployee, updateReport } from "../api";
import profileIcon from "../assets/profile.svg";
import { useEffect, useState } from "react";
import editIcon from "../assets/edit.svg";
import UpdateEmployeeModal from "../components/UpdateEmployeeModal";

export const loader = async ({ params }) => {
  const { id } = params;
  const employee = await getEmployee(id);
  const report = await getReport(id);
  return { employee, report: report.report };
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const { id } = params;
  const intent = formData.get("intent");
  if (intent === "update") {
    try {
      const name = formData.get("floating_name");
      const department = formData.get("floating_department");
      const salary = formData.get("floating_salary");
      const employee = {};
      if (name) employee.name = name;
      if (department) employee.department = department;
      if (salary) employee.salary = parseInt(salary, 10);
      if (Object.keys(employee).length === 0) {
        alert("No data to update");
        return { modal: { show: true } };
      }
      await updateEmployee(id, employee);
      return {
        status: 302,
        headers: { location: `/employee/${id}` },
        modal: { show: false },
      };
    } catch (error) {
      alert("unable to update employee");
      return { modal: { show: false } };
    }
  }
  if (intent === "report") {
    const report = formData.get("report");
    await updateReport(id, report);
    return { status: 302, headers: { location: `/employee/${id}` }, modal: { show: false } };
  }
};

export default function Employee() {
  const { employee, report: backendReport } = useLoaderData();
  const [report, setReport] = useState(backendReport ?? "");
  const actionData = useActionData();
  console.log(actionData, "actionData");
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  useEffect(() => {
    setShowDialog(!!actionData?.modal?.show);
  }, [actionData]);

  console.log(report, "employee");
  return (
    <>
      <UpdateEmployeeModal
        showDialog={showDialog}
        close={close}
        action={action}
      />
      <div>
        <div className="max-w-[500px] bg-green-50 mt-20 mx-auto p-8 rounded-lg h-fit">
          <div className="flex gap-3">
            <div className="flex items-center justify-center w-20 h-20 bg-white rounded-xl">
              <img src={profileIcon} alt="" width={60} height={60} />
            </div>
            <div className="relative -top-1.5 flex-1 flex justify-between">
              <div>
                <h1 className="text-2xl font-semibold ">{employee.name}</h1>
                <p className="relative text-[#9ca3af] -top-1">
                  {employee.department}
                </p>
              </div>
              <button className="h-fit" onClick={open}>
                <img src={editIcon} alt="edit" width={20} height={20} />
              </button>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-[#9ca3af]">Employee id:</h2>
            <p className="font-medium">{employee.id}</p>
          </div>
          <div className="mt-3">
            <h2 className="text-[#9ca3af]">Employee salary:</h2>
            <p className="font-medium">{employee.salary}</p>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto p-8 mt-5 rounded-lg h-fit">
          <div className="flex justify-between">
            <h2 className="mb-5 text-2xl font-bold">Report</h2>
            <Form action={action} method="post">
            <input type="hidden" name="report" value={report} />
              <button
                type="submit"
                name="intent"
                value={"report"}
                disabled={report === backendReport}
                className="text-white bg-blue-700 disabled:bg-opacity-50 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Add report
              </button>
            </Form>
          </div>

          <MDEditor value={report} onChange={setReport} preview="edit" />
          <MDEditor.Markdown
            source={report}
            style={{ whiteSpace: "pre-wrap", minHeight: 300 }}
          />
        </div>
      </div>
    </>
  );
}
