<template>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
		<defs>
			<filter id="text-goo">
				<feGaussianBlur in="SourceGraphic" stdDeviation="1.7" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -6"
					result="goo"
				/>
				<feComposite in="SourceGraphic" in2="goo" operator="atop" />
			</filter>
		</defs>
	</svg>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
		<defs>
			<filter id="small-text-goo">
				<feGaussianBlur in="SourceGraphic" stdDeviation="1.3" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 9 -3"
					result="goo"
				/>
				<feComposite in="SourceGraphic" in2="goo" operator="atop" />
			</filter>
		</defs>
	</svg>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
		<defs>
			<filter id="goo">
				<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -5"
					result="goo"
				/>
				<feComposite in="SourceGraphic" in2="goo" operator="atop" />
			</filter>
		</defs>
	</svg>
	<Player
		playerName="Player 1"
		align="left"
		:totalScore="totalScore[0]"
		:roundScore="roundScore[0]"
		:isWinning="winning === 0"
		:isActive="active === 0"
	/>

	<main class="board">
		<button class="btn roll" @click="roll" :disabled="boardDisabled">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<title>ic24-rotate</title>
				<g fill="#000000">
					<path
						fill-rule="evenodd"
						d="M4.983 11a1 1 0 0 1 1.008.867l.009.116.003.224a6 6 0 0 0 6.554 5.768l-.264-.268a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414-1.414l.318-.316A8.1 8.1 0 0 1 12 20c-4.231 0-7.711-3.29-7.983-7.49l-.013-.252L4 12.017A1 1 0 0 1 4.983 11zm6.724-8.707a1 1 0 0 1 .083 1.32l-.083.094-.318.316A8 8 0 0 1 20 12a1 1 0 0 1-1.999 0 6 6 0 0 0-6.557-5.975l.264.268a1 1 0 0 1-1.32 1.497l-.094-.083-2-2a1 1 0 0 1-.083-1.32l.083-.094 2-2a1 1 0 0 1 1.414 0z"
					></path>
				</g>
			</svg>
		</button>
		<Dices class="dices" @dice-click="diceClick" />
		<button class="btn keep" @click="keep" :disabled="boardDisabled">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<g class="nc-icon-wrapper" fill="#000000">
					<path
						fill-rule="evenodd"
						d="M21 16a1 1 0 0 1 .993.883L22 17v2a3 3 0 0 1-2.824 2.995L19 22H5a3 3 0 0 1-2.995-2.824L2 19v-2a1 1 0 0 1 1.993-.117L4 17v2a1 1 0 0 0 .883.993L5 20h14a1 1 0 0 0 .993-.883L20 19v-2a1 1 0 0 1 1-1zM12 2a1 1 0 0 1 1 1v9.585l1.293-1.292a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 .083 1.32l-.083.094-3 3-.044.042-.068.055-.11.071-.114.054-.105.035-.149.03L12 16l-.075-.003-.126-.017-.111-.03-.111-.044-.098-.052-.096-.067a1.006 1.006 0 0 1-.09-.08l-3-3a1 1 0 0 1 1.32-1.497l.094.083L11 12.585V3a1 1 0 0 1 1-1z"
					/>
				</g>
			</svg>
		</button>
	</main>

	<Player
		playerName="Player 2"
		align="right"
		:totalScore="totalScore[1]"
		:roundScore="roundScore[1]"
		:isWinning="winning === 1"
		:isActive="active === 1"
	/>
</template>

<script>
import { mapState } from 'vuex'

import Dices from '@/components/Dices'
import Player from '@/components/Player'

export default {
	name: 'App',
	components: {
		Dices,
		Player,
	},
	data() {
		return {
			totalScore: [1250, 660],
			roundScore: [0, 450],
			active: 1,
		}
	},
	computed: {
		winning() {
			return this.totalScore[0] > this.totalScore[1] ? 0 : 1
		},
		...mapState(['boardDisabled']),
	},
	methods: {
		roll() {
			this.$store.dispatch('roll')
		},
		diceClick(diceId) {
			this.$store.dispatch('select', diceId)
		},
	},
	mounted() {
		this.$store.dispatch('roll')
	},
}
</script>

<style lang="scss" src="./scss/app.scss" />

<style lang="scss">
@use 'scss/library/colors' as color;
@use 'scss/library/ms' as *;

.board {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ms(2) auto;
}

.dices {
	margin: 0 ms(1);
}

.btn {
	$size: gs(2);
	position: relative;
	width: $size;
	height: $size;
	background: transparent;
	border-radius: 50%;
	border: none;
	outline: none;
	cursor: pointer;
	svg {
		width: $size/1.618;
		path {
			fill: color.$main;
			transition: fill 0.2s;
		}
	}
	&:before {
		content: '';
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: color.$pale;
		clip-path: circle(0 at 50% 50%);
		transition: clip-path 0.2s;
	}

	&:not(:disabled):hover {
		svg path {
			fill: color.$dark;
		}
		&::before {
			clip-path: circle(100% at 50% 50%);
		}
	}

	@keyframes circle-animation {
		50% {
			opacity: 1;
			clip-path: circle(100% at 50% 50%);
		}
		to {
			opacity: 0;
			clip-path: circle(0 at 50% 50%);
		}
	}

	&:not(:disabled):active:before {
		animation: circle-animation 0.4s;
	}

	&:disabled {
		svg path {
			fill: color.$pale;
		}
	}
}
</style>
