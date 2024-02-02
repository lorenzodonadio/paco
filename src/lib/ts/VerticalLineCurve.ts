import { Curve, Vector3 } from 'three';

export class VerticalLineCurve extends Curve<Vector3> {
	height: number;
	constructor(height: number) {
		super();
		this.height = height;
	}

	getPoint(t: any, optionalTarget = new Vector3()) {
		return optionalTarget.set(0, this.height * t, 0);
	}
}
