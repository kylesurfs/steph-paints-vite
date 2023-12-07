import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';
import ConfirmationModal from './ConfirmationModal';

export default function RequestForm() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleModalButtonClick = (): void => {
    closeModal();
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='space-y-12 sm:space-y-16'>
          <div>
            <h2 className='text-base font-semibold leading-7 text-gray-900 dark:text-zinc-100'>
              Request
            </h2>
            <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-600 dark:text-zinc-400'>
              This information will be shared with Stephanie.
            </p>

            <div className='mt-10 space-y-8 border-b border-gray-900/10 dark:border-gray-100/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
              <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                <label
                  htmlFor='about'
                  className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5 dark:text-zinc-100'
                >
                  Details about your request
                </label>
                <div className='mt-2 sm:col-span-2 sm:mt-0 '>
                  <textarea
                    id='about'
                    name='about'
                    rows={3}
                    className='block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 dark:text-zinc-400 dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    defaultValue={''}
                  />
                  <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-zinc-400 max-w-2xl'>
                    Write a few sentences about what you would like Steph to
                    create. It could be a drawing or a painting or even digital
                    art.
                  </p>
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                <label
                  htmlFor='uploaded-photo'
                  className='block text-sm font-medium leading-6 text-gray-900 dark:text-zinc-100 sm:pt-1.5'
                >
                  Upload photo
                </label>
                <div className='mt-2 sm:col-span-2 sm:mt-0 '>
                  <div className='flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 dark:bg-zinc-800 dark:border-gray-100/10 px-6 py-10'>
                    <div className='text-center'>
                      <PhotoIcon
                        className='mx-auto h-12 w-12 text-gray-300 dark:text-zinc-400'
                        aria-hidden='true'
                      />
                      <div className='mt-4 flex text-sm leading-6 text-gray-600 dark:text-zinc-400'>
                        <label
                          htmlFor='file-upload'
                          className='relative cursor-pointer rounded-md bg-white dark:bg-zinc-800 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                        >
                          <span>Upload a file</span>
                          <input
                            id='file-upload'
                            name='file-upload'
                            type='file'
                            className='sr-only'
                          />
                        </label>
                        <p className='pl-1'>or drag and drop</p>
                      </div>
                      <p className='text-xs leading-5 text-gray-600 dark:text-zinc-400'>
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-zinc-400'>
                    Upload one or more photos for Stephanie to work off of.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className='text-base font-semibold leading-7 text-gray-900 dark:text-zinc-100'>
              Contact Info
            </h2>
            <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-600 dark:text-zinc-400'>
              Leave contact info for Steph to confirm your request, pricing, and
              timing.
            </p>

            <div className='mt-10 space-y-8 border-b border-gray-900/10 dark:border-gray-100/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0'>
              <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium leading-6 text-gray-900 dark:text-zinc-100 sm:pt-1.5'
                >
                  First name
                </label>
                <div className='mt-2 sm:col-span-2 sm:mt-0 '>
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium leading-6 text-gray-900 dark:text-zinc-100 sm:pt-1.5'
                >
                  Last name
                </label>
                <div className='mt-2 sm:col-span-2 sm:mt-0'>
                  <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 py-1.5 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900 dark:text-zinc-100 sm:pt-1.5'
                >
                  Email address
                </label>
                <div className='mt-2 sm:col-span-2 sm:mt-0'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='button'
            onClick={() => navigate('/')}
            className='text-sm font-semibold leading-6 text-gray-900 dark:text-white'
          >
            Cancel
          </button>
          <button
            type='submit'
            // onClick= Display modal saying "Your request has been successfully submitted."
            className='inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Submit request
          </button>
        </div>
      </form>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onBtnClick={handleModalButtonClick}
          title='Request submitted'
          description='Your request has been successfully submitted and you will be navigated back to the home page.'
          btnText='Return to home'
        />
      )}
    </>
  );
}
