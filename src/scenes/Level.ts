import Phaser from 'phaser';
import ILevelScene from '../interfaces/ILevelScene';
import GameHelper from '../helpers/GameHelper';
import UtilsHelper from '../helpers/UtilsHelper';
import ConstantsHelper from '../helpers/ConstantsHelper';

export class Level extends Phaser.Scene implements ILevelScene 
{
	pinkBall: Phaser.Physics.Matter.Image;
	blueBall: Phaser.Physics.Matter.Image;
	graphics: Phaser.GameObjects.Graphics;
	draws: Phaser.Physics.Matter.Sprite[][];
	path: Phaser.Curves.Path | null;
	isCompleted: boolean;

	constructor ()
	{
		super({ key: "Level" });
		this.isCompleted = false;
		this.draws = [];
	}

	init(){
		this.isCompleted = false;
		this.matter.world.pause();
	}

	create ()
	{
		GameHelper.add.backgroundImage(this);

		GameHelper.add.goBackIcon(this, 100, 30);
		GameHelper.add.reloadSceneIcon(this, this.scale.width - 100, 30);
		
		const ballCategory = this.matter.world.nextCategory();
		const obstacleCategory = this.matter.world.nextCategory();
		const drawCategory = this.matter.world.nextCategory();

		this.pinkBall = GameHelper.add.pinkBall(this, 300, 100, ballCategory, [ballCategory, drawCategory, obstacleCategory]);
		this.blueBall = GameHelper.add.blueBall(this, this.scale.width - 300, 100, ballCategory, [ballCategory, drawCategory, obstacleCategory]);

		this.pinkBall.setOnCollideWith(this.blueBall.body!, (_body: MatterJS.BodyType, collisionData: Phaser.Types.Physics.Matter.MatterCollisionData) => {
			const midPointX = (collisionData.bodyA.position.x + collisionData.bodyB.position.x) / 2;
			const midPointY = (collisionData.bodyA.position.y + collisionData.bodyB.position.y) / 2;
			GameHelper.add.starParticleEmitter(this, midPointX, midPointY);
			this.isCompleted = true;
			this.matter.world.pause();
		});

		this.graphics = this.add.graphics(); 
		
		this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			if(!this.isCompleted){
				this.matter.world.pause();
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
			if(!this.isCompleted && this.path !== null && typeof this.path !== 'undefined'){
				const points = this.path.getPoints(3);
				const simplifiedPoints = UtilsHelper.simplifyPath(points, 1);
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
				
				this.matter.world.resume();
			}
			
		}, this);
	}

	update() {
		this.graphics.clear();
        this.graphics.lineStyle(5, ConstantsHelper.BRUSH_SPRITE_COLOR, 1);
		if(this.path != null){
			this.path.draw(this.graphics);
		}
		UtilsHelper.handleOutOfBounds(this, (this.pinkBall.body as MatterJS.BodyType));
		UtilsHelper.handleOutOfBounds(this, (this.blueBall.body as MatterJS.BodyType));
	}
}