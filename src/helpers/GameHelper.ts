import Phaser from 'phaser';
import ILevelScene from '../interfaces/ILevelScene';
import ConstantsHelper from './ConstantsHelper';

export default class GameHelper {

    static readonly matter = {
        world: {
            setBounds: ((
                scene: ILevelScene,
                thickness: number = 10
            ): void => {
                scene.matter.world.setBounds(
                    thickness, 
                    thickness, 
                    scene.scale.width-(thickness*2), 
                    scene.scale.height-(thickness*2)
                );
            }),
        },
    };

    static readonly add = {
        backgroundImage: ((
            scene: ILevelScene,
            key: string = ConstantsHelper.BACKGROUND_IMAGE_KEY
        ): Phaser.GameObjects.Image => {
            return scene.add.image(scene.scale.width/2, scene.scale.height/2, key);
        }),

        pinkBall: ((
            scene: ILevelScene,
            x: number,
            y: number,
            collisionCategory: number,
            collidesWith: number[]
        ): Phaser.Physics.Matter.Image => {
            return GameHelper._addBall(scene, x, y, collisionCategory, collidesWith, ConstantsHelper.PINK_BALL_IMAGE_KEY);
        }),

        blueBall: ((
            scene: ILevelScene,
            x: number,
            y: number,
            collisionCategory: number,
            collidesWith: number[]
        ): Phaser.Physics.Matter.Image => {
            return GameHelper._addBall(scene, x, y, collisionCategory, collidesWith, ConstantsHelper.BLUE_BALL_IMAGE_KEY);
        }),

        drawingPoint: ((
            scene: ILevelScene,
            x: number,
            y: number,
            collisionCategory: number,
            collidesWith: number[]
        ): Phaser.Physics.Matter.Sprite => {
            const point =  scene.matter.add.sprite(
                x,
                y,
                ConstantsHelper.BRUSH_SPRITE_IMAGE_KEY,
                undefined,
                {
                    isStatic: true,
                    density: ConstantsHelper.BRUSH_SPRITE_DENSITY,
                    restitution: ConstantsHelper.BRUSH_SPRITE_RESTITUTION,
                    friction: ConstantsHelper.BRUSH_SPRITE_FRICTION,
                    frictionAir: ConstantsHelper.BRUSH_SPRITE_FRICTION_AIR,
                    frictionStatic: ConstantsHelper.BRUSH_SPRITE_FRICTION_STATIC,
                    shape: ConstantsHelper.BRUSH_SPRITE_SHAPE,
                }
            );
            point.setCollisionCategory(collisionCategory);
            point.setCollidesWith(collidesWith);
            return point;
        }),

        starParticleEmitter: ((
            scene: ILevelScene,
            x: number,
            y: number
        ): void => {
            const emitter = scene.add.particles(x, y, ConstantsHelper.STAR_PARTICLE_IMAGE_KEY, {
                speed: ConstantsHelper.STAR_PARTICLE_SPEED,
                scale: ConstantsHelper.STAR_PARTICLE_SCALE,
                lifespan: ConstantsHelper.STAR_PARTICLE_LIFESPAN,
                blendMode: ConstantsHelper.STAR_PARTICLE_BLENDMODE,
                angle: ConstantsHelper.STAR_PARTICLE_ANGLE,
                rotate: ConstantsHelper.STAR_PARTICLE_ROTATE,
                emitting: ConstantsHelper.STAR_PARTICLE_EMITTING
            });
            emitter.explode(ConstantsHelper.STAR_PARTICLE_QUANTITY);
        }),

        goBackIcon: ((
            scene: ILevelScene,
            x: number,
            y: number
        ): Phaser.GameObjects.Image => {
            const button = scene.add.image(x, y, ConstantsHelper.GO_BACK_ICON);
            button.setInteractive();
            button.setDepth(99);
            button.on('pointerdown', () => {
                scene.scene.start('MainMenu');
            });
            return button;
        }),

        reloadSceneIcon: ((
            scene: ILevelScene,
            x: number,
            y: number
        ): Phaser.GameObjects.Image => {
            const button = scene.add.image(x, y, ConstantsHelper.RELOAD_SCENE_ICON);
            button.setInteractive();
            //button.setDepth(99);
            button.on('pointerdown', () => {
                scene.isCompleted = false;
                scene.scene.restart();
            });
            return button;
        }),
    };

    private static _addBall = (
        scene: ILevelScene,
        x: number,
        y: number,
        collisionCategory: number,
        collidesWith: number[],
        key: string
    ): Phaser.Physics.Matter.Image => {
        const ball = scene.matter.add.image(x, y, key, undefined, { 
            label: ConstantsHelper.BALL_LABEL, 
            density: ConstantsHelper.BALL_DENSITY,
            restitution: ConstantsHelper.BALL_RESTITUTION,
            friction: ConstantsHelper.BALL_FRICTION,
            frictionAir: ConstantsHelper.BALL_FRICTION_AIR,
            frictionStatic: ConstantsHelper.BALL_FRICTION_STATIC
        });
        ball.setScale(ConstantsHelper.BALL_SCALE, ConstantsHelper.BALL_SCALE);
        ball.setCircle(ball.width * ConstantsHelper.BALL_SCALE/2);
        ball.setBounce(ConstantsHelper.BALL_BOUNCE);
        ball.setCollisionCategory(collisionCategory);
        ball.setCollidesWith(collidesWith);
        return ball;
    };
}