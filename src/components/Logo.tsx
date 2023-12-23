import { Container } from './Container';

export default function Logo() {
  return (
    <>
      <Container>
        <div className='mx-auto max-w-2xl pt-10 pb-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-black dark:text-white'>
          <h1 className='font-bold text-5xl'>Steph</h1>
          <h1 className='font-bold text-5xl'>Paints</h1>
          <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
            I’m Steph, an artist, surfer, and non-profit consultant from San
            Clemente, California. This site is where I keep a record of my
            latest projects -- both completed and active. If you are interested
            in having me create something for you or someone you know, then
            please reach out through the "Contact" page.
          </p>
        </div>
      </Container>
    </>
  );
}
