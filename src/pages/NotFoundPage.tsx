import { NavLink } from 'react-router-dom';
import notFoundImage from '../images/notFoundImage.png';

export default function NotFoundPage() {
  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

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
        <img
          //   src='https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75'
          src={notFoundImage}
          alt=''
          className='absolute inset-0 -z-10 h-full w-full object-cover object-top'
        />
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
