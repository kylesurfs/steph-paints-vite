//== TSX Components, Functions ==//
import { Container } from './Container';

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function Logo() {
  return (
    <>
      <Container>
        <div className='mx-auto max-w-2xl pt-10 pb-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-gray-800 dark:text-gray-100'>
          <h1 className='font-bold text-5xl'>Steph</h1>
          <h1 className='font-bold text-5xl'>Paints</h1>
          <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
            I’m Steph -- an artist, surfer, and non-profit consultant from San
            Clemente, California. This site is where I post my latest projects.
            If you are interested in having me create something for you or
            someone you know, then please reach out through the "Request" page.
          </p>
        </div>
      </Container>
    </>
  );
}
