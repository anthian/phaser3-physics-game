import Phaser from 'phaser';
import ConstantsHelper from '../helpers/ConstantsHelper';
import GameHelper from '../helpers/GameHelper';

export class Preloader extends Phaser.Scene
{
	isAllLoaded: boolean;
	background: Phaser.GameObjects.Image;

	progressBarContainer: Phaser.GameObjects.Rectangle;
	progressBarContainerX: number;
	progressBarContainerY: number;
	progressBarContainerWidth: number;
	progressBarContainerHeight: number;

	progressBar: Phaser.GameObjects.Rectangle;
	progressBarX: number;
	progressBarY: number;
	progressBarWidth: number;
	progressBarStepWidth: number;
	progressBarHeight: number;

	constructor ()
	{
		super({ 
			key: "Preloader",
			plugins: [ 'Loader', 'Clock' ],
		});
		this.isAllLoaded = false;
	}

	preload ()
	{
		//  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
		//  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
		this.load.image(ConstantsHelper.ICON_IMAGE_KEY, 'assets/images/icon.png');
		this.load.image(ConstantsHelper.LOGO_IMAGE_KEY, 'assets/images/logo.png');
		this.load.image(ConstantsHelper.PHASER_LOGO_IMAGE_KEY, 'assets/images/phaser-logo.png');
		this.load.image(ConstantsHelper.BLUE_BALL_IMAGE_KEY, 'assets/images/blue.png');
		this.load.image(ConstantsHelper.PINK_BALL_IMAGE_KEY, 'assets/images/pink.png');
		this.load.image(ConstantsHelper.STAR_PARTICLE_IMAGE_KEY, 'assets/particles/star-small.png');
		this.load.image(ConstantsHelper.BRUSH_SPRITE_IMAGE_KEY, 'assets/sprites/brush.png');
		this.load.svg(
			ConstantsHelper.GO_BACK_ICON, 
			'assets/svg/chevron-left.svg', 
			{ width: ConstantsHelper.ICON_SIZE, height:  ConstantsHelper.ICON_SIZE }
		);
		this.load.svg(
			ConstantsHelper.RELOAD_SCENE_ICON, 
			'assets/svg/arrow-rotate-right.svg', 
			{ width:  ConstantsHelper.ICON_SIZE, height:  ConstantsHelper.ICON_SIZE }
		);
	}

	init ()
	{
		this.calculateSizes();

		//We loaded this image in our Boot Scene, so we can display it here
		this.background = GameHelper.add.backgroundImage(this);

		this.progressBarContainer = this.add.rectangle(
			this.progressBarContainerX, 
			this.progressBarContainerY, 
			this.progressBarContainerWidth, 
			this.progressBarContainerHeight
		)
		.setStrokeStyle(1, 0x000000);

		//  This is the progress bar itself. It will increase in size from the left based on the % of progress.
		this.progressBar = this.add.rectangle(
			this.progressBarX, 
			this.progressBarY, 
			this.progressBarStepWidth, 
			this.progressBarHeight, 
			0x333333
		);

		//  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
		this.load.on('progress', (progress: number) => {
			console.log(progress);
			//  Update the progress bar
			this.progressBar.width = Phaser.Math.Clamp(
				this.progressBarWidth * progress,
				this.progressBarStepWidth,
				this.progressBarWidth
			);
			if(progress >= 1) {
				this.isAllLoaded = true
			}
		});
	}

	create ()
	{
		//  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
		//  For example, you can define global animations here, so we can use them in other scenes.

		//  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
		while(!this.isAllLoaded){
			//Wait until all loaded
		}
		this.time.delayedCall(1000, () => {
			this.scene.start('MainMenu');
		})
	}

	private calculateSizes(): void {
		//  This is the outline of the bar.
		this.progressBarContainerX = this.game.scale.width/2;
		this.progressBarContainerY = this.game.scale.height/2;
		this.progressBarContainerWidth = this.game.scale.width/2 - this.game.scale.width * 0.025;
		this.progressBarContainerHeight = this.game.scale.height * 0.07;

		this.progressBarX = this.progressBarContainerX - this.progressBarContainerWidth/2 + 8;
		this.progressBarY = this.progressBarContainerY;
		this.progressBarWidth = this.progressBarContainerWidth - 10
		this.progressBarStepWidth = this.progressBarWidth / 100;
		this.progressBarHeight = this.progressBarContainerHeight - 10;
	}
}
