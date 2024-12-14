import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type TipTapEditorProps = {
  content?: string; // Initial content
  onUpdate?: (content: string) => void; // Callback to handle content changes
  placeholder?: string; // Placeholder text
};

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content = "",
  onUpdate,
  placeholder = "Start writing here...",
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class:
          "prose focus:outline-none p-4 border border-gray-300 rounded-lg min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      onUpdate && onUpdate(updatedContent);
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  const addToolbarButton = (
    action: () => void,
    label: string,
    active: boolean = false
  ) => (
    <button
      type="button"
      onClick={action}
      className={`px-2 py-1 text-sm rounded-md ${
        active ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="editor-container">
      {/* Toolbar */}
      {editor && (
        <div className="toolbar flex flex-wrap gap-2 mb-2 p-2 border border-gray-300 rounded-md bg-gray-100">
          {addToolbarButton(
            () => editor.chain().focus().toggleBold().run(),
            "Bold",
            editor.isActive("bold")
          )}
          {addToolbarButton(
            () => editor.chain().focus().toggleItalic().run(),
            "Italic",
            editor.isActive("italic")
          )}

          {addToolbarButton(
            () => editor.chain().focus().toggleStrike().run(),
            "Strike",
            editor.isActive("strike")
          )}
          {addToolbarButton(
            () => editor.chain().focus().toggleBlockquote().run(),
            "Blockquote",
            editor.isActive("blockquote")
          )}
          {addToolbarButton(
            () => editor.chain().focus().toggleBulletList().run(),
            "Bullet List",
            editor.isActive("bulletList")
          )}
          {addToolbarButton(
            () => editor.chain().focus().toggleOrderedList().run(),
            "Ordered List",
            editor.isActive("orderedList")
          )}
          {addToolbarButton(
            () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            "H1",
            editor.isActive("heading", { level: 1 })
          )}
          {addToolbarButton(
            () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            "H2",
            editor.isActive("heading", { level: 2 })
          )}
          {addToolbarButton(
            () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            "H3",
            editor.isActive("heading", { level: 3 })
          )}
        </div>
      )}
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
