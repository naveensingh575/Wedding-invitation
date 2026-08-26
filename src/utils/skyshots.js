import confetti from 'canvas-confetti';

/**
 * Launch Vibrant Royal Blue & Gold "SKY SHOT" Fireworks Explosion
 * Rockets shoot up from the bottom of the webpage into the hero banner,
 * exploding into sparkling light rays and golden glitter trails across the screen.
 */
export function triggerSkyShotFireworks() {
  const blueGoldPalette = [
    '#0055FF', // Vibrant Royal Blue
    '#0099FF', // Electric Sky Blue
    '#FFD700', // Sparkling Pure Gold
    '#FFA500', // Deep Warm Amber Gold
    '#FFF8DC', // Creamy White Light
    '#E0F7FA', // Diamond Light Glow
    '#FFC0CB', // Subtle Rose Accent
  ];

  const duration = 7 * 1000;
  const animationEnd = Date.now() + duration;

  // Helper to fire a sky shot rocket from bottom (y=1.0) upward into the hero banner
  const fireSkyShotRocket = (originX, delayMs) => {
    setTimeout(() => {
      // 1. Initial High-Speed Rocket Trail soaring from bottom (y=1.0)
      confetti({
        particleCount: 75,
        startVelocity: 70,
        spread: 35,
        angle: 90, // Direct vertical launch into hero banner
        origin: { x: originX, y: 1.0 },
        colors: blueGoldPalette,
        shapes: ['circle', 'star'],
        ticks: 140,
        gravity: 0.8,
        scalar: 1.25,
        drift: (Math.random() - 0.5) * 0.3,
        zIndex: 99999,
      });

      // 2. High Sky Explosion Burst across the Hero Banner (y=0.25)
      setTimeout(() => {
        confetti({
          particleCount: 130,
          startVelocity: 50,
          spread: 360,
          origin: { x: originX, y: 0.25 },
          colors: ['#FFD700', '#0055FF', '#0099FF', '#FFFFFF', '#FFA500', '#FFF5C0'],
          shapes: ['star', 'circle'],
          ticks: 220,
          gravity: 0.55,
          scalar: 1.45,
          zIndex: 99999,
        });

        // 3. Shimmering Golden Glitter Falling Shower
        confetti({
          particleCount: 60,
          startVelocity: 25,
          spread: 180,
          angle: 270, // Falling downward glitter
          origin: { x: originX, y: 0.25 },
          colors: ['#FFD700', '#FFF8DC', '#FFA500'],
          shapes: ['circle'],
          ticks: 260,
          gravity: 0.4,
          scalar: 0.9,
          drift: (Math.random() - 0.5) * 0.6,
          zIndex: 99999,
        });
      }, 420);
    }, delayMs);
  };

  // Launch Staggered Sky Shot Rockets from Bottom Left, Center, and Right
  fireSkyShotRocket(0.2, 0);    // Bottom-Left Launch
  fireSkyShotRocket(0.5, 300);  // Bottom-Center Launch
  fireSkyShotRocket(0.8, 600);  // Bottom-Right Launch
  fireSkyShotRocket(0.35, 1200); // Mid-Left Secondary
  fireSkyShotRocket(0.65, 1500); // Mid-Right Secondary

  // Continuous Sky Shot Rockets Stream for 7 Seconds
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const randomX = 0.15 + Math.random() * 0.7;
    // Rocket stream from bottom
    confetti({
      particleCount: 45,
      startVelocity: 60,
      spread: 50,
      angle: 85 + Math.random() * 10,
      origin: { x: randomX, y: 1.0 },
      colors: blueGoldPalette,
      shapes: ['star', 'circle'],
      ticks: 150,
      gravity: 0.7,
      scalar: 1.2,
      zIndex: 99999,
    });
  }, 400);
}
