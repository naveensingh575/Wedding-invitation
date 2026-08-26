import { useCelebrationContext } from '../context/CelebrationContext';

/**
 * Custom Hook to trigger pure bright white Skyshots fireworks animation globally.
 * Usage:
 *   const { triggerSkyshots, triggerCelebration } = useCelebration();
 */
export function useCelebration() {
  const context = useCelebrationContext();
  return {
    ...context,
    triggerSkyshots: context.triggerSkyshots || context.triggerCelebration,
  };
}

export default useCelebration;
