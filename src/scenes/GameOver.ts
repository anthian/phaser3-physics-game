import { Scene } from 'phaser';
import ConstantsHelper from '../helpers/ConstantsHelper';

export class GameOver extends Scene
{
	camera: Phaser.Cameras.Scene2D.Camera;
	background: Phaser.GameObjects.Image;
	gameover_text : Phaser.GameObjects.Text;

	constructor ()
	{
		super({ key: "GameOver" });
	}

	create ()
	{
		this.camera = this.cameras.main
		this.camera.setBackgroundColor(0xff0000);

		const { width, height } = this.scale;
		this.background = this.add.image(width/2, height/2, ConstantsHelper.BACKGROUND_IMAGE_KEY);
		this.background.setAlpha(0.5);

		this.gameover_text = this.add.text(400, 225, 'Game Over', {
			fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
			stroke: '#000000', strokeThickness: 8,
			align: 'center'
		});
		this.gameover_text.setOrigin(0.5);

		this.input.once('pointerdown', () => {
			this.scene.start('MainMenu');
		});
	}
}
