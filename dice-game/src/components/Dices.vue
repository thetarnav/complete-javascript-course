<template>
	<transition-group appear name="dices" tag="div" class="dices">
		<div
			v-for="(dice, diceIndex) in dices"
			:key="diceIndex"
			class="dice"
			:data-nr="dice"
			@click="roll(diceIndex)"
		>
			<ul class="dots">
				<li v-for="(dot, index) in 9" :key="index" class="dot active"></li>
			</ul>
			<ul class="dots">
				<li
					v-for="(dot, index) in 9"
					:key="index"
					class="dot inactive"
				></li>
			</ul>
		</div>
	</transition-group>
</template>

<script>
import { random } from '@/js/utilities'

export default {
	data() {
		return {
			dices: [],
		}
	},
	methods: {
		roll(n) {
			if (typeof n !== 'number') {
				const max = this.dices.length || 5

				this.dices = []
				for (let i = 0; i < max; i++) {
					this.dices.push(random(1, 6, 'round'))
				}
			} else {
				this.dices[n] = random(1, 6, 'round')
			}
		},
		add() {
			this.roll(this.dices.length)
		},
		pop() {
			this.dices.pop()
		},
	},
	mounted() {
		this.roll()
	},
}
</script>

<style lang="scss" scoped>
@use '../scss/library/colors' as color;
@use '../scss/library/ms' as *;

$size: gs(2);
$margin: $size / 1.618;
$dot-size: $size / 1.618 / 1.618 / 1.618;
$padding: 0;

.dices {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: center;
	max-width: $size * 3 + $margin * 3;
}
.dice {
	position: relative;
	height: $size;
	width: $size;
	margin: $margin / 2;
	cursor: pointer;

	.dots {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		filter: url('#goo');
	}

	$mid: calc(50% - #{$dot-size}/ 2);
	@mixin middle {
		left: $mid;
		top: $mid;
	}
	@mixin top-right {
		right: $padding;
		top: $padding;
	}
	@mixin bottom-left {
		left: $padding;
		bottom: $padding;
	}
	@mixin bottom-right {
		right: $padding;
		bottom: $padding;
	}
	@mixin top-left {
		left: $padding;
		top: $padding;
	}
	@mixin left-middle {
		left: $padding;
		top: $mid;
	}
	@mixin right-middle {
		right: $padding;
		top: $mid;
	}

	@mixin hidden-dot {
		transform: scale(0);
	}
	@mixin visible-dot {
		transform: scale(1);
	}
	@mixin active-dot {
		@include visible-dot;
		&.inactive {
			@include hidden-dot;
		}
	}

	.dot {
		position: absolute;
		display: block;
		width: $dot-size;
		height: $dot-size;
		background: color.$main;
		border-radius: 50%;

		transition: transform 0.4s;
		&.active {
			background: color.$dark;
			@include hidden-dot;
		}

		&:nth-of-type(1) {
			@include top-left;
		}
		&:nth-of-type(2) {
			@include top-right;
		}
		&:nth-of-type(3) {
			@include bottom-right;
		}
		&:nth-of-type(4) {
			@include bottom-left;
		}
		&:nth-of-type(5) {
			@include left-middle;
		}
		&:nth-of-type(6) {
			@include right-middle;
		}
		&:nth-of-type(7) {
			top: $padding;
			left: $mid;
		}
		&:nth-of-type(8) {
			@include middle;
		}
		&:nth-of-type(9) {
			bottom: $padding;
			left: $mid;
		}
	}

	&[data-nr='1'] .dot {
		&:nth-of-type(8) {
			@include active-dot;
		}
	}
	&[data-nr='2'] .dot {
		&:nth-of-type(2),
		&:nth-of-type(4) {
			@include active-dot;
		}
	}
	&[data-nr='3'] .dot {
		&:nth-of-type(2),
		&:nth-of-type(4),
		&:nth-of-type(8) {
			@include active-dot;
		}
	}
	&[data-nr='4'] .dot {
		&:nth-of-type(1),
		&:nth-of-type(2),
		&:nth-of-type(3),
		&:nth-of-type(4) {
			@include active-dot;
		}
	}
	&[data-nr='5'] .dot {
		&:nth-of-type(1),
		&:nth-of-type(2),
		&:nth-of-type(3),
		&:nth-of-type(4),
		&:nth-of-type(8) {
			@include active-dot;
		}
	}
	&[data-nr='6'] .dot {
		&:nth-of-type(1),
		&:nth-of-type(2),
		&:nth-of-type(3),
		&:nth-of-type(4),
		&:nth-of-type(5),
		&:nth-of-type(6) {
			@include active-dot;
		}
	}
}

.dice {
	transition: transform 0.5s;
}
.dices-enter,
.dices-leave-to {
	.dot {
		transform: scale(0) !important;
	}
}
.dices-leave-active {
	position: absolute;
}

.buttons {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
}
.btn {
	position: relative;
	width: $size;
	height: $size;
	margin: $margin/2;
	background: transparent;
	border: none;
	cursor: pointer;
	svg {
		width: $size/1.618;
		path {
			fill: color.$main;
			transition: fill 0.2s;
		}
	}
	&:hover {
		svg path {
			fill: color.$dark;
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
		background-color: color.$main;
		clip-path: circle(0 at 50% 50%);

		opacity: 0;
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
	&:active:before {
		animation: circle-animation 0.4s;
	}
}
</style>
