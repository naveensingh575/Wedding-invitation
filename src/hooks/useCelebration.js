import { useCelebrationContext } from '../context/CelebrationContext';

/**
 * Custom Hook to access celebration skyshot fireworks trigger from any component.
 * Usage:
 *   const { triggerCelebration, isCelebrating } = useCelebration();
 */
export function useCelebration() {
  return useCelebrationContext();
}
export default useCelebration;
