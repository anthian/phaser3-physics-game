import Phaser from 'phaser';

export default class UtilsHelper {
    static simplifyPath(points: Phaser.Math.Vector2[], epsilon: number): Phaser.Math.Vector2[] {
        let i: number = 1;
        let pointA: Phaser.Math.Vector2 = points[0];
        let pointB: Phaser.Math.Vector2 = points[i];
        let distance = Phaser.Math.Distance.BetweenPointsSquared(pointA, pointB);
        const result: Phaser.Math.Vector2[] = [pointA];
        const end: number = points.length - 1;
    
        do {
            if(distance > epsilon){
                result.push(pointB);
                pointA = pointB;
            }
            pointB = points[++i];
            distance = Phaser.Math.Distance.BetweenPointsSquared(pointA, pointB);
        } while (i < end);
    
        distance = Phaser.Math.Distance.BetweenPointsSquared(result[result.length-1], points[end]);
        if(distance < epsilon){
            result.pop();
        }
        result.push(points[end]);
    
        return result;
    }

    static handleOutOfBounds(
        scene: Phaser.Scene,
        body: MatterJS.BodyType
    ): void {
		if(body.bounds.max.x < 0 
			|| body.bounds.min.x > scene.scale.width 
			|| body.bounds.max.y < 0 
			|| body.bounds.min.y > scene.scale.height 
		){
			scene.scene.start('GameOver');
		}
	}
}