import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='backButtonDiv'>
        <button className='backButton' onClick={handleBack}>X</button>
    </div>
  );
};

export default BackButton;