//== react, react-router-dom, Auth0 ==//
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

//-- NPM imports --//
import axios from 'axios';
import { square } from 'ldrs'; //-- Custom loader imported from ldrs (https://uiball.com/ldrs/) --//
square.register();

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function NotFoundPage() {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  //-- Fetch image of randomAnimal from S3 bucket --//
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          'https://steph-paints-art-pics.s3.amazonaws.com/notFoundImage.jpeg',
          {
            responseType: 'blob',
          }
        );
        const imageBlob: Blob = await response.data;
        const imageURL: string = URL.createObjectURL(imageBlob);
        setImageSrc(imageURL);
        setImageLoaded(true);
      } catch (err) {}
    };
    fetchImage();
  }, []);

  //== Handlers ==//
  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  //== ***** ***** ***** Component Return ***** ***** ***** ==//
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className='relative isolate h-screen'>
        {imageLoaded ? (
          <>
            <img
              src={imageSrc}
              alt=''
              className='absolute inset-0 -z-10 h-full w-full object-cover object-top'
            />
          </>
        ) : (
          //insert loader from form submission
          <div className='flex justify-center items-center'>
            <l-square color='teal'></l-square>
          </div>
        )}
        <div className='mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8'>
          <p className='text-base font-semibold leading-8 text-white'>404</p>
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl'>
            Page not found
          </h1>
          <p className='mt-4 text-base text-white/70 sm:mt-6'>
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className='mt-10 flex justify-center'>
            <NavLink
              to='/'
              onClick={handleClick}
              className='text-sm font-semibold leading-7 text-white'
            >
              <span aria-hidden='true'>&larr;</span> Back to home
            </NavLink>
          </div>
        </div>
      </main>
    </>
  );
}
