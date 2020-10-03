<template>
	<div
		class="player"
		:class="{
			rightAlign: align === 'right',
			active: isActive,
			winning: isWinning,
		}"
	>
		<header class="name">{{ playerName }}</header>
		<div class="scores">
			<span class="total">
				{{ totalScore }}
			</span>
			<span class="round" v-if="roundScore > 0"> +{{ roundScore }} </span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Player',
	props: [
		'playerName',
		'align',
		'totalScore',
		'roundScore',
		'isWinning',
		'isActive',
	],
	data() {
		return {}
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
@use '../scss/library/colors' as color;
@use '../scss/library/ms' as *;

.player {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	filter: blur(0.4px);
}
.name {
	display: block;
	position: relative;

	filter: url(#text-goo);
	font-size: ms(1);
	text-transform: uppercase;
	letter-spacing: 0.05em;

	&:after {
		content: '';
		position: absolute;
		left: 100%;
		width: ms(0);
		height: ms(0);
		background: color.$pale;
		clip-path: circle(0 at 50% 50%);
		top: calc(50% - #{ms(0)} / 2);
		margin-left: ms(-1);
		transition: clip-path 0.2s;
	}
}
.scores {
	display: flex;
	align-items: center;
}
.total {
	filter: url(#text-goo);
	font-size: ms(2);
	font-weight: 800;
	color: color.$main;
	letter-spacing: -0.02em;
}
.round {
	filter: url(#small-text-goo);
	font-size: ms(1);
	margin-left: gs(0.5);
	letter-spacing: -0.04em;
}

.rightAlign {
	margin-left: auto;
	text-align: right;
	align-items: flex-end;
}

.active {
	.name {
		&:after {
			clip-path: circle(50% at 50% 50%);
		}
	}
}
</style>
