import { Scene } from 'phaser';

export class Preloader extends Scene
{
	constructor ()
	{
		super({ key: "Preloader" });
	}

	init ()
	{
		//  We loaded this image in our Boot Scene, so we can display it here
		const { width, height } = this.scale;
		this.add.image(width/2, height/2, 'background');

		//  A simple progress bar. This is the outline of the bar.
		this.add.rectangle(400, 225, 380, 32).setStrokeStyle(1, 0x000000);

		//  This is the progress bar itself. It will increase in size from the left based on the % of progress.
		const bar = this.add.rectangle(400-183, 225, 9, 28, 0x333333);

		//  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
		this.load.on('progress', (progress: number) => {

			//  Update the progress bar (our bar is 375px wide, so 100% = 375px)
			bar.width = 5 + (370 * progress);

		});
	}

	create ()
	{
		//  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
		//  For example, you can define global animations here, so we can use them in other scenes.

		//  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
		this.time.delayedCall(1000, () => {
			this.scene.start('MainMenu');
		})
	}
}
