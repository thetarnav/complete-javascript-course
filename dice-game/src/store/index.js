import { createStore } from 'vuex'
import { random } from '@/js/utilities'

export default createStore({
	state: {
		dices: [],
		nDices: 9,
		boardDisabled: false,
	},
	mutations: {
		roll(state) {
			state.dices = state.dices.map(dice => ({
				id: dice.id,
				nr: rollDice(),
				isSelected: false,
				isGone: dice.isSelected,
				isDisabled: false,
			}))
		},
	},
	actions: {
		roll({ state, commit, dispatch }) {
			if (state.dices.length === 0) {
				const max = state.nDices
				for (let i = 0; i < max; i++) {
					state.dices.push({
						id: i,
						nr: rollDice(),
						isSelected: false,
						isGone: false,
						isDisabled: false,
					})
				}
			} else commit('roll')

			dispatch('disable')
		},
		select({ state, getters, dispatch }, id) {
			const { selected } = getters,
				dice = state.dices[id],
				chain = unfinished(selected)

			// No dice is selected:
			if (selected.length === 0) dice.isSelected = true
			// Clicked dice is selected:
			else if (dice.isSelected) dice.isSelected = false
			// Clicked dice is not selected:
			else if (chain === undefined || parseInt(chain) === dice.nr) dice.isSelected = true
			else return

			// Disabling dices:
			dispatch('disable')
		},
		disable({ state, getters }) {
			const chain = unfinished(getters.selected)
			let noneDisabled = true

			state.dices = state.dices.map(dice => {
				let isDisabled
				if (chain === undefined || parseInt(chain) === dice.nr) isDisabled = false
				else {
					isDisabled = true
					noneDisabled = false
				}
				return {
					...dice,
					isDisabled,
				}
			})

			state.boardDisabled = !noneDisabled
		},
	},
	getters: {
		selected: state => {
			return state.dices.filter(dice => dice.isSelected === true)
			// const ids = []
			// state.dices.forEach(dice => dice.isSelected && ids.push(dice.id))
			// return ids
		},
	},
})

function rollDice() {
	return random(1, 6, 'round')
}

function countDices(dices) {
	const count = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
	}
	dices.forEach(dice => count[dice.nr]++)
	return count
}

// finds uncompleted chain:
function unfinished(selected) {
	const count = countDices(selected)

	return Object.keys(count).find(nr => nr !== '1' && nr !== '5' && count[nr] > 0 && count[nr] < 3)
}
