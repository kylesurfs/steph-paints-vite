//== TSX Components, Functions ==//
import { Container } from '../components/Container';
import CustomerRequests from '../components/CustomerRequests';

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function About() {
  //== ***** ***** ***** Component Return ***** ***** ***** ==//
  return (
    <>
      <div className='dark:bg-zinc-900'>
        <Container className=' dark:bg-zinc-900 py-8 flex flex-1'>
          <div className='gap-y-16 dark:bg-zinc-900'>
            <div className='lg:pl-20'>
              <div className='max-w-xs px-2.5 lg:max-w-none'>
                <CustomerRequests />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
