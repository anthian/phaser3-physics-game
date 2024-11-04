import { 
	Scene, 
	GameObjects, 
	Input,
	Curves, 
	Math,
	Physics,
	Types
} from 'phaser';

import simplifyPath from '../helpers/simplifyPath';
export class Game extends Scene
{
	background: GameObjects.Image;
	pinkBall: Physics.Matter.Image;
	blueBall: Physics.Matter.Image;
	graphics: GameObjects.Graphics;
	path: Curves.Path | null;

	constructor ()
	{
		super({ key: "Game" });
	}

	init(){
		this.matter.world.pause();
	}

	create ()
	{
		this.background = this.add.image(this.scale.width/2, this.scale.height/2, 'background');

		//Set World bounds
		this.matter.world.setBounds(10, 10, this.scale.width-20, this.scale.height-20);
		
		const ballCategory = this.matter.world.nextCategory();
		const drawCategory = this.matter.world.nextGroup();

		this.pinkBall = this.matter.add.image(350, 100, 'pink-ball', undefined, { label: 'ball'});
		this.pinkBall.setScale(0.25, 0.25);
		this.pinkBall.setCircle(this.pinkBall.width * 0.25/2);
		this.pinkBall.setBounce(0.6);
		this.pinkBall.setFriction(0.005);
		this.pinkBall.setCollisionCategory(ballCategory);
        this.pinkBall.setCollidesWith([ ballCategory, drawCategory ]);

		this.blueBall = this.matter.add.image(550, 100, 'blue-ball', undefined, { label: 'ball'});
		this.blueBall.setScale(0.25, 0.25);
		this.blueBall.setCircle(this.blueBall.width * 0.25/2);
		this.blueBall.setBounce(0.6);
		this.blueBall.setFriction(0.005);
		this.blueBall.setCollisionCategory(ballCategory);
		this.pinkBall.setCollidesWith([ ballCategory, drawCategory ]);

		this.pinkBall.setOnCollideWith(this.blueBall.body!, (_body: MatterJS.BodyType, collisionData: Types.Physics.Matter.MatterCollisionData) => {
			console.log("collision of balls Detected");

			const midPointX = (collisionData.bodyA.position.x + collisionData.bodyB.position.x) / 2;
			const midPointY = (collisionData.bodyA.position.y + collisionData.bodyB.position.y) / 2;
			const emitter = this.add.particles(midPointX, midPointY, 'star-particle', {
				speed: { min: 50, max: 200},
				scale: { start: 1.2, end: 0},
				lifespan: 4000,
				blendMode: Phaser.BlendModes.OVERLAY,
				angle: { min: 0, max: 360 },
				quantity: 50,
				emitting: false
			});
			emitter.explode();
			this.matter.world.pause();
		});

		this.graphics = this.add.graphics(); 
		const bodyParts: Physics.Matter.Sprite[] =[];

		this.input.on('pointerdown', (pointer: Input.Pointer) => {
			this.matter.world.pause();
			if(this.path !== null && typeof this.path !== 'undefined'){
				this.path.destroy();
			}
			if(bodyParts.length > 0){
				for(let i=bodyParts.length-1;i>=0;i--){
					bodyParts.pop()?.destroy();
				}
			}
			this.path = new Curves.Path(pointer.x, pointer.y);
		}, this);

		this.input.on('pointermove', (pointer: Input.Pointer) => {
			if (pointer.isDown) {
				const points: Math.Vector2[] = pointer.getInterpolatedPosition(5);
				if(this.path != null){
					this.path.splineTo(points);
				}
			}
		}, this);
	
		this.input.on('pointerup', () => {
			//Convert path to points array to apply physics
			if(this.path !== null && typeof this.path !== 'undefined'){
				const points = this.path.getPoints(3);
				const simplifiedPoints = simplifyPath(points, 1);

				simplifiedPoints.forEach(point => { 
					const circleBody = this.matter.add.sprite(
						point.x, 
						point.y, 
						'brush-sprite',
						undefined,
						{
							isStatic: true,
							friction: 0, 
							shape: {type: 'circle', radius: 2.5 }
						}
					);
					circleBody.setCollisionCategory(drawCategory);
					circleBody.setCollidesWith([ballCategory]);
					bodyParts.push(circleBody);
				});

				this.path = null;
				this.matter.world.resume();
			}
			
		}, this);

		//this.scene.start('GameOver');

	}

	update() {
		this.graphics.clear();
        this.graphics.lineStyle(5, 0x333333, 1);
		if(this.path != null){
			this.path.draw(this.graphics);
		}
	}
}
