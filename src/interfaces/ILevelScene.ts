import Phaser from 'phaser';

export default interface ILevelScene extends Phaser.Scene { 
    pinkBall: Phaser.Physics.Matter.Image;
	blueBall: Phaser.Physics.Matter.Image;
	graphics: Phaser.GameObjects.Graphics;
	draws: Phaser.Physics.Matter.Sprite[][];
	path: Phaser.Curves.Path | null;
	isCompleted: boolean;
}