import { Scene } from 'phaser';

export class Game extends Scene
{

    constructor ()
    {
        super('Game');
    }

	init() {

	}

    create ()
    {
        //const { width, height } = this.scale

        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });

    }

    update() {

    }
}
