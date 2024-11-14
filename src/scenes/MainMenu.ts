import Phaser from 'phaser';
import TweenHelper from '../helpers/TweenHelper';
import GameHelper from '../helpers/GameHelper';

export class MainMenu extends Phaser.Scene
{
	background: Phaser.GameObjects.Image;
	icon: Phaser.GameObjects.Image;
	logo: Phaser.GameObjects.Image;
	title: Phaser.GameObjects.Text;

	constructor()
	{
		super({ 
			key: "MainMenu",
			plugins: [ 'InputPlugin', 'TweenManager' ],
		});
	}

	create ()
	{
		GameHelper.add.backgroundImage(this);

		this.icon = this.add.image(this.game.scale.width/2, this.game.scale.height * 0.2, 'icon');
		this.icon.setScale(0.25);

		this.logo = this.add.image(this.game.scale.width/2, this.game.scale.height/2, 'logo');

		this.title = this.add.text(this.game.scale.width/2, this.game.scale.height * 0.7, 'Click anywhere to start', {
			fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
			stroke: '#000000', strokeThickness: 3,
			align: 'center'
		}).setOrigin(0.5);

		TweenHelper.flashElement(this, this.title);

		const enterKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		enterKey?.once('down', () => {
			console.log("ENTRA");
			this.scene.start('Level');
		}, this);

		this.input.once('pointerdown', () => {
			this.scene.start('Level');
		}, this);
	}
}
