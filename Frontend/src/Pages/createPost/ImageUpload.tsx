import { ChangeEvent, useRef, useState } from 'react';
import Input from '../../Components/Input';
import RoundedButton from '../../Components/RoundedButton';

interface Image {
  id: number;
  path: string;
  caption: string;
  link: string;
  file: File;
}
type ImageUploadProps = {
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function ImageUpload({
  setFieldValue,
  images,
  setImages,
  index,
  setIndex,
}: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const uploadInput = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    console.log(selectedFiles, 'selectedfiles');

    if (selectedFiles) {
      const newFiles: File[] = Array.from(selectedFiles);
      setFiles([...files, ...newFiles]);
      console.log(files, 'files');

      const newImages: Image[] = [];
      newFiles.forEach((file) => {
        const imageUrl = URL.createObjectURL(file);
        console.log(imageUrl, 'url');

        newImages.push({
          id: index,
          path: imageUrl,
          caption: '',
          link: '',
          file: file,
        });
        setIndex((prevIndex) => prevIndex + 1);
      });

      setImages([...images, ...newImages]);
      setFieldValue('images', [
        ...images,
        ...newImages.map(({ path, caption, link }) => ({
          path,
          caption,
          link,
        })),
      ]);
    }
    console.log(images, 'imagesss');
    if (images.length > 0) {
      setSelectedImage(images[0].id);
    }
  };
  const handleCaptionChange = (index: number, newCaption: string) => {
    setImages((prevImages) => {
      return prevImages.map((image, i) => {
        if (i === index) {
          return { ...image, caption: newCaption };
        }
        return image;
      });
    });
    setFieldValue(`images[${index}].caption`, newCaption);
  };

  const handleLinkChange = (index: number, newLink: string) => {
    setImages((prevImages) => {
      return prevImages.map((image, i) => {
        if (i === index) {
          return { ...image, link: newLink };
        }
        return image;
      });
    });
    setFieldValue(`images[${index}].link`, newLink);
  };

  const handleDelete = (id: number) => {
    console.log('image ID:', id);

    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);

    if (updatedImages.length === 0) {
      setFieldValue('images', []);
    } else {
      const updatedImagesWithIndices = updatedImages.map((image, index) => ({
        ...image,
        id: index,
      }));
      console.log('updated images:', updatedImagesWithIndices);
      setFieldValue('images', updatedImagesWithIndices);
    }
  };

  return (
    <section className='w-full mx-auto mt-4 '>
      <div className=' mx-auto bg-white rounded-lg items-center'>
        <div className='border-gray-200 border-2 p-10'>
          <div className='flex overflow-x-auto space-x-2'>
            {images.map((image, ind) => (
              <div
                key={ind}
                className={`w-24 h-28 pb- rounded-lg relative ${selectedImage === image.id ? 'border-2 border-black p-2' : ''}`}
                onClick={() =>
                  setSelectedImage((prevSelectedImage) =>
                    prevSelectedImage === image.id ? null : image.id
                  )
                }
                style={{ flex: '0 0 100px' }}
              >
                <img
                  src={image.path}
                  className={`w-24 mb-2 h-full rounded-lg object-cover ${selectedImage !== image.id ? 'filter blur-custom' : ''}`}
                  alt='Image preview'
                />
                {selectedImage === image.id && (
                  <button
                    className='absolute top-2 right-2 bg-black text-white rounded-full p-1 focus:outline-none'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(image.id);
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-4 h-4'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}

            {images.length > 0 ? (
              <label
                htmlFor='upload'
                className='border border-dashed border-gray-500 items-center p-10 cursor-pointer'
              >
                <input
                  id='upload'
                  type='file'
                  className='hidden'
                  accept='image/*'
                  multiple
                  onChange={handleFileChange}
                />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4.5v15m7.5-7.5h-15'
                  />
                </svg>
              </label>
            ) : null}
          </div>

          {images.length < 1 ? (
            <div className='p-6 md:p-12 lg:p-24 flex flex-col items-center mx-auto text-center'>
              <input
                ref={uploadInput}
                id='upload'
                type='file'
                className='hidden'
                accept='image/*'
                multiple
                onChange={handleFileChange}
              />
              <label htmlFor='upload' className='cursor-pointer'>
                <h5 className='mb-2 text-lg md:text-xl lg:text-2xl tracking-tight text-blue-light'>
                  Drag and drop image or{' '}
                  <span className='md:ms-2'>
                    <RoundedButton
                      buttonBorderColor='border-blue-light'
                      buttonColor='bg-white'
                      buttonText='Upload'
                      buttonTextColor='text-blue-light'
                      onClick={() => uploadInput.current?.click()}
                    />
                  </span>
                </h5>
              </label>
            </div>
          ) : null}

          {selectedImage !== null &&
            images.find((image) => image.id === selectedImage) != undefined && (
              <div className='mt-10 flex flex-col sm:flex-row'>
                <div className='w-full sm:w-96 h-64 bg-gray-200 flex items-center justify-center'>
                  <img
                    src={
                      images.find((image) => image.id === selectedImage)
                        ?.path ?? ''
                    }
                    className='w-32 h-32 sm:w-full sm:h-full rounded-lg object-cover'
                    alt='Selected image'
                  />
                </div>
                <div className='w-full sm:ml-4 mt-2'>
                  <Input
                    className='h-20 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)]'
                    placeholder='Add Caption...'
                    type='text'
                    NoCheck={true}
                    value={images[selectedImage]?.caption}
                    onChange={(event) =>
                      handleCaptionChange(selectedImage, event.target.value)
                    }
                  />
                  <Input
                    className='h-20 placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 !border !border-t-[rgb(176,190,197)]'
                    placeholder='Add Link...'
                    type='text'
                    value={images[selectedImage]?.link}
                    NoCheck={true}
                    onChange={(event) =>
                      handleLinkChange(selectedImage, event.target.value)
                    }
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
