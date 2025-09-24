import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

import TipTapToolbar from './TipTapToolbar'; 

export default function TiptTapEditor({
  initialContent = '',
  onChange = () => {},
  editable = true,
  placeholder = 'Start typing...'
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link:false,
        underline:false
      }),
      Underline,
      Placeholder.configure({ placeholder }),
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: initialContent,
    editable,
  });

  // Effect to handle the onChange callback
  useEffect(() => {
    if (!editor) return;
    const handler = () => onChange(editor.getHTML());
    editor.on('update', handler);
    return () => editor.off('update', handler);
  }, [editor, onChange]);

  // Effect to sync the 'editable' prop
  useEffect(() => {
    if (!editor) return;
    editor.setOptions({ editable });
  }, [editor, editable]);

  // Effect to sync the 'initialContent' prop
  useEffect(() => {
    if (!editor || editor.isFocused) return;
    const current = editor.getHTML();
    if (initialContent !== current) {
      editor.commands.setContent(initialContent, false);
    }
  }, [editor, initialContent]);


  return (
    <div className="flex flex-col border-2 border-gray-500/50 mb-2 rounded-lg  tranition-all pb-0 duration-700 h-[30vh] sm:h-[40vh] ">
      {editable && <TipTapToolbar editor={editor} />}
      <EditorContent  className="scrollable" editor={editor} />
    </div>
  );
}