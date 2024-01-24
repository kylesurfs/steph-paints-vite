//== react, react-router-dom, Auth0 ==//
import { Fragment, useEffect, useRef } from 'react';

//== NPM Components ==//
import { Dialog, Transition } from '@headlessui/react';

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
import { ModalWithImageProps } from '../types';

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function ModalWithImage({
  isOpen,
  setIsOpen,
  title,
  description,
  btnText,
  onBtnClick,
  imageURL,
  imageOrientation,
}: ModalWithImageProps) {
  // DEV -- w/o this the page auto-scrolls to the top when the modal opens
  const modalRef = useRef(null);

  // Effect to manage scroll position
  useEffect(() => {
    if (isOpen) {
      // Record the current scroll position
      const scrollY = window.scrollY;

      // Apply a fixed position to your body or main container to prevent background scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;

      // Optional: Apply additional styling as necessary to prevent width changes
      // document.body.style.width = '100%';

      return () => {
        // Remove the fixed position and reset scroll position when modal closes
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      };
    }
  }, [isOpen]);

  // Call this function to close the modal and reset the body styles
  const closeModal = () => {
    setIsOpen(false); // This will set isOpen to false
    if (onBtnClick) {
      onBtnClick(); // Only call if onBtnClick is defined
    }
  };

  // Determine modal size class based on image orientation
  const modalSizeClass =
    imageOrientation === 'vertical'
      ? 'w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl max-h-4/5' // Allow the modal to be taller on the screen
      : // ? 'max-w-4xl h-5/6' // Use larger width and more height for vertical images
      // ? 'max-w-xl max-h-full'
      imageOrientation === 'horizontal'
      ? 'max-w-3xl max-h-screen'
      : 'max-w-xl'; // default for square or unknown orientation

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        // onClose={() => setIsOpen(false)}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-800'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-800'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-800'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-800'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel
                ref={modalRef}
                className={`relative transform overflow-hidden rounded-lg bg-white dark:bg-zinc-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full ${modalSizeClass} sm:p-6`}
              >
                <div>
                  <div className='mx-auto flex items-center justify-center rounded-full'>
                    <img
                      src={imageURL}
                      alt={title}
                      className={`rounded-t-lg w-full ${
                        imageOrientation === 'vertical'
                          ? 'max-h-3/4'
                          : 'max-h-full'
                      } object-cover`}
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-base font-semibold leading-6 text-gray-900 dark:text-white'
                    >
                      {title}
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
                    onClick={onBtnClick}
                    // Should be customizeable actions -- like navigate("/")
                  >
                    {btnText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
