//== TSX Components, Functions ==//
import { Container } from './Container';
import ErrorMessage from './UI/ErrorMessage';

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function SearchNotFound() {
  return (
    <>
      <Container>
        <ErrorMessage
          textClassName='text-teal-800'
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
