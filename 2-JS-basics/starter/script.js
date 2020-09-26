const bmi = (m, h) => m / h ** 2

class BMI {
	constructor(height, mass) {
		this.height = height
		this.mass = mass
		this._bmi = bmi(mass, height)
	}

	get bmi() {
		return this._bmi
	}
}

const markBMI = new BMI(1.79, 70)
const johnBMI = new BMI(1.83, 80)

console.log(`Is Marks's BMI higher than John's? ${markBMI.bmi > johnBMI.bmi}`)
