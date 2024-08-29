import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';

const usePageUnloadWarning = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (items.length > 0) {
        const message = 'You have items in your cart. Are you sure you want to leave?';
        e.preventDefault(); // Standard for modern browsers
        e.returnValue = message; // For most browsers
        return message; // For older browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [items]);
};

export default usePageUnloadWarning;
