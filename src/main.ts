import { Boot } from './scenes/Boot';
import { Level } from './scenes/Level';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

import Phaser from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 450,
	backgroundColor: 0xFFFFFF,
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	dom: {
		createContainer: true,
	},
	parent: 'game-container',
	physics: {
		default: 'matter',
		matter: {
			debug: true,
			gravity: {
				x: 0,
				y: 1
			}
		}
	},
	scene: [
		Boot,
		Preloader,
		MainMenu,
		Level,
		GameOver
	]
};

const game = new Phaser.Game(config);

export default game;
