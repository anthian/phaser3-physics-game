import Phaser from 'phaser';
import MatterJS from "matter";
import ILevelScene from './interfaces/ILevelScene';
import GameHelper from '../helpers/GameHelper';
import UtilsHelper from '../helpers/UtilsHelper';
import ConstantsHelper from '../helpers/ConstantsHelper';
import GeomType from '../helpers/types/GeomType';
import ObstacleType from '../helpers/types/ObstacleType';

export class Level extends Phaser.Scene implements ILevelScene 
{
	pinkBall: Phaser.Physics.Matter.Image;
	blueBall: Phaser.Physics.Matter.Image;
	graphics: Phaser.GameObjects.Graphics;
	obstacleBodies: MatterJS.BodyType[];
	obstacleGeometries: GeomType[];
	draws: Phaser.Physics.Matter.Sprite[][];
	path: Phaser.Curves.Path | null;
	isCompleted: boolean;

	constructor ()
	{
		super({ 
			key: "Level",
			plugins: [ 'InputPlugin', 'TweenManager', 'Clock', 'MatterJS' ],
		});
		this.isCompleted = false;
		this.obstacleBodies = [];
		this.obstacleGeometries = [];
		this.draws = [];
	}

	init(){
		this.isCompleted = false;
		this.path = null;
		this.matter.world.pause();
	}

	create ()
	{
		GameHelper.add.backgroundImage(this);

		GameHelper.add.goBackIcon(this,  this.game.scale.width * 0.05, this.game.scale.height * 0.075);
		GameHelper.add.reloadSceneIcon(this, this.game.scale.width - this.game.scale.width * 0.05, this.game.scale.height * 0.075);
		
		const ballCategory = this.matter.world.nextCategory();
		const obstacleCategory = this.matter.world.nextCategory();
		const drawCategory = this.matter.world.nextCategory();

		this.pinkBall = GameHelper.add.pinkBall(this, this.game.scale.width/3, this.game.scale.height/4, ballCategory, [ballCategory, drawCategory, obstacleCategory]);
		this.blueBall = GameHelper.add.blueBall(this, this.game.scale.width*2/3, this.game.scale.height/4, ballCategory, [ballCategory, drawCategory, obstacleCategory]);

		this.pinkBall.setOnCollideWith(this.blueBall.body!, (_body: MatterJS.BodyType, collisionData: Phaser.Types.Physics.Matter.MatterCollisionData) => {
			const midPointX = (collisionData.bodyA.position.x + collisionData.bodyB.position.x) / 2;
			const midPointY = (collisionData.bodyA.position.y + collisionData.bodyB.position.y) / 2;
			GameHelper.add.starParticleEmitter(this, midPointX, midPointY);
			this.isCompleted = true;
			this.matter.world.pause();
		});

		const obstacle1Geometry = new Phaser.Geom.Rectangle(
			0, 
			this.game.scale.height - this.game.scale.height/16,
			this.game.scale.width,
			this.game.scale.height/16
		);

		const obstacle1: ObstacleType = GameHelper.add.obstacle(this, obstacle1Geometry, obstacleCategory);
		this.obstacleGeometries.push(obstacle1.geometry);
		if(obstacle1.body != null){
			this.obstacleBodies.push(obstacle1.body);
		}
			
		this.graphics = this.add.graphics(); 
		
		this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			this.matter.world.pause();
			if(!this.isCompleted){
				this.path = new Phaser.Curves.Path(pointer.x, pointer.y);
			}
		}, this);

		this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
			if (pointer.isDown && !this.isCompleted) {
				const points: Phaser.Math.Vector2[] = pointer.getInterpolatedPosition(5);
				if(this.path != null){
					this.path.splineTo(points);
				}
			}
		}, this);
	
		this.input.on('pointerup', () => {
			//Convert path to points array to apply physics
			if(!this.isCompleted && this.path != null && typeof this.path !== 'undefined'){
				const points = this.path.getPoints(3);
				
				const simplifiedPoints = points.length>2 ? UtilsHelper.simplifyPath(points, 1) : points;
				const drawingPoints: Phaser.Physics.Matter.Sprite[] = [];

				simplifiedPoints.forEach(point => { 
					const circleBody = GameHelper.add.drawingPoint(this, point.x, point.y, drawCategory, [ballCategory]);
					drawingPoints.push(circleBody);
				});

				this.draws.push(drawingPoints);

				if(this.path !== null && typeof this.path !== 'undefined'){
					this.path.destroy();
					this.path = null;
				}

				this.time.delayedCall(300, () => {
					this.matter.world.resume();
				});
			}

		}, this);
	}

	update() {
		this.graphics.clear();

		if(this.path != null){
			
			this.graphics.lineStyle(5, ConstantsHelper.BRUSH_SPRITE_COLOR, 1);
			this.path.draw(this.graphics);
		}

		GameHelper.update.renderObstacles(this);

		UtilsHelper.handleOutOfBounds(this, (this.pinkBall.body as MatterJS.BodyType));
		UtilsHelper.handleOutOfBounds(this, (this.blueBall.body as MatterJS.BodyType));
	}

}