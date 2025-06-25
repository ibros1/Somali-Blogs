import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { type AppDispatch, type RootState } from "../../redux/store";
import { createUserFn } from "../../redux/slices/auth/register";
import { useEffect } from "react";
import toast from "react-hot-toast";
const Signup = () => {
  const registerState = useSelector((state: RootState) => state.registerSlice);
  const dipatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      phone_number: "",
      password: "",
      profilePhoto: "",
      coverPhoto: "",
      confirmPassword: "",
    },
    onSubmit(values) {
      console.log(values);
      const data = {
        email: values.email,
        fullname: values.fullname,
        phone_number: values.phone_number,
        profilePhoto: values.profilePhoto,
        coverPhoto: values.coverPhoto,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      dipatch(createUserFn(data));
    },

    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
      fullname: yup
        .string()
        .min(4, "please enter a valid name")
        .required("Full name is required"),
      phone_number: yup
        .string()
        .min(7, "phone number should be at least 7 digits")
        .max(12, "phone number shouldn't be longer than 12 characters")
        .required("Phone number is required"),
      profilePhoto: yup.string().min(8, "Please enter a valid photo"),
      password: yup
        .string()
        .min(4, "password should contain at least 4 characters")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
  });

  const toastId = "register";
  useEffect(() => {
    if (registerState.loading) {
      toast.loading("loading...", { id: toastId });
      return;
    }
    if (registerState.error) {
      toast.error(registerState.error, { id: toastId });
      return;
    }
    if (registerState.data.isSuccess) {
      toast.success("Successfully registered", { id: toastId });
      window.location.href = "/login";
      return;
    } else {
      // window.location.href = "/sign-up";
      // return;
    }
  }, [registerState.error, registerState.data]);

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto shadow-lg rounded-xl p-6 mt-20 bg-white border border-gray-100 my-8">
      <h3 className="text-3xl font-bold text-indigo-700 mb-2">Sign Up</h3>
      <p className="text-gray-500 mb-4">
        Please register an account to access the application.
      </p>
      <p className="text-red-600 py-2 font-semibold"> {registerState.error} </p>
      <form className="space-y-5 " onSubmit={formik.handleSubmit}>
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
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <p className="text-xs text-red-500 font-bold mt-1">
            {" "}
            {formik.touched.email && formik.errors.email}{" "}
          </p>
        </div>
        <div className="inputContainer grid">
          <label htmlFor="fullname" className="py-2 font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="fullname"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Enter your full name"
            onChange={formik.handleChange}
            value={formik.values.fullname}
            onBlur={formik.handleBlur}
          />
          <p className="text-xs text-red-500 font-bold mt-1">
            {" "}
            {formik.touched.fullname && formik.errors.fullname}{" "}
          </p>
        </div>
        <div className="inputContainer grid">
          <label
            htmlFor="phone_number"
            className="py-2 font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Enter your phone number"
            onChange={formik.handleChange}
            value={formik.values.phone_number}
            onBlur={formik.handleBlur}
          />
          <p className="text-xs text-red-500 font-bold mt-1">
            {" "}
            {formik.touched.phone_number && formik.errors.phone_number}{" "}
          </p>
        </div>
        <div className="inputContainer grid">
          <label
            htmlFor="profilePhoto"
            className="py-2 font-medium text-gray-700"
          >
            Profile Photo
          </label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={async (e) => {
              const file = e.currentTarget.files?.[0];

              if (file) {
                // Convert file to base64 string
                const reader = new FileReader();
                reader.onloadend = () => {
                  formik.setFieldValue("profilePhoto", reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            onBlur={formik.handleBlur}
          />
          <p className="text-xs text-red-500 font-bold mt-1">
            {formik.touched.profilePhoto && formik.errors.profilePhoto}
          </p>
        </div>
        <div className="inputContainer grid">
          <label
            htmlFor="profilePhoto"
            className="py-2 font-medium text-gray-700"
          >
            Cover Photo
          </label>
          <input
            type="file"
            name="coverPhoto"
            accept="image/*"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={async (e) => {
              const file = e.currentTarget.files?.[0];

              if (file) {
                // Convert file to base64 string
                const reader = new FileReader();
                reader.onloadend = () => {
                  formik.setFieldValue("coverPhoto", reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            onBlur={formik.handleBlur}
          />
          <p className="text-xs text-red-500 font-bold mt-1">
            {formik.touched.coverPhoto && formik.errors.coverPhoto}
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
            {" "}
            {formik.touched.password && formik.errors.password}{" "}
          </p>
        </div>
        <div className="inputContainer grid">
          <label
            htmlFor="confirmPassword"
            className="py-2 font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Confirm your password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
          />
          <p className="text-xs text-red-500 font-bold mt-1">
            {" "}
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword}{" "}
          </p>
        </div>
        <button
          disabled={registerState.loading || !formik.isValid}
          type="submit"
          className="w-full disabled:bg-gray-400 text-white bg-indigo-600 hover:bg-indigo-500 rounded-md px-6 py-3 my-2 font-semibold shadow transition cursor-pointer"
        >
          Sign-up
        </button>
      </form>
    </div>
  );
};

export default Signup;
