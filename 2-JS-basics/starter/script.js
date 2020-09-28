class ValueRange {
	constructor(min, max, p) {
		this.min = min
		this.max = max
		this.p = p
	}
}

const tipCalculator = {
	bills: [124, 48, 268, 180, 42],
	pRanges: [
		new ValueRange(null, 50, 0.2),
		new ValueRange(50, 200, 0.15),
		new ValueRange(200, null, 0.1),
	],
	calculateTip() {
		const { bills } = this,
			tips = [],
			percent = [],
			total = bills.map(price => {
				for (let i = 0; i < this.pRanges.length; i++) {
					const { min, max, p } = this.pRanges[i]
					if (min !== null && price < min) continue
					if (max !== null && price > max) continue
					const tip = price * p
					tips.push(tip)
					percent.push(p)
					return tip + price
				}
			})

		return { bills, percent, tips, total }
	},
}

console.table(tipCalculator.calculateTip())
