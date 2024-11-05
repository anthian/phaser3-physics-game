import Phaser from 'phaser';

export default class TweenHelper {
    static flashElement(
        scene: Phaser.Scene, 
        element: Phaser.GameObjects.Text | Phaser.GameObjects.Image,
        repeat: boolean = true, 
        easing: string = 'Linear', 
        flashDuration: number = 1500
    ) {
        scene.tweens.addMultiple([
            {
                targets: [element],
                duration: flashDuration,
                alpha: 0,
                ease: easing,
                yoyo: true,
                repeat: repeat ? -1 : 0,
            },
        ]);
    }
}