import Phaser from 'phaser';
import { createOverworldScene, type OverworldSceneConfigs } from './overworldScene';

/**
 * Configuration for building the array of scenes for the game.  At
 * present only the overworld is included, but adding more scenes
 * becomes trivial because they are just appended to the array.  A
 * single configuration object makes extension easy while adhering
 * to the coding guidelines.
 */
export type BuildScenesConfigs = {
  worldSize: { width: number; height: number };
  playerSpeed: number;
};

/**
 * Constructs an array of Phaser scene configurations based on the
 * provided settings.  Each scene is created via its factory
 * function, which returns a plain object representing the scene.
 */
export const buildScenesArray = (
  buildScenesConfigs: BuildScenesConfigs,
): Phaser.Types.Scenes.CreateSceneFromObjectConfig[] => {
  const overworldConfigs: OverworldSceneConfigs = {
    sceneKey: 'overworld',
    worldSize: buildScenesConfigs.worldSize,
    playerSpeed: buildScenesConfigs.playerSpeed,
  };
  const scenesArray = [createOverworldScene(overworldConfigs)];
  return scenesArray;
};
