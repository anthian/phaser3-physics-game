import { Scene } from 'phaser';
import ConstantsHelper from '../helpers/ConstantsHelper';

export class Boot extends Scene
{
	constructor ()
	{
		super({ key: "Boot" });
	}

	preload ()
	{
		//  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
		//  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
		this.load.image(ConstantsHelper.BACKGROUND_IMAGE_KEY, 'assets/bg/bg-paper.jpg');
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

	create ()
	{
		this.scene.start('Preloader');
	}
}
