//== react, react-router-dom, Auth0 ==//
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//== TSX Components, Functions ==//
import ConfirmationModal from './ConfirmationModal';
import ErrorMessage from './UI/ErrorMessage';
import { Container } from './Container';

//== Icons ==//
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useRequestsContext } from '../hooks/useRequestsContext';

//-- NPM Functions --//
// import axios from 'axios';

//== Environment Variables, TypeScript Interfaces, Data Objects ==//
type FormData = {
  about: string;
  firstName: string;
  lastName: string;
  email: string;
  file?: File | null;
};

type FormErrors = {
  about?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
};

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function RequestForm() {
  //== React State, Custom Hooks ==//
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useRequestsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    about: '',
    firstName: '',
    lastName: '',
    email: '',
    // file: null,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  // Add a new state for display values, so they can be cleared if the ConfirmationModal is closed
  const [displayValues, setDisplayValues] = useState<FormData>({
    about: '',
    firstName: '',
    lastName: '',
    email: '',
    // file: null,
  });
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

  //== Side Effects ==//
  useEffect(() => {
    // If the pathname changes, scroll to the top of the page
    window.scrollTo(0, 0);
  }, [location.pathname]);

  //== Handlers ==//
  const handleCancelForm = () => {
    navigate('/');
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  //-- Input change handlers --//
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    // Update display values
    setDisplayValues({
      ...displayValues,
      [name]: value,
    });

    // Type guard to check if a key is a keyof FormErrors
    function isKeyOfFormErrors(key: any): key is keyof FormErrors {
      return key in formErrors;
    }

    // Check if the name is a valid key of FormErrors and if there's an error for this field
    if (isKeyOfFormErrors(name) && formErrors[name]) {
      // Clear the error for this field
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setFileUploadError('Try uploading a file < 10MB.');
    } else {
      setFileUploadError(null);
      setDisplayValues({ ...displayValues, file });
      setFormData({ ...formData, file });
    }
  };

  //-- Form input validation handling --//

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!displayValues.about)
      errors.about = 'Please provide details about your request.';
    if (!displayValues.firstName) errors.firstName = 'First name is required.';
    if (!displayValues.lastName) errors.lastName = 'Last name is required.';
    if (!displayValues.email) {
      errors.email = 'Email is required.';
      // } else if (!validateEmail(displayValues.email)) {
      //   errors.email = 'Please enter a valid email address.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //-- Submission handling --//

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!validateForm()) return;

    // DEV -- BEFORE AXIOS
    setFormData(displayValues);

    console.log(displayValues); // DEV -- Replace this with submission logic
    console.log(JSON.stringify(displayValues));

    // DEV -- (WIP) NetNinja-type POST handling
    const response = await fetch('/api/requests', {
      method: 'POST',
      body: JSON.stringify(displayValues), // DEV -- not sure why this needs to be displayValues instead of formData, but formData doesn't work
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setFormErrors(json.error);
      console.log(formErrors);
    }

    if (response.ok) {
      console.log('New submission added to db');
      dispatch({ type: 'CREATE_REQUEST', payload: json });
    }

    setIsModalOpen(true);

    // DEV -- Trying Axios code to PUT object into S3
    //   const formData = new FormData();
    //   formData.append('about', displayValues.about);
    //   formData.append('firstName', displayValues.firstName);
    //   formData.append('lastName', displayValues.lastName);
    //   formData.append('email', displayValues.email);

    //   if (displayValues.file) {
    //     formData.append('file-upload', displayValues.file);
    //   }

    //   try {
    //     const response = await axios.post('/api/posts', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });

    //     if (response.status === 201) {
    //       // Handle success (e.g., show confirmation, clear form)
    //       setIsModalOpen(true);
    //       // Reset form and display values
    //       setFormData({
    //         about: '',
    //         firstName: '',
    //         lastName: '',
    //         email: '',
    //         file: null,
    //       });
    //       setDisplayValues({
    //         about: '',
    //         firstName: '',
    //         lastName: '',
    //         email: '',
    //         file: null,
    //       });
    //     }
    //   } catch (error) {
    //     // Handle error (e.g., show error message)
    //     console.error('There was an error uploading the file:', error);
    //   }
  };

  //-- Modal handling --//
  const closeModal = (): void => {
    setIsModalOpen(false);
    setDisplayValues({
      about: '',
      firstName: '',
      lastName: '',
      email: '',
    });
  };

  const handleModalButtonClick = (): void => {
    // Close the modal and then navigate after state has been updated
    setIsModalOpen(false);
    // After the state is updated and the modal is closed, navigate to the home page
    setTimeout(() => {
      navigate('/');
      // After navigating, scroll to the top of the page
      window.scrollTo(0, 0);
    }, 0);
  };

  return (
    <>
      <Container>
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
                      rows={9}
                      className={`block w-full max-w-2xl rounded-md border-0 py-1.5 dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-teal-600 text-sm sm:leading-6 
                    ${
                      formErrors.about
                        ? ' placeholder:text-red-600 dark:placeholder:text-red-400 text-sm ring-red-400'
                        : 'text-gray-900 dark:text-zinc-400 placeholder:text-gray-400'
                    }`}
                      value={displayValues.about}
                      onChange={handleInputChange}
                      placeholder={formErrors.about || ''}
                    />
                    <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-zinc-400 max-w-2xl'>
                      Write a few sentences about what you would like Steph to
                      create. It could be a drawing or a painting or even
                      digital art.
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
                        <div className='mt-4 flex flex-col md:flex-row text-sm leading-6 text-gray-600 dark:text-zinc-400 mx-12'>
                          <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer rounded-md bg-white dark:bg-zinc-800 font-semibold text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-600 focus-within:ring-offset-2 hover:text-teal-500'
                          >
                            <span>Upload a file</span>
                            {/* TODO -- THIS INPUT WILL USE THE EXPRESS SERVER TO SEND TO S3 */}
                            <input
                              id='file-upload'
                              name='file-upload'
                              type='file'
                              className='sr-only'
                              onChange={handleFileChange}
                              accept='image/*'
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs font-light pt-2 leading-5 text-gray-600 dark:text-zinc-400'>
                          PNG, JPG, GIF up to 10MB
                        </p>
                        <div className='text-left'>
                          {fileUploadError && (
                            <ErrorMessage
                              title='File too large.'
                              message='Try uploading a file < 10MB.'
                            />
                          )}
                        </div>
                        {!fileUploadError && formData.file && (
                          <div className='mt-4 flex leading-6 text-gray-600 dark:text-zinc-400 mx-14'>
                            <span className='text-green-200 text-sm bg-green-800 rounded-lg border border-green-800 px-2'>
                              File uploaded successfully
                            </span>
                          </div>
                        )}
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
                Leave contact info for Steph to confirm your request, pricing,
                and timing.
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
                      name='firstName'
                      id='first-name'
                      autoComplete='given-name'
                      className={`block w-full rounded-md border-0 py-1.5 dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-md sm:text-sm sm:leading-6 
                    ${
                      formErrors.firstName
                        ? ' placeholder:text-red-600 dark:placeholder:text-red-400 text-sm ring-red-400'
                        : 'text-gray-900 dark:text-zinc-400 placeholder:text-gray-400'
                    }`}
                      value={displayValues.firstName}
                      onChange={handleInputChange}
                      placeholder={formErrors.firstName || ''}
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
                      name='lastName'
                      id='last-name'
                      autoComplete='family-name'
                      className={`block w-full rounded-md border-0 py-1.5 dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-md sm:text-sm sm:leading-6 
                    ${
                      formErrors.lastName
                        ? ' placeholder:text-red-600 dark:placeholder:text-red-400 text-sm ring-red-400'
                        : 'text-gray-900 dark:text-zinc-400 placeholder:text-gray-400'
                    }`}
                      value={displayValues.lastName}
                      onChange={handleInputChange}
                      placeholder={formErrors.lastName || ''}
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
                      className={`block w-full rounded-md border-0 py-1.5 dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-md sm:text-sm sm:leading-6 
                    ${
                      formErrors.email
                        ? ' placeholder:text-red-600 dark:placeholder:text-red-400 text-sm ring-red-400'
                        : 'text-gray-900 dark:text-zinc-400 placeholder:text-gray-400'
                    }`}
                      value={displayValues.email}
                      onChange={handleInputChange}
                      placeholder={formErrors.email || ''}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <button
              type='button'
              // onClick={() => navigate('/')}
              onClick={handleCancelForm}
              className='text-sm font-semibold leading-6 text-gray-900 dark:text-white'
            >
              Cancel
            </button>
            <button
              type='submit'
              // onClick= Display modal saying "Your request has been successfully submitted."
              className='inline-flex justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600'
            >
              Submit request
            </button>
          </div>
          {/* Display error message if there are any errors in formErrors */}
          {Object.keys(formErrors).length > 0 && (
            <ErrorMessage
              title="Let's try that again"
              message='One or more inputs has an error.'
              className='w-full'
            />
          )}
        </form>
      </Container>
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
