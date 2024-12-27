"use client";
import React, { useRef, useMemo } from "react";
import JoditEditor, { Jodit } from "jodit-react";

type RichTextEditorProps = {
  placeholder?: string;
  value?: string;
  onChange?: (content: string) => void;
  config?: object;
  tabIndex?: number;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = "Start typing...",
  value = "",
  onChange,
  tabIndex = 1,
  config: customConfig = {},
}) => {
  const editor = useRef<Jodit | null>(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
      ...customConfig,
    }),
    [placeholder, customConfig]
  );

  const handleBlur = (newContent: string) => {
    if (onChange) {
      onChange(newContent);
    }
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={(newContent) => handleBlur(newContent as string)}
      onChange={(newContent) => {}}
      // onChange={() => {}}
    />
  );
};

export default RichTextEditor;
