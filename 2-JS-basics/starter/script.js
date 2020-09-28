function calculateTips(...bills) {
	const tips = []
	const total = bills.map(price => {
		let p = 0.2

		if (price > 50 && price < 200) p = 0.15
		else if (price > 200) p = 0.1

		const tip = price * p

		tips.push(tip)
		return tip + price
	})

	return {
		bills,
		tips,
		total,
	}
}

console.log(calculateTips(124, 48, 268))
