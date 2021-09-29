import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useField } from "formik";
import ButtonGroup from "./ButtonGroup";

export default function TipTap({ ...props }: any) {
  const [field, meta, helpers] = useField(props);

  const editor = useEditor({
    extensions: [StarterKit],
    content: props.placeholder,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      helpers.setValue(html);
    },
  });
  return (
    <div className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    // <div className="flex items-center">
    <ButtonGroup>
      <ButtonGroup.StartButton
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={editor.isActive("bold") ? "is-active-tiptap" : ""}
        name="bold"
      >
        <b>B</b>
      </ButtonGroup.StartButton>

      <ButtonGroup.MiddleButton
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={editor.isActive("italic") ? "is-active-tiptap" : ""}
        name="italics"
      >
        <i>Italic</i>
      </ButtonGroup.MiddleButton>

      <ButtonGroup.EndButton
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        className={editor.isActive("strike") ? "is-active-tiptap" : ""}
        name="strike"
      >
        <del>S</del>
      </ButtonGroup.EndButton>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCode().run();
        }}
        className={editor.isActive("code") ? "is-active-tiptap" : ""}
      >
        code
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().unsetAllMarks().run();
        }}
      >
        clear marks
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().clearNodes().run();
        }}
      >
        clear nodes
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setParagraph().run();
        }}
        className={editor.isActive("paragraph") ? "is-active-tiptap" : ""}
      >
        paragraph
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={
          editor.isActive("heading", { level: 1 }) ? "is-active-tiptap" : ""
        }
      >
        h1
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={
          editor.isActive("heading", { level: 2 }) ? "is-active-tiptap" : ""
        }
      >
        h2
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
        className={
          editor.isActive("heading", { level: 3 }) ? "is-active-tiptap" : ""
        }
      >
        h3
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 4 }).run();
        }}
        className={
          editor.isActive("heading", { level: 4 }) ? "is-active-tiptap" : ""
        }
      >
        h4
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 5 }).run();
        }}
        className={
          editor.isActive("heading", { level: 5 }) ? "is-active-tiptap" : ""
        }
      >
        h5
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 6 }).run();
        }}
        className={
          editor.isActive("heading", { level: 6 }) ? "is-active-tiptap" : ""
        }
      >
        h6
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={editor.isActive("bulletList") ? "is-active-tiptap" : ""}
      >
        bullet list
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive("orderedList") ? "is-active-tiptap" : ""}
      >
        ordered list
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCodeBlock().run();
        }}
        className={editor.isActive("codeBlock") ? "is-active-tiptap" : ""}
      >
        code block
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
        className={editor.isActive("blockquote") ? "is-active-tiptap" : ""}
      >
        blockquote
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setHorizontalRule().run();
        }}
      >
        horizontal rule
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setHardBreak().run();
        }}
      >
        hard break
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
      >
        undo
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
      >
        redo
      </button>
    </ButtonGroup>
  );
};
