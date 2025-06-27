import { Button } from "./ui/button";
import { useFormik } from "formik";
import * as yup from "yup";
import { Textarea } from "./ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import {
  createCommentFn,
  resetCommentFn,
} from "@/redux/slices/auth/comments/createComment";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Comments = ({ articleId }: { articleId: number }) => {
  const getCreateCommentState = useSelector(
    (state: RootState) => state.createCommenSlice
  );

  const logInstate = useSelector((state: RootState) => state.loginSlice);

  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const data = {
        articleId: Number(articleId),
        comment: values.comment,
      };
      dispatch(createCommentFn(data));
      resetForm();
    },
    validationSchema: yup.object().shape({
      comment: yup
        .string()
        .required("You should add the comment before submit"),
    }),
  });

  useEffect(() => {
    // if (getCreateCommentState.error) {
    //   toast.error(getCreateCommentState.error);
    // }
    if (getCreateCommentState.data.isSuccess) {
      toast.success("Successfully Commented!");
      location.reload();

      dispatch(resetCommentFn());
    }
  }, [getCreateCommentState.data]);

  // 🧠 show toast only when there's an error

  return !logInstate.data.isSuccess ? (
    <Link to={"/auth/login"}> Please login to comment</Link>
  ) : (
    <div>
      <div className="inputContainer">
        <form onSubmit={formik.handleSubmit}>
          <Textarea
            name="comment"
            placeholder="Enter your comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="text-xs text-red-500 font-bold mt-1">
            {formik.touched.comment && formik.errors.comment}
          </p>
          <Button
            type="submit"
            className="my-4 disabled:bg-gray-600"
            disabled={getCreateCommentState.loading && !formik.isValid}
          >
            {getCreateCommentState.loading ? "Posting..." : "Comment"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
