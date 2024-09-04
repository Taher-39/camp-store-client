import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';

const PageReloadWarning = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);
  const [isWarningVisible, setIsWarningVisible] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (items.length > 0) {
        e.preventDefault();
        e.returnValue = 'You have items in your cart. Are you sure you want to leave?';
        setIsWarningVisible(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [items]);

  return (
    <div className="page-reload-warning" style={{ display: isWarningVisible ? 'block' : 'none' }}>
      You have items in your cart. Are you sure you want to leave?
    </div>
  );
};

export default PageReloadWarning;