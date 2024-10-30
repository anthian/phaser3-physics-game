import { Scene } from 'phaser';

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
		this.load.image('background', 'assets/bg/bg-paper.jpg');
		this.load.image('blue-ball', 'assets/images/Blue.png');
		this.load.image('pink-ball', 'assets/images/Pink.png');
		this.load.image('brush', 'assets/sprites/brush.png');
	}

	create ()
	{
		this.scene.start('Preloader');
	}
}
