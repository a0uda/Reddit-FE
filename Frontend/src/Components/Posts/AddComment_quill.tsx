import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddComment = ({ postId }: { postId: string }) => {
  //   const [comment, setComment] = useState('');

  //   const handleCommentChange = (value: string) => {
  //     setComment(value);
  //   };

  const [editorHtml, setEditorHtml] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleEditorChange = (html: string) => {
    const cleanText =
      new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
    setEditorHtml(html);
    setDescription(cleanText);
    console.log(description);
  };

  return (
    <>
      <div className='my-5 h-52 pb-10'>
        <ReactQuill
          theme='snow'
          value={editorHtml}
          onChange={handleEditorChange}
          className='w-full h-full rounded-md border border-gray-300 p-2'
          placeholder='Text (optional)'
        />
      </div>
    </>
  );
};

export default AddComment;
