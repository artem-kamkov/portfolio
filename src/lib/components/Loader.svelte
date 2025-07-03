<script>
	import { animate, stagger } from 'motion';
    import { onMount } from 'svelte';


	onMount(() => {
		const dots = document.querySelectorAll('.dot');
		animate(
			dots,
			{ y: -30 },
			{
				duration: 0.6,
				repeat: Infinity,
				repeatType: 'mirror',
				ease: 'easeInOut',
				times: [0, 0.5, 1],
				delay: stagger(0.2, { startDelay: -0.5 })
			}
		);
	});
</script>

<div class="loader-container">
	<div class="dot dot-1"></div>
	<div class="dot dot-2"></div>
	<div class="dot dot-3"></div>
</div>

<style>
	.loader-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.dot {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: #ff0088;
		will-change: transform;
	}
</style>
