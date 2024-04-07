import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ setFieldValue }) => {
  const [editorHtml, setEditorHtml] = useState<string>('');

  const handleEditorChange = (html: string) => {
    const cleanText =
      new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
    setEditorHtml(html);
    setFieldValue('description', cleanText);
  };

  return (
    <>
      <div className='flex flex-col'>
        <div className='w-full sm:w-full md:w-full lg:w-full xl:w-full'>
          <ReactQuill
            theme='snow'
            value={editorHtml}
            onChange={handleEditorChange}
            className='w-full h-40 sm:h-64 md:h-40 lg:h-144 xl:h-160'
          />
        </div>
      </div>
    </>
  );
};

export default TextEditor;
