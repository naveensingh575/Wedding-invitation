import React, { createContext, useContext, useState, useCallback } from 'react';

const CelebrationContext = createContext({
  triggerSkyshots: () => {},
  triggerCelebration: () => {},
  isCelebrating: false,
  celebrationId: 0,
});

export const CelebrationProvider = ({ children }) => {
  const [celebrationId, setCelebrationId] = useState(0);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const triggerSkyshots = useCallback(() => {
    setCelebrationId((prev) => prev + 1);
    setIsCelebrating(true);

    setTimeout(() => {
      setIsCelebrating(false);
    }, 7000);
  }, []);

  return (
    <CelebrationContext.Provider
      value={{
        triggerSkyshots,
        triggerCelebration: triggerSkyshots,
        isCelebrating,
        celebrationId,
      }}
    >
      {children}
    </CelebrationContext.Provider>
  );
};

export const useCelebrationContext = () => useContext(CelebrationContext);
