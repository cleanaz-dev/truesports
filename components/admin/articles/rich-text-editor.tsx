"use client"

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({
        placeholder: "Write the article...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm max-w-none min-h-[20rem] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const Btn = ({
    onClick,
    active,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded p-1.5 hover:bg-zinc-800 ${
        active ? "bg-zinc-800 text-white" : "text-zinc-400"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-900">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-zinc-800 px-2 py-1.5">
        <Btn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="h-4 w-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 className="h-4 w-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List className="h-4 w-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          <Quote className="h-4 w-4" />
        </Btn>
        <Btn
          onClick={() => {
            const url = window.prompt("Link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
        >
          <LinkIcon className="h-4 w-4" />
        </Btn>
        <div className="mx-1 h-4 w-px bg-zinc-800" />
        <Btn onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}