class Score {
	constructor(...scores) {
		this.scores = scores
	}

	changeScore(MatchIndex, score) {
		if (
			typeof MatchIndex !== 'number' ||
			MatchIndex >= this.scores.length ||
			typeof score !== 'number'
		)
			return

		this.scores[MatchIndex] = score
	}

	get score() {
		const total = this.scores.reduce((n, total) => total + n)
		return total
	}

	get average() {
		const average = this.score / this.scores.length
		return average
	}
}

const john = new Score(89, 120, 103)
const mike = new Score(116, 94, 123)
const mary = new Score(97, 134, 105)

john.changeScore(1, 130)

console.log(`Mike's average score: ` + mike.average)
console.log(`John's average score: ` + john.average)
console.log(`Mary's average score: ` + mary.average)

let string = `And the winner is: `

if (john.average > mary.average && john.average > mike.average) string += 'John'
else if (mary.average > john.average && mary.average > mike.average)
	string += 'Mary'
else string += 'Mike'

console.log(string)
