import { Container } from './Container';

export default function SearchNotFound() {
  return (
    <>
      <Container>
        <div className='mx-auto max-w-2xl pt-10 pb-4 px-4 sm:px-6 lg:max-w-7xl text-black dark:text-white'>
          <h1 className='font-bold text-5xl'>No results found</h1>
          <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
            We can’t find anything with that term at the moment, try searching
            something else.
          </p>
        </div>
      </Container>
    </>
  );
}
