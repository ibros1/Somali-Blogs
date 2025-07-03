import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { loginFunction } from "../../redux/slices/auth/login";
import type { AppDispatch, RootState } from "../../redux/store";
import Spinner from "../../components/spinner";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const toastId = "login";

  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit(values) {
      const data = {
        email: values.email,
        password: values.password,
      };
      toast.loading("logged in....", { id: toastId });
      dispatch(loginFunction(data));
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Email must be a valid email")
        .required("Please enter email"),
      password: yup
        .string()
        .min(4, "password must be at least 4 characters")
        .required("Password is required"),
    }),
  });

  useEffect(() => {
    if (loginState.error) {
      toast.error(loginState.error, { id: toastId });
    }
    if (loginState.data.isSuccess) {
      toast.success("Successfully Logged in", { id: toastId });
      localStorage.setItem("userData", JSON.stringify(loginState.data));
      location.href = "/";
    }
  }, [loginState.error, loginState.data]);

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto shadow-lg rounded-xl p-6 mt-20 bg-white border border-gray-100">
      <h3 className="text-3xl font-bold text-indigo-700 mb-2">Sign In</h3>
      <p className="text-gray-500 mb-4">
        Please enter your credentials to access your account.
      </p>
      <p className="text-red-600 py-2 font-semibold"> {loginState.error} </p>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div className="inputContainer grid">
          <label htmlFor="email" className="py-2 font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Enter your Email"
            onChange={formik.handleChange}
            value={formik.values.email.toLowerCase()}
            onBlur={formik.handleBlur}
          />
          <p className="text-xs text-red-500 font-bold mt-1">
            {formik.touched.email && formik.errors.email}
          </p>
        </div>
        <div className="inputContainer grid">
          <label htmlFor="password" className="py-2 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <p className="text-xs text-red-500 font-bold mt-1">
            {formik.touched.password && formik.errors.password}
          </p>
        </div>
        <button
          disabled={loginState.loading || !formik.isValid}
          type="submit"
          className="w-full disabled:bg-gray-400 text-white bg-indigo-600 hover:bg-indigo-500 rounded-md px-6 py-3 my-2 font-semibold shadow transition cursor-pointer"
        >
          {loginState.loading ? <Spinner /> : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
