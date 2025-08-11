import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

/**
 * Configuration for creating a Phaser game instance.  This object
 * encapsulates all adjustable settings such as the parent element
 * identifier, the collection of scenes to register, and a few
 * rendering options.  Providing a single argument simplifies
 * consumption and aligns with the prescribed coding style.
 */
export type CreatePhaserGameConfigs = {
  parentElementId: string;
  scenesArray: Phaser.Types.Scenes.CreateSceneFromObjectConfig[];
  backgroundColor?: string;
  pixelArt?: boolean;
};

/**
 * Builds and returns a Phaser.Game instance using the given
 * configuration.  Physics is enabled by default with an Arcade
 * engine that has no gravity.  The returned game handles its own
 * lifecycle; call `.destroy(true)` on the instance to free
 * resources.  This function is pure and free of side effects
 * other than creating the game.
 */
export const createPhaserGame = (
  createPhaserGameConfigs: CreatePhaserGameConfigs,
): Phaser.Game => {
  const { parentElementId, scenesArray, backgroundColor, pixelArt } = createPhaserGameConfigs;
  const physicsEnabled = true;
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: parentElementId,
    backgroundColor: backgroundColor ?? '#0d1117',
    pixelArt: pixelArt ?? true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600,
    },
    physics: physicsEnabled
      ? {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
          },
        }
      : undefined,
    scene: scenesArray,
  };
  return new Phaser.Game(config);
};

/**
 * Props for the `PhaserGame` React component.  Supply the
 * configuration for creating the game via `createConfigs`.
 */
export type PhaserGameComponentProps = {
  createConfigs: CreatePhaserGameConfigs;
};

/**
 * React component responsible for mounting a Phaser game in a DOM
 * element.  When the component mounts, it calls
 * `createPhaserGame` with the provided configuration and cleans up
 * on unmount by destroying the game.  The container div must have
 * an id matching `createConfigs.parentElementId` to allow Phaser
 * to mount correctly.
 */
export const PhaserGame: React.FC<PhaserGameComponentProps> = ({ createConfigs }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (containerRef.current === null) return;
    const game = createPhaserGame(createConfigs);
    const cleanup = async (): Promise<void> => {
      await game.destroy(true);
    };
    return () => {
      void cleanup();
    };
  }, [createConfigs]);
  return <div id={createConfigs.parentElementId} ref={containerRef} className="w-full h-[600px]" />;
};
