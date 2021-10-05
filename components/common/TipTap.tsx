import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

import { useField } from "formik";
import ButtonGroup from "./ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faGripLines,
  faList,
  faListOl,
  faQuoteRight,
  faRedo,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import useUpload from "../../lib/useUpload";

export default function TipTap({ ...props }: any) {
  const [field, meta, helpers] = useField(props);

  const editor = useEditor({
    extensions: [StarterKit, Placeholder, Image],
    content: field.value,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      helpers.setValue(html);
    },
  });
  return (
    <div>
      <MenuBar editor={editor} />
      <ImageUploader editor={editor} />
      <EditorContent
        className={
          meta.error && meta.touched ? "ring-red-500 ring-2 rounded" : ""
        }
        editor={editor}
      />
      {meta.touched && meta.error ? (
        <p className="text-sm text-red-500 ">{meta.error}</p>
      ) : null}
    </div>
  );
}

const ImageUploader = ({ editor }) => {
  const { uploadImage } = useUpload();
  const upload = async (file: File): Promise<any> => {
    const res = await uploadImage({ file });
    return res;
  };

  const addImage = (url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) return;
    upload(e.target.files[0])
      .then((res) => addImage(res))
      .catch((err) => console.error(err));
  };

  return (
    <label className="inline-block px-2 cursor-pointer" htmlFor="upload">
      <input
        // className='hidden'
        id="upload"
        type="file"
        onChange={handleChange}
      />
    </label>
  );
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    //   TODO: Figure out how to tabIndex in order
    <ButtonGroup>
      <div className="flex items-center">
        <ButtonGroup.StartButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={editor.isActive("bold") ? "is-active-tiptap" : ""}
          name="bold"
          title="Bold"
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
          title="Italics"
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
          title="Strikethrough"
        >
          <del>S</del>
        </ButtonGroup.EndButton>
      </div>
      <div className="flex items-center">
        <ButtonGroup.SoloButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().unsetAllMarks().run();
          }}
          name="clear-marks"
          title="Clear formatting"
        >
          Clear
        </ButtonGroup.SoloButton>
      </div>

      <div className="flex items-center">
        <ButtonGroup.StartButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setParagraph().run();
          }}
          className={editor.isActive("paragraph") ? "is-active-tiptap" : ""}
          name="paragraph"
          title="Paragraph"
        >
          P
        </ButtonGroup.StartButton>

        <ButtonGroup.MiddleButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active-tiptap" : ""
          }
          name="h1"
          title="Heading 1"
        >
          H1
        </ButtonGroup.MiddleButton>
        <ButtonGroup.MiddleButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active-tiptap" : ""
          }
          name="h2"
          title="Heading 2"
        >
          H2
        </ButtonGroup.MiddleButton>
        <ButtonGroup.MiddleButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active-tiptap" : ""
          }
          name="h3"
          title="Heading 3"
        >
          H3
        </ButtonGroup.MiddleButton>

        <ButtonGroup.EndButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active-tiptap" : ""
          }
          name="h4"
          title="Heading 4"
        >
          H4
        </ButtonGroup.EndButton>
      </div>
      <div className="flex items-center">
        <ButtonGroup.StartButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={editor.isActive("bulletList") ? "is-active-tiptap" : ""}
          name="bullet"
          title="Bullet list"
        >
          <FontAwesomeIcon icon={faList} />
        </ButtonGroup.StartButton>

        <ButtonGroup.EndButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={editor.isActive("orderedList") ? "is-active-tiptap" : ""}
          name="ordered"
          title="Ordered List"
        >
          <FontAwesomeIcon icon={faListOl} />
        </ButtonGroup.EndButton>
      </div>
      <div className="flex items-center">
        <ButtonGroup.StartButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={editor.isActive("codeBlock") ? "is-active-tiptap" : ""}
          name="code"
          title="Code block"
        >
          <FontAwesomeIcon icon={faCode} />
        </ButtonGroup.StartButton>

        <ButtonGroup.EndButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={editor.isActive("blockquote") ? "is-active-tiptap" : ""}
          name="quote"
          title="Blockquote"
        >
          <FontAwesomeIcon icon={faQuoteRight} />
        </ButtonGroup.EndButton>
      </div>
      <div className="flex items-center">
        <ButtonGroup.SoloButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setHorizontalRule().run();
          }}
          name="horizontal"
          title="Horizontal rule"
        >
          <FontAwesomeIcon icon={faGripLines} />
        </ButtonGroup.SoloButton>
      </div>
      <div className="flex items-center">
        <ButtonGroup.StartButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          name="undo"
          title="Undo"
        >
          <FontAwesomeIcon icon={faUndo} />
        </ButtonGroup.StartButton>
        <ButtonGroup.EndButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          name="redo"
          title="Redo"
        >
          <FontAwesomeIcon icon={faRedo} />
        </ButtonGroup.EndButton>
      </div>
    </ButtonGroup>
  );
};
