import GeomType from "./GeomType";
import MatterJS from "matter";

type ObstacleType = {
	geometry: GeomType,
	body: MatterJS.BodyType | null,
}

export default ObstacleType;