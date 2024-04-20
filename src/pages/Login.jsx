/* eslint-disable react-refresh/only-export-components */
import { Form, Link, redirect } from "react-router-dom";
import { login } from "../api";

export async function action({ request }) {
  const token = localStorage.getItem("token");
  if (token) {
    return redirect("/");
  }
  try {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const { token } = await login({ username, password });
    localStorage.setItem("token", token);
    return redirect("/");
  } catch (error) {
    console.log(error, "error");
    alert("There was an error: " + error.message);
    return null;
  }
}

export default function Login() {
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <Form
              className="space-y-4 md:space-y-6"
              action={action}
              method="post"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#2563eb] "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline text-[#2563eb] "
                >
                  Sign up
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
