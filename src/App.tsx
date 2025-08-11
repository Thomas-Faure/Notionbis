import React from 'react';
import { PhaserGame } from './components/PhaserGame';
import { buildScenesArray } from './game';

/**
 * The main application component for the Pokémon‑like prototype.
 * It constructs the necessary scenes for Phaser and passes them
 * along with other configuration options to the PhaserGame
 * component.  React handles the surrounding layout and any
 * additional UI elements.
 */
export const App: React.FC = () => {
  const scenesArray = buildScenesArray({ worldSize: { width: 1600, height: 1200 }, playerSpeed: 120 });
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Prototype Pokémon‑like 2D</h1>
      <PhaserGame
        createConfigs={{
          parentElementId: 'phaser-root',
          scenesArray,
          backgroundColor: '#0b1020',
          pixelArt: true,
        }}
      />
      <p className="text-sm opacity-80">Étape 1 : déplacement et caméra.</p>
    </div>
  );
};

export default App;
