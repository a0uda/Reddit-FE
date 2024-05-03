import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Code from '@tiptap/extension-code';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';

import { common, createLowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

const lowlight = createLowlight(common);
lowlight.register({ html, css, js, ts });

export const tiptapConfig = {
  extensions: [
    StarterKit,
    Heading.configure({
      HTMLAttributes: {
        class: 'text-2xl',
      },
    }),
    Superscript,
    Link.configure({
      HTMLAttributes: {
        class: 'text-blue hover:underline',
      },
      linkOnPaste: true,
    }),
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
        'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
    },
  },
  content: ``,
};

// `
//   <h1>
//   Devs Just Want to Have Fun by Cyndi Lauper
//   </h1>
//   <p>
//   I come home in the morning light<br>
//   My mother says, “When you gonna live your life right?”<br>
//   Oh mother dear we're not the fortunate ones<br>
//   And devs, they wanna have fun<br>
//   Oh devs just want to have fun</p>
//   <p>

//   <ul>
//   <li>A list item</li>
//   <li>And another one</li>
//   </ul>
//   <br />
//   <ol>
//   <li>A list item</li>
//   <li>And another one</li>
//   </ol>
//   <br />
//   <blockquote><p>asdasdsa</p><p>asdsad</p></blockquote>
// `
