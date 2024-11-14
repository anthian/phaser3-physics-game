import Phaser from 'phaser';
import GameHelper from '../helpers/GameHelper';

export class GameOver extends Phaser.Scene
{
	camera: Phaser.Cameras.Scene2D.Camera;
	background: Phaser.GameObjects.Image;
	gameover_text : Phaser.GameObjects.Text;

	constructor ()
	{
		super({ 
			key: "GameOver" ,
			plugins: [ 'InputPlugin' ],
		});
	}

	create ()
	{
		this.camera = this.cameras.main
		this.camera.setBackgroundColor(0xff0000);

		this.background = 
			GameHelper.add.backgroundImage(this)
				.setAlpha(0.7);

		this.gameover_text = this.add.text(this.game.scale.width/2, this.game.scale.height/2, 'Game Over', {
			fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
			stroke: '#000000', strokeThickness: 8,
			align: 'center'
		});
		this.gameover_text.setOrigin(0.5);

		const enterKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		enterKey?.once('down', () => {
			console.log("ENTRA");
			this.scene.start('Level');
		}, this);

		this.input.once('pointerdown', () => {
			this.scene.start('MainMenu');
		});
	}
}
