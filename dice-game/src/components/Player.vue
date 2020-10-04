<template>
	<div
		class="player"
		:class="{
			rightAlign: align === 'right',
			active: isActive,
			winning: isWinning,
		}"
	>
		<header class="name">
			{{ playerName }}
			<span class="crown">
				<svg
					version="1.2"
					baseProfile="tiny"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 24 24"
					xml:space="preserve"
				>
					<polygon
						points="24,5.3 22.5,19.1 1.3,19.1 0,5.3 6.7,7.5 11.9,0.9 17.2,7.5 "
					/>
				</svg>
			</span>
		</header>
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
	filter: blur(0.45px);
}
.name {
	display: block;
	position: relative;

	filter: url(#small-text-goo);
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
		border-radius: 50%;
		transform: scale(0);
		top: calc(50% - #{ms(0)} / 2);
		margin-left: ms(-1);
		transition: clip-path 0.2s;
	}
}

.crown {
	position: absolute;
	right: 100%;
	margin-right: ms(-1);
	width: ms(1);
	height: ms(1);
	top: calc(50% - #{ms(1)} / 2);
	transform: scale(0);
	path,
	polygon {
		fill: color.$pale;
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
			transform: scale(1);
		}
	}
}

.winning {
	.crown {
		transform: scale(1);
	}
}
</style>
