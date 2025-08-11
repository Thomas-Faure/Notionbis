import Phaser from 'phaser';
import { createStream, type Stream } from './streams';

/**
 * Configuration for the overworld scene.  Contains the key used to
 * register the scene with Phaser, the world dimensions and the
 * base speed of the player character.  Additional options can
 * easily be added without altering the function signature.
 */
export type OverworldSceneConfigs = {
  sceneKey: string;
  worldSize: { width: number; height: number };
  playerSpeed: number;
};

/**
 * Factory function creating a Phaser scene configuration object for
 * an overworld.  The scene uses a functional style: it avoids
 * classes and stores minimal state on the Phaser scene instance.
 * Movement is driven by a Stream of direction vectors, which
 * decouples input handling from velocity updates.
 */
export const createOverworldScene = (
  overworldSceneConfigs: OverworldSceneConfigs,
): Phaser.Types.Scenes.CreateSceneFromObjectConfig => {
  const { sceneKey, worldSize, playerSpeed } = overworldSceneConfigs;

  type Direction = { x: number; y: number };
  const directionStream: Stream<Direction> = createStream<Direction>({ initialValue: { x: 0, y: 0 } });

  const key = sceneKey;
    const tileSize = 16;
  let lastTile: { x: number; y: number } = { x: -1, y: -1 };
  let stepsCount = 0;


  const preload = function (this: Phaser.Scene): void {
    // Assets can be loaded here when available.
  };

  const create = function (this: Phaser.Scene): void {
    // Set world and camera bounds
    this.cameras.main.setBounds(0, 0, worldSize.width, worldSize.height);
    this.physics.world.setBounds(0, 0, worldSize.width, worldSize.height);

    // Create a player as a simple rectangle for now
    const playerSize = 16;
    const graphics = this.add.rectangle(100, 100, playerSize, playerSize, 0x3b82f6);
    const player = this.physics.add.existing(graphics, false) as Phaser.Physics.Arcade.Image;
    player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player);

    // Cursor input
    const cursorKeys = this.input.keyboard?.createCursorKeys();
    (this as any).__cursorKeys = cursorKeys;
    (this as any).__player = player;

    // Subscribe to direction changes and apply velocity accordingly
    directionStream.subscribe({
      listener: (dir) => {
        const vector = new Phaser.Math.Vector2(dir.x, dir.y).normalize();
        const vx = vector.x * playerSpeed;
        const vy = vector.y * playerSpeed;
        player.setVelocity(vx, vy);
      },
    });

    // Display a simple HUD message
    this.add
      .text(10, 10, 'Utilisez les flèches du clavier pour vous déplacer', { fontSize: '14px' })
      .setScrollFactor(0)
      .setDepth(1000);
  };

  const update = function (this: Phaser.Scene): void {
    const cursorKeys = (this as any).__cursorKeys as Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    if (!cursorKeys) return;
    const left = Boolean(cursorKeys.left?.isDown);
    const right = Boolean(cursorKeys.right?.isDown);
    const up = Boolean(cursorKeys.up?.isDown);
    const down = Boolean(cursorKeys.down?.isDown);
    const horizontal = (left ? -1 : 0) + (right ? 1 : 0);
    const vertical = (up ? -1 : 0) + (down ? 1 : 0);
    directionStream.push({ value: { x: horizontal, y: vertical } });
      const playerObj = (this as any).__player as Phaser.Physics.Arcade.Image;
  if (playerObj) {
    const tileX = Math.floor(playerObj.x / tileSize);
    const tileY = Math.floor(playerObj.y / tileSize);
    if (tileX !== lastTile.x || tileY !== lastTile.y) {
      stepsCount++;
      lastTile = { x: tileX, y: tileY };
      if (stepsCount % 50 === 0) {
        const msg = this.add.text(10, 40, `Vous avez marché ${stepsCount} pas!`, { fontSize: '14px', color: '#ffffff' })
          .setScrollFactor(0)
          .setDepth(1000);
        this.time.delayedCall(2000, () => { msg.destroy(); }, [], this);
      }
    }
  }

  };

  return { key, preload, create, update };
};
