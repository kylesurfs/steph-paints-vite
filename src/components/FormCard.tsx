//== TSX Components, Functions ==//
import RequestForm from './RequestForm';

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function FormCard() {
  return (
    <>
      <div className='p-8 dark:text-zinc-100 dark:bg-zinc-900'>
        <RequestForm />
      </div>
    </>
  );
}
