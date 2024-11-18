import Phaser from 'phaser';
import GeomType from '../../helpers/types/GeomType';

export default interface ILevelScene extends Phaser.Scene { 
	pinkBall: Phaser.Physics.Matter.Image;
	blueBall: Phaser.Physics.Matter.Image;
	graphics: Phaser.GameObjects.Graphics;
	obstacleGeometries: GeomType[],
	draws: Phaser.Physics.Matter.Sprite[][];
	path: Phaser.Curves.Path | null;
	isCompleted: boolean;
}