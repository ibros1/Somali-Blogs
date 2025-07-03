import Spinner from "@/components/spinner";
import TextEditor from "@/components/textEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  createArticleFn,
  resetCreateArticle,
} from "@/redux/slices/auth/articles/articles";
import { type AppDispatch, type RootState } from "@/redux/store";
// import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articleState = useSelector((state: RootState) => state.articleSlice);
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const toastId = "create post";
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      isPublished: false,
    },
    onSubmit(values) {
      dispatch(
        createArticleFn({
          title: values.title,
          content: values.content,
          isPublished: values.isPublished,
        })
      );
    },

    validationSchema: yup.object().shape({
      title: yup
        .string()
        .min(6, "Title must be at least 6 to 64 characters.")
        .required(),
      content: yup.string().min(6, "Content is too short").required(),
    }),
  });

  useEffect(() => {
    if (articleState.posts.isSuccess) {
      toast.success("Successfully Created post", {
        id: toastId,
      });
      navigate("/posts");
      dispatch(resetCreateArticle());
    }
  }, [articleState.posts.isSuccess]);

  // console.log(title, content, isPublished);
  console.log("isPublished:", formik.values.isPublished);
  return !loginState.data.user ? (
    <div className="text-red-600 font-bold flex justify-center items-center text-center min-h-screen text-4xl">
      {" "}
      Please Login First{" "}
    </div>
  ) : (
    <div className="w-[80%] mx-auto md:w-[40%] my-16 border p-6 rounded-md shadow-sm bg-white ">
      <h1 className="text-4xl font-bold">Create new article</h1>
      <form action="" className="my-4" onSubmit={formik.handleSubmit}>
        <div className="inputContainer my-2">
          <label htmlFor="title font-semibold">Title</label>
          <Input
            name="title"
            placeholder="Enter your post title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <h4 className="text-red-600">
            {" "}
            {formik.touched.title && formik.errors.title}{" "}
          </h4>
        </div>

        <div className="inputContainer">
          <label htmlFor="">Content</label>
          <TextEditor
            value={formik.values.content}
            onChange={(val) => {
              formik.setFieldTouched("content", true, true);
              formik.setFieldValue("content", val);
            }}
          />

          <h4 className="text-red-600">
            {" "}
            {formik.touched.content && formik.errors.content}{" "}
          </h4>
        </div>
        <div className="inputContainer items-center my-4 flex gap-3">
          <Switch
            checked={formik.values.isPublished}
            onCheckedChange={(value) =>
              formik.setFieldValue("isPublished", value)
            }
            className="cursor-pointer "
          />
          <label htmlFor="">Published</label>
        </div>

        <Button
          disabled={articleState.loading || !formik.isValid}
          className="cursor-pointer  bg-black text-white px-4 py-2 rounded-lg font-semibold w-full"
        >
          {articleState.loading ? <Spinner /> : "Save article"}
        </Button>
      </form>
    </div>
  );
};

export default Articles;
