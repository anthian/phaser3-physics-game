import { 
	Scene, 
	GameObjects, 
	Input, 
	Types, 
	Curves, 
	Math,
	Physics
} from 'phaser';

export class Game extends Scene
{
	background: GameObjects.Image;
	pinkBall: Types.Physics.Arcade.ImageWithDynamicBody;
	blueBall: Types.Physics.Arcade.ImageWithDynamicBody;
	firstPointerUp: boolean;
	graphics: GameObjects.Graphics;
	path: Curves.Path | null;
	pathGroup: Physics.Arcade.Group; 

	constructor ()
	{
		super({ key: "Game" });
		this.firstPointerUp = true;
	}

	init(){
		this.physics.world.pause();
	}

	create ()
	{
		this.background = this.add.image(this.scale.width/2, this.scale.height/2, 'background');
		this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
		
		this.pinkBall = this.physics.add.image(350, 100, 'pink-ball');
		this.pinkBall.setCollideWorldBounds(true);
		this.pinkBall.setScale(0.25, 0.25);
		this.pinkBall.setBounce(0.5);

		this.blueBall = this.physics.add.image(550, 100, 'blue-ball');
		this.blueBall.setCollideWorldBounds(true);
		this.blueBall.setScale(0.25, 0.25);
		this.blueBall.setBounce(0.5);

		this.physics.add.collider(this.pinkBall, this.blueBall);

		this.graphics = this.add.graphics(); 
		this.pathGroup = this.physics.add.group({collideWorldBounds: true});
		this.physics.add.collider(this.pathGroup, this.pinkBall);
		this.physics.add.collider(this.pathGroup, this.blueBall);

		this.input.on('pointerdown', (pointer: Input.Pointer) => {
			console.log("pointerdown event");
			this.path = new Curves.Path(pointer.x, pointer.y);
		}, this);

		this.input.on('pointermove', (pointer: Input.Pointer) => {
			console.log("pointermove event");
			if (pointer.isDown) {
				const points: Math.Vector2[] = pointer.getInterpolatedPosition(5);
				if(this.path != null){
					this.path.splineTo(points);
				}
			}
		}, this);
	
		this.input.on('pointerup', () => {
			console.log("pointerup event");
			if(this.firstPointerUp){
				this.firstPointerUp = false;
			}else{
				//Convert path to points array to apply physics
				if(this.path != null){
					const points = this.path.getPoints(1);
					console.log(points.length);
					points.forEach(point => { 
						const circle = this.add.circle(point.x, point.y, 3, 0x333333, 0.8); 
						this.physics.add.existing(circle);
						this.pathGroup.add(circle);
					});
					this.path = null;
					this.physics.world.resume();
				}
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
