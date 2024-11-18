import Phaser from 'phaser';
import MatterJS from 'matter';
import ILevelScene from '../scenes/interfaces/ILevelScene';
import ConstantsHelper from './ConstantsHelper';
import ObstacleType from './types/ObstacleType';
import GeomType from './types/GeomType';

export default class GameHelper {

	static readonly matter = {
		world: {
			setBounds: ((
				scene: ILevelScene,
				thickness: number = 10
			): void => {
				scene.matter.world.setBounds(
					thickness, 
					thickness, 
					scene.scale.width-(thickness*2), 
					scene.scale.height-(thickness*2)
				);
			}),
		},
	};

	static readonly add = {
		backgroundImage: ((
			scene: Phaser.Scene | ILevelScene,
			key: string = ConstantsHelper.BACKGROUND_IMAGE_KEY
		): Phaser.GameObjects.Image => {
			const bg =  
				scene.add.image(0, 0, key)
					.setDisplaySize(scene.game.scale.width, scene.game.scale.height)
					.setOrigin(0, 0);
			return bg;
		}),

		pinkBall: ((
			scene: ILevelScene,
			x: number,
			y: number,
			collisionCategory: number,
			collidesWith: number[]
		): Phaser.Physics.Matter.Image => {
			return GameHelper._addBall(scene, x, y, collisionCategory, collidesWith, ConstantsHelper.PINK_BALL_IMAGE_KEY);
		}),

		blueBall: ((
			scene: ILevelScene,
			x: number,
			y: number,
			collisionCategory: number,
			collidesWith: number[]
		): Phaser.Physics.Matter.Image => {
			return GameHelper._addBall(scene, x, y, collisionCategory, collidesWith, ConstantsHelper.BLUE_BALL_IMAGE_KEY);
		}),

		obstacle: ((
			scene: ILevelScene,
			geometry: GeomType,
			obstacleCategory: number,
		): ObstacleType => {

			let body: MatterJS.BodyType | null = null;
			const obstacleBaseConfig = {
				isStatic: true,
				restitution: ConstantsHelper.OBSTACLE_RESTITUTION,
				friction: ConstantsHelper.OBSTACLE_FRICTION,
				frictionAir: ConstantsHelper.OBSTACLE_FRICTION_AIR,
				frictionStatic: ConstantsHelper.OBSTACLE_FRICTION_STATIC,
				collisionFilter: {
					category: obstacleCategory
				}	
			}

			if(geometry instanceof Phaser.Geom.Circle){
				body = scene.matter.add.circle(
					geometry.x,
					geometry.y,
					geometry.radius,
					{
						...obstacleBaseConfig,
						density: Math.PI * Math.pow(geometry.radius, 2)
					}
				)
			}else if(geometry instanceof Phaser.Geom.Rectangle){
				body = scene.matter.add.rectangle(
					geometry.centerX,
					geometry.centerY,
					geometry.width,
					geometry.height,
					{
						...obstacleBaseConfig,
						density: geometry.width * geometry.height
					}
				)
			}else if(geometry instanceof Phaser.Geom.Triangle){
				const center = Phaser.Geom.Triangle.Centroid(geometry);
				const vertices = [ 
					{ x: geometry.x1, y: geometry.y1 }, 
					{ x: geometry.x2, y: geometry.y2 }, 
					{ x: geometry.x3, y: geometry.y3 } 
				];

				body = scene.matter.add.fromVertices(
					center.x,
					center.y,
					vertices,
					{
						...obstacleBaseConfig,
						density: Phaser.Geom.Triangle.Area(geometry),
					}
				)		
			}
			return {
				geometry,
				body
			}		
		}),

		drawingPoint: ((
			scene: ILevelScene,
			x: number,
			y: number,
			collisionCategory: number,
			collidesWith: number[]
		): Phaser.Physics.Matter.Sprite => {
			const point =  scene.matter.add.sprite(
				x,
				y,
				ConstantsHelper.BRUSH_SPRITE_IMAGE_KEY,
				undefined,
				{
					isStatic: true,
					density: ConstantsHelper.BRUSH_SPRITE_DENSITY,
					restitution: ConstantsHelper.BRUSH_SPRITE_RESTITUTION,
					friction: ConstantsHelper.BRUSH_SPRITE_FRICTION,
					frictionAir: ConstantsHelper.BRUSH_SPRITE_FRICTION_AIR,
					frictionStatic: ConstantsHelper.BRUSH_SPRITE_FRICTION_STATIC,
					shape: ConstantsHelper.BRUSH_SPRITE_SHAPE,
				}
			);
			point.setCollisionCategory(collisionCategory);
			point.setCollidesWith(collidesWith);
			return point;
		}),

		starParticleEmitter: ((
			scene: ILevelScene,
			x: number,
			y: number
		): void => {
			const emitter = scene.add.particles(x, y, ConstantsHelper.STAR_PARTICLE_IMAGE_KEY, {
				speed: ConstantsHelper.STAR_PARTICLE_SPEED,
				scale: ConstantsHelper.STAR_PARTICLE_SCALE,
				lifespan: ConstantsHelper.STAR_PARTICLE_LIFESPAN,
				blendMode: ConstantsHelper.STAR_PARTICLE_BLENDMODE,
				angle: ConstantsHelper.STAR_PARTICLE_ANGLE,
				rotate: ConstantsHelper.STAR_PARTICLE_ROTATE,
				emitting: ConstantsHelper.STAR_PARTICLE_EMITTING
			});
			emitter.explode(ConstantsHelper.STAR_PARTICLE_QUANTITY);
		}),

		goBackIcon: ((
			scene: ILevelScene,
			x: number,
			y: number
		): Phaser.GameObjects.Image => {
			const button = scene.add.image(x, y, ConstantsHelper.GO_BACK_ICON);
			button.setInteractive();
			button.setDepth(99);
			button.on('pointerdown', () => {
				scene.scene.start('MainMenu');
			});
			return button;
		}),

		reloadSceneIcon: ((
			scene: ILevelScene,
			x: number,
			y: number
		): Phaser.GameObjects.Image => {
			const button = scene.add.image(x, y, ConstantsHelper.RELOAD_SCENE_ICON);
			button.setInteractive();
			//button.setDepth(99);
			button.on('pointerdown', () => {
				scene.isCompleted = false;
				scene.scene.restart();
			});
			return button;
		}),
	};

	static readonly update = {
		renderObstacles: ((
			scene: ILevelScene
		) => {
			scene.obstacleGeometries.forEach((geom) => {
				scene.graphics.lineStyle(ConstantsHelper.OBSTACLE_LINE_SIZE, ConstantsHelper.OBSTACLE_LINE_COLOR, 1);
				scene.graphics.fillStyle(ConstantsHelper.OBSTACLE_FILL_COLOR, 1);

				if(geom instanceof Phaser.Geom.Circle){
					scene.graphics.fillCircleShape(geom);
				} else if(geom instanceof Phaser.Geom.Rectangle){
					scene.graphics.fillRectShape(geom);
				}else if(geom instanceof Phaser.Geom.Triangle){
					scene.graphics.fillTriangleShape(geom);
				}
			});	
		}),
	};

	private static _addBall = (
		scene: ILevelScene,
		x: number,
		y: number,
		collisionCategory: number,
		collidesWith: number[],
		key: string
	): Phaser.Physics.Matter.Image => {
		const ball = scene.matter.add.image(x, y, key, undefined, { 
			label: ConstantsHelper.BALL_LABEL, 
			density: ConstantsHelper.BALL_DENSITY,
			restitution: ConstantsHelper.BALL_RESTITUTION,
			friction: ConstantsHelper.BALL_FRICTION,
			frictionAir: ConstantsHelper.BALL_FRICTION_AIR,
			frictionStatic: ConstantsHelper.BALL_FRICTION_STATIC
		});
		ball.setScale(ConstantsHelper.BALL_SCALE, ConstantsHelper.BALL_SCALE);
		ball.setCircle(ball.width * ConstantsHelper.BALL_SCALE/2);
		ball.setBounce(ConstantsHelper.BALL_BOUNCE);
		ball.setCollisionCategory(collisionCategory);
		ball.setCollidesWith(collidesWith);
		return ball;
	};
}