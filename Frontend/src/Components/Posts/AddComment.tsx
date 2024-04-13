import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';

import Superscript from '@tiptap/extension-superscript';
import { Button, IconButton } from '@material-tailwind/react';
import Heading from '@tiptap/extension-heading';
import { BiBold, BiHeading, BiItalic, BiStrikethrough } from 'react-icons/bi';
import { BsQuote, BsSuperscript } from 'react-icons/bs';
import { cn } from '../../utils/helper_functions';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
  CodeBracketIcon,
  CommandLineIcon,
  LinkIcon,
  ListBulletIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Code from '@tiptap/extension-code';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import { AiOutlineOrderedList } from 'react-icons/ai';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import { useMutation, useQueryClient } from 'react-query';
import { postRequest } from '../../API/User';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const setLink = useCallback(() => {
    if (!editor) {
      return null;
    }
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className='*:text-neutral-900'>
        <IconButton
          variant='text'
          size='lg'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'bg-neutral-muted' : ''
          }
        >
          <BiHeading size={20} />
        </IconButton>
        <IconButton
          variant='text'
          size='lg'
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-neutral-muted' : ''}
        >
          <BiBold size={20} />
        </IconButton>
        <IconButton
          variant='text'
          size='lg'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-neutral-muted' : ''}
        >
          <BiItalic size={20} />
        </IconButton>
        <IconButton
          variant='text'
          size='lg'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'bg-neutral-muted' : ''}
        >
          <BiStrikethrough size={20} />
        </IconButton>
        <IconButton
          variant='text'
          size='lg'
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={editor.isActive('superscript') ? 'bg-neutral-muted' : ''}
        >
          <BsSuperscript size={20} />
        </IconButton>
        {/* Separator */}
        <div className='inline border-l-2 border-neutral-muted h-full'></div>
        <IconButton
          variant='text'
          size='lg'
          onClick={setLink}
          className={editor.isActive('link') ? 'bg-neutral-muted' : ''}
        >
          <LinkIcon className='h-5 w-5' />
        </IconButton>
        <IconButton
          variant='text'
          size='lg'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('orderedList') ? 'bg-neutral-muted' : ''}
        >
          <ListBulletIcon className='h-5 w-5' />
        </IconButton>
        <IconButton
          variant='text'
          size='lg'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-neutral-muted' : ''}
        >
          <AiOutlineOrderedList className='h-4 w-4' />
        </IconButton>
        {/* Separator */}
        <div className='inline border-l-2 border-neutral-muted h-full'></div>
        <IconButton
          variant='text'
          size='lg'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-neutral-muted' : ''}
        >
          <BsQuote className='h-5 w-5' />
        </IconButton>
        <IconButton
          variant='text'
          size='lg'
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'bg-neutral-muted' : ''}
        >
          <CodeBracketIcon className='h-5 w-5' />
        </IconButton>
        <IconButton
          variant='text'
          size='lg'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-neutral-muted' : ''}
        >
          <CommandLineIcon className='h-5 w-5' />
        </IconButton>
      </div>
    </>
  );
};

const MenuFooter = ({
  postId,
  editor,
  openMenuBar,
  setOpenMenuBar,
  setFocused,
}: {
  postId: string;
  editor: Editor | null;
  openMenuBar: boolean;
  setOpenMenuBar: Dispatch<SetStateAction<boolean>>;
  setFocused: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const addCommentMuation = useMutation(
    (content: string) =>
      postRequest({
        endPoint: 'comments/new-comment',
        data: { id: postId, description: content },
      }),
    {
      onSuccess: () => {
        // Invalidate or refetch a query on success
        queryClient.invalidateQueries('comments');
      },
      onError: () => {
        // Perform any actions on error, like showing an error message
        console.log('Error');
      },
    }
  );

  if (!editor) {
    return null;
  }
  return (
    <>
      <div className='px-2 flex items-center justify-between'>
        <div>
          <IconButton
            variant='text'
            size='lg'
            onClick={() => {}}
            className={cn('text-neutral-900')}
          >
            <PhotoIcon className='h-5 w-5' />
          </IconButton>
          {/* <IconButton
            variant='text'
            size='lg'
            onClick={() => {}}
            className={cn('text-neutral-900')}
          >
            <GifIcon className='h-5 w-5' />
          </IconButton> */}
          <IconButton
            variant='text'
            size='lg'
            onClick={() => setOpenMenuBar((prevValue: boolean) => !prevValue)}
            className={cn(
              'text-neutral-900 ',
              'bg-transparent',
              openMenuBar && 'bg-neutral-muted'
            )}
          >
            <span className='text-lg'>T</span>
          </IconButton>
        </div>
        <div className='space-x-2'>
          <Button
            className='bg-neutral-muted text-black hover:bg-[#003e36]'
            onClick={() => setFocused((prevValue: boolean) => !prevValue)}
          >
            Cancel
          </Button>
          <Button
            className='bg-[#003e36]'
            onClick={() => {
              const html = editor.getHTML();
              console.log(html);
              addCommentMuation.mutate(html);
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default function AddComment({ postId }: { postId: string }) {
  const lowlight = createLowlight(common);
  lowlight.register({ html, css, js, ts });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-2xl',
        },
      }),
      Superscript,
      Link,
      Image,
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 ml-2 px-4 p-2',
        },
      }),
      Code.configure({
        HTMLAttributes: {
          class: 'rounded-sm bg-neutral-200 px-1',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
        HTMLAttributes: {
          class: 'rounded-sm bg-neutral-200 p-2',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc pl-5',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal pl-5',
        },
      }),
      ListItem,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    content: `
        <h1>
          Devs Just Want to Have Fun by Cyndi Lauper
        </h1>
        <p>
          I come home in the morning light<br>
          My mother says, “When you gonna live your life right?”<br>
          Oh mother dear we're not the fortunate ones<br>
          And devs, they wanna have fun<br>
          Oh devs just want to have fun</p>
        <p>

        <ul>
          <li>A list item</li>
          <li>And another one</li>
        </ul>
        <br />
        <ol>
        <li>A list item</li>
        <li>And another one</li>
        </ol>
        <br />
        <blockquote><p>asdasdsa</p><p>asdsad</p></blockquote>
      `,
  });
  const [openMenuBar, setOpenMenuBar] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <>
      {focused ? (
        <div className='border-2 border-neutral-muted rounded-3xl'>
          {openMenuBar && <MenuBar editor={editor} />}
          <EditorContent editor={editor} />
          <div>
            <MenuFooter
              postId={postId}
              editor={editor}
              openMenuBar
              setOpenMenuBar={setOpenMenuBar}
              setFocused={setFocused}
            />
          </div>
        </div>
      ) : (
        <>
          <div
            className='py-2 px-4 text-neutral-900 border-2 border-neutral-muted rounded-3xl'
            onClick={() => setFocused(true)}
          >
            Add a comment
          </div>
        </>
      )}
    </>
  );
}
