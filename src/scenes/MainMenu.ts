import { Scene, GameObjects } from 'phaser';
import TweenHelper from '../helpers/tweenHelper';

export class MainMenu extends Scene
{
	background: GameObjects.Image;
	icon: GameObjects.Image;
	logo: GameObjects.Image;
	title: GameObjects.Text;

	constructor ()
	{
		super({ key: "MainMenu" });
	}

	create ()
	{
		const { width, height } = this.scale;
		this.background = this.add.image(width/2, height/2, 'background');

		this.icon = this.add.image(width/2, 100, 'icon');
		this.icon.setScale(0.25);

		this.logo = this.add.image(width/2, 225, 'logo');

		this.title = this.add.text(width/2, 325, 'Click anywhere to start', {
			fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
			stroke: '#000000', strokeThickness: 3,
			align: 'center'
		}).setOrigin(0.5);

		TweenHelper.flashElement(this, this.title);

		this.input.once('pointerdown', () => {
			this.scene.start('Game');
		});
	}
}
