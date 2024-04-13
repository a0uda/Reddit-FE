import { useEditor, EditorContent, Editor } from '@tiptap/react';

import { Button, IconButton, Typography } from '@material-tailwind/react';
import { BiBold, BiHeading, BiItalic, BiStrikethrough } from 'react-icons/bi';
import { BsQuote, BsSuperscript } from 'react-icons/bs';
import { cn } from '../../utils/helper_functions';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
  CodeBracketIcon,
  CommandLineIcon,
  ExclamationCircleIcon,
  LinkIcon,
  ListBulletIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query';
import { postRequest } from '../../API/User';
import { tiptapConfig } from '../../utils/tiptap_config';

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
  setError,
}: {
  postId: string;
  editor: Editor | null;
  openMenuBar: boolean;
  setOpenMenuBar: Dispatch<SetStateAction<boolean>>;
  setFocused: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
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
              if (editor.getText().length === 0) {
                setError('The field is required and cannot be empty');
                return;
              }
              const html = editor.getHTML();
              console.log(html);
              addCommentMuation.mutate(html);
              setFocused(false);
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
  const editor = useEditor({
    ...tiptapConfig,
    onUpdate() {
      setError('');
    },
  });
  const [openMenuBar, setOpenMenuBar] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const [error, setError] = useState('');

  return (
    <>
      {focused ? (
        <>
          <div
            className={cn(
              'border-2 border-neutral-muted rounded-3xl',
              error.length > 0 && 'border-orange-red'
            )}
          >
            {openMenuBar && <MenuBar editor={editor} />}
            <div className='p-5'>
              <EditorContent editor={editor} />
            </div>
            <div>
              <MenuFooter
                postId={postId}
                editor={editor}
                openMenuBar
                setOpenMenuBar={setOpenMenuBar}
                setFocused={setFocused}
                setError={setError}
              />
            </div>
          </div>
          {error.length > 0 && (
            <>
              <Typography
                variant='paragraph'
                className='flex items-center gap-2 text-orange-red'
              >
                <ExclamationCircleIcon className='h-5 w-5' />
                The field is required and cannot be empty
              </Typography>
            </>
          )}
        </>
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
