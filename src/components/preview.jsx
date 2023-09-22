/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export const Preview = ({ value }) => {
  return <ReactQuill theme="bubble" value={value} readOnly />;
};
