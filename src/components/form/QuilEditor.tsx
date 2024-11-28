import React from "react";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface RichTextEditorProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <ReactQuill
      value={value || ""}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder={placeholder || "Start writing..."}
      className="h-[300px] mb-5 rounded"
    />
  );
};

export default RichTextEditor;
