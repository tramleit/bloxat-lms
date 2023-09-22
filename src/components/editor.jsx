/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ onChange, value }) => {
  // const ReactQuill = useMemo(() => import("react-quill"), []);

  return (
    <div className="bg-white text-black">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default Editor;
