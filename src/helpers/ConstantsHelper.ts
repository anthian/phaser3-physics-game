export default class ConstantsHelper {

    static readonly BACKGROUND_IMAGE_KEY: string = 'background';

    static readonly ICON_IMAGE_KEY: string = 'icon';

    static readonly LOGO_IMAGE_KEY: string = 'logo';

    static readonly PHASER_LOGO_IMAGE_KEY: string = 'phaser-logo';
    
    static readonly STAR_PARTICLE_IMAGE_KEY: string = 'star-particle';
    static readonly STAR_PARTICLE_SPEED: Phaser.Types.GameObjects.Particles.EmitterOpOnEmitType = { min: 50, max: 200};
    static readonly STAR_PARTICLE_SCALE: Phaser.Types.GameObjects.Particles.EmitterOpOnUpdateType = { start: 1.2, end: 0};
    static readonly STAR_PARTICLE_LIFESPAN: Phaser.Types.GameObjects.Particles.EmitterOpOnEmitType = 3000;
    static readonly STAR_PARTICLE_BLENDMODE: Phaser.BlendModes = Phaser.BlendModes.OVERLAY;
    static readonly STAR_PARTICLE_ANGLE: Phaser.Types.GameObjects.Particles.EmitterOpOnEmitType = { min: 0, max: 360 };
    static readonly STAR_PARTICLE_ROTATE: Phaser.Types.GameObjects.Particles.EmitterOpOnEmitType = { min: 0, max: 270 };
    static readonly STAR_PARTICLE_QUANTITY: number = 75;
    static readonly STAR_PARTICLE_EMITTING: boolean = false;
   
    static readonly BALL_LABEL: string = 'ball';
    static readonly BALL_DENSITY: number = 10;
    static readonly BALL_RESTITUTION: number = 0.2;
    static readonly BALL_FRICTION: number = 0.005;
    static readonly BALL_FRICTION_AIR: number = 0.0025;
    static readonly BALL_FRICTION_STATIC: number = 0.25;
    static readonly BALL_SCALE:  number = 0.25;
    static readonly BALL_BOUNCE: number = 0.7;

    static readonly BLUE_BALL_COLOR: number = 0x3EBFF0;
    static readonly BLUE_BALL_IMAGE_KEY: string = 'blue-ball';
    
    static readonly PINK_BALL_COLOR: number = 0xEE87B4;
    static readonly PINK_BALL_IMAGE_KEY: string = 'pink-ball';

    static readonly BRUSH_SPRITE_COLOR: number = 0x333333;
    static readonly BRUSH_SPRITE_IMAGE_KEY: string = 'brush-sprite';
    static readonly BRUSH_SPRITE_DENSITY: number = 1;
    static readonly BRUSH_SPRITE_RESTITUTION: number = 0;
    static readonly BRUSH_SPRITE_FRICTION: number = 0.025;
    static readonly BRUSH_SPRITE_FRICTION_AIR: number = 0.0025;
    static readonly BRUSH_SPRITE_FRICTION_STATIC: number = 0.5;
    static readonly BRUSH_SPRITE_SHAPE: Phaser.Types.Physics.Matter.MatterSetBodyConfig = {type: 'circle', radius: 2.5 };

    static readonly OBSTACLE_COLOR: number = 0x949694;

    static readonly ICON_SIZE: number = 32;
    static readonly GO_BACK_ICON: string = 'go-back-icon';
    static readonly RELOAD_SCENE_ICON: string = 'reload-scene-icon';

}