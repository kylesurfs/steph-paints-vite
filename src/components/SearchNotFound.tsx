import { Container } from './Container';
import ErrorMessage from './ErrorMessage';

export default function SearchNotFound() {
  return (
    <>
      <Container>
        {/* <div className='mx-auto max-w-2xl pt-10 pb-4 px-4 sm:px-6 lg:max-w-7xl text-black dark:text-white'>
          <h1 className='font-bold text-5xl'>Coming soon</h1>
          <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
            These items haven't been completed yet. Please check here again
            soon, or submit a request if you have something in particular you
            are looking for.
          </p>
        </div> */}
        <ErrorMessage
          title='Coming soon'
          message="These items haven't been completed yet. Please check here again
            soon, or submit a request if you have something in particular you
            are looking for."
          className='w-full'
        />
      </Container>
    </>
  );
}
