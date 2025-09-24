import { useCallback } from 'react';
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaLink, FaListUl, FaListOl,
  FaQuoteLeft, FaCode, FaUndo, FaRedo, FaMinus
} from 'react-icons/fa';
import '../index.css'; 

export default function TipTapToolbar({ editor }) {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div style={{background:"var(--secondary)"}} className="tiptap-toolbar rounded-t-lg transition-all duration-700 sticky top-0 z-10 p-2 border-b-2 border-gray-500/50 flex flex-wrap gap-2 justify-center w-full">
      <button type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        aria-label="Bold"
      >
        <FaBold />
      </button>
      <button type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        aria-label="Italic"
      >
        <FaItalic />
      </button>
      <button type='button'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
        aria-label="Underline"
      >
        <FaUnderline />
      </button>
      <button type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
        aria-label="Strikethrough"
      >
        <FaStrikethrough />
      </button>
      <button type='button'
        onClick={setLink}
        className={editor.isActive('link') ? 'is-active' : ''}
        aria-label="Set Link"
      >
        <FaLink />
      </button>

      <div className="divider"></div>

      {/* --- Headings --- */}
      <select 
        onChange={(e) => {
          const level = parseInt(e.target.value, 10);
          if (level === 0) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: level }).run();
          }
        }}
        value={
            editor.isActive('heading', { level: 1 }) ? 1 :
            editor.isActive('heading', { level: 2 }) ? 2 :
            editor.isActive('heading', { level: 3 }) ? 3 : 0
        }
        className="heading-select"
      >
        <option className='text-[2em]' value="1">H1</option>
        <option className='text-[1.5em]' value="2">H2</option>
        <option className='text-[1.17em]' value="3">H3</option>
        <option className='text-base' value="0">P</option>
      </select>

      <div className="divider"></div>

      {/* --- Lists & Blocks --- */}
      <button type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        aria-label="Bullet List"
      >
        <FaListUl />
      </button>
      <button type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        aria-label="Ordered List"
      >
        <FaListOl />
      </button>
       <button type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
        aria-label="Blockquote"
      >
        <FaQuoteLeft />
      </button>
      <button type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
        aria-label="Code Block"
      >
        <FaCode />
      </button>
      <button  type='button' onClick={() => editor.chain().focus().setHorizontalRule().run()} aria-label="Horizontal Rule">
        <FaMinus />
      </button>


      <div className="divider"></div>

      {/* --- History --- */}
      <button  type='button' onClick={() => editor.chain().focus().undo().run()} aria-label="Undo">
        <FaUndo />
      </button>
      <button  type='button' onClick={() => editor.chain().focus().redo().run()} aria-label="Redo">
        <FaRedo />
      </button>
    </div>
  );
}