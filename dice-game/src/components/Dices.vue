<template>
	<transition-group appear name="dices" tag="div" class="dices">
		<div
			v-for="dice in dices"
			:key="dice.id"
			class="dice"
			:data-nr="dice.nr"
			@click="click(dice.id)"
			:class="{ selected: dice.isSelected, disabled: dice.isDisabled || dice.isGone }"
		>
			<ul class="dots">
				<li v-for="(dot, index) in 9" :key="index" class="dot active"></li>
			</ul>
			<ul class="dots">
				<li v-for="(dot, index) in 9" :key="index" class="dot inactive"></li>
			</ul>
		</div>
	</transition-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Dices',
	data() {
		return {}
	},
	computed: {
		...mapState(['dices']),
	},
	methods: {
		click(id) {
			this.$emit('dice-click', id)
		},
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

		transition: transform 0.4s, background 0.2s;
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

.selected {
	background-color: red;
	.inactive {
		// background: color.$pale;
	}
}
.disabled {
	// opacity: 0.5;
	.dot.inactive {
		background: color.$pale;
	}
	.dot.active {
		background: color.$main;
	}
}
</style>
