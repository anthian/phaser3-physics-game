import { Boot } from './scenes/Boot';
import { Level } from './scenes/Level';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 450,
	parent: 'game-container',
	physics: {
		default: 'matter',
		matter: {
			debug: false,
			gravity: {
				x: 0,
				y: 1
			}
		}
	},
	backgroundColor: '#028af8',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	scene: [
		Boot,
		Preloader,
		MainMenu,
		Level,
		GameOver
	]
};

export default new Game(config);
