import {
	Math as PhaserMath
} from 'phaser';

export default function simplifyPath(points: PhaserMath.Vector2[], epsilon: number): PhaserMath.Vector2[] {
    let i: number = 1;
    let pointA: PhaserMath.Vector2 = points[0];
    let pointB: PhaserMath.Vector2 = points[i];
    let distance = Phaser.Math.Distance.BetweenPointsSquared(pointA, pointB);
    const result: PhaserMath.Vector2[] = [pointA];
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
