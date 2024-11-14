
import Phaser from 'phaser';
import ConstantsHelper from '../helpers/ConstantsHelper';

export class Boot extends Phaser.Scene
{
	constructor ()
	{
		super({ 
			key: "Boot",
			plugins: [ 'Loader' ],
		});
	}

	preload ()
	{
		//  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
		//  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
		this.load.image(ConstantsHelper.BACKGROUND_IMAGE_KEY, 'assets/bg/bg-paper.jpg');
	}

	create ()
	{
		this.scene.start('Preloader');
	}
}
