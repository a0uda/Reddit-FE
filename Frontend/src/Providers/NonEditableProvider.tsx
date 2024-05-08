import { EditorContent, useEditor } from '@tiptap/react';
import { tiptapConfig } from '../utils/tiptap_config';

const NonEditableProvider = ({ content }: { content?: string }) => {
  const editable = false;
  const editor = useEditor({
    ...tiptapConfig,
    editable,
    content: content || '',
  });

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};

export default NonEditableProvider;
