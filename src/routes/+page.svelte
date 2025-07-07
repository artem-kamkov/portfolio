<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { portfolioItem } from '$lib/types/portfolioItem';
	import Year from '$lib/components/Year.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import NightToggle from '$lib/components/NightToggle.svelte';
	import PortfolioItem from '$lib/components/PortfolioItem.svelte';
	import SmItem from '$lib/components/sm/SMItem.svelte';
	import { inView } from 'motion';
	import { animateIn, animateOut, animateStartIn } from '$lib/utils/animations';

	let items: portfolioItem[] = [];

	const gitUrl = import.meta.env.VITE_GIT_URL;
	const LinkedinUrl = import.meta.env.VITE_LINKEDIN_URL;

	function smoothScroll(node) {
		node.addEventListener('click', (event) => {
			const target = document.querySelector(node.getAttribute('href'));
			if (target) {
				event.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});

		return {
			destroy() {
				node.removeEventListener('click', event);
			}
		};
	}

	async function fetchItems(): Promise<void> {
		const res1 = await fetch('/api/items');
		const res2 = await fetch(import.meta.env.VITE_GITHUB_API_URL);

		const DBData = await res1.json();
		const githubData = await res2.json();
		const transformedGithubData = githubData.map((repo) => ({
			id: repo.id,
			title: repo.name,
			description: repo.description || 'No description provided.',
			img_url: null,
			url: repo.html_url
		}));

		items = [...DBData, ...transformedGithubData];
	}
	let pageLoaded = false;
	onMount(async () => {
		await fetchItems();
		await tick();

		const img = new Image();
		img.src = '/main-bg.jpg';
		img.onload = () => {
			pageLoaded = true;

			tick().then(() => {
				const sections = document.querySelectorAll('.start-anim');
				sections.forEach((el) => {
					animateStartIn(el);
				});

				inView('body .scroll-anim', (element) => {
					animateIn(element);
					return () => animateOut(element);
				});
			});
		};
	});
</script>

{#if !pageLoaded}
	<div class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black">
		<Loader />
	</div>
{/if}
{#if pageLoaded}
	<div
		class="content font-sans text-xl text-[var(--color-secondary)] leading-normal antialiased border-t-6 border-primary"
	>
		<div id="header" class="bg-black relative text-lg">
			<div class="w-full m-auto pb-8">
				<img class="absolute inset-0 w-full h-full object-cover" src="/main-bg.jpg" alt="" />
				<div
					class="absolute inset-0 w-full h-full bg-transparent dark:bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_rgba(0,0,0,0.6)_100%)]"
				></div>

				<div class="relative container px-4 mx-auto text-[var(--color-contrast)] py-6 pb-32">
					<div class="sm:flex text-center">
						<div class="start-anim scroll-anim sm:flex-1 text-2xl font-bold sm:text-left mb-4">
							<a href="/" class="hover:opacity-70 transition">Artem Kamkov</a>
						</div>
						<div class="start-anim scroll-anim sm:flex-2 sm:text-right">
							<ul class="text-2xl">
								<li class="inline-block mr-6"><NightToggle /></li>
								<li class="inline-block mr-6">
									<SmItem sm="github" link={gitUrl} ariaLabel="Github" />
								</li>
								<li class="inline-block">
									<SmItem sm="linkedin" link={LinkedinUrl} ariaLabel="LinkedIn" />
								</li>
							</ul>
						</div>
					</div>

					<div
						class="start-anim scroll-anim content mx-auto text-shadow-xl font-semibold text-center pt-20"
					>
						<h1 class="text-5xl font-bold mb-6 drop-shadow-lg text-[var(--color-contrast)]">
							Hi, I'm Artem, a Full-Stack Developer <br />with 7 Years of Experience
						</h1>
						<p
							class="text-2xl sm:text-3xl sm:leading-snug leading-snug mb-8 drop-shadow-lg text-[var(--color-contrast)]"
						>
							Building scalable, high-performance web applications <br />with modern technologies
						</p>
						<a
							class="bg-[rgba(46,46,37,.9)] hover:bg-[rgba(46,46,37,.7)] text-[var(--color-contrast)] font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
							href="#projects"
							use:smoothScroll>View My Work</a
						>
					</div>
				</div>
			</div>

			<svg
				class="absolute z-0 left-0 bottom-0 block w-full h-8 sm:h-24"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
			>
				<polygon class="fill-[var(--color-bg-secondary)]" points="0,100 100,0 100,100"></polygon>
			</svg>
		</div>

		<div id="content" class="bg-[var(--color-bg-secondary)]">
			<div id="projects">
				<div class="max-w-6xl mx-auto px-6 py-10 sm:py-20">
					<h2
						class="scroll-anim mt-6 text-3xl tracking-tight font-bold text-[var(--color-primary)] sm:text-4xl md:text-5xl text-center"
					>
						Projects
					</h2>
					<div class="flex flex-wrap gap-4 mt-12 mb-12 md:mb-16">
						{#each items as item}
							<PortfolioItem {item} />
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div id="about" class="relative bg-[var(--color-bg-primary)] overflow-hidden">
			<div class="container px-4 mx-auto flex">
				<div class="relative z-10 py-10 sm:py-20 bg-[var(--color-bg-primary)] w-full lg:w-1/2">
					<svg
						class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-[var(--color-contrast)] transform translate-x-1/2"
						fill="currentColor"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<polygon class="fill-[var(--color-bg-primary)]" points="50,0 100,0 50,100 0,100"
						></polygon>
					</svg>

					<div class="start-anim scroll-anim relative">
						<div class="sm:text-center lg:text-left">
							<h2
								class="mb-4 text-3xl tracking-tight font-bold text-[var(--color-primary)] sm:text-4xl md:text-5xl"
							>
								About me
							</h2>
							<div
								class="mb-6 text-base text-[var(--color-secondary)] sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0"
							>
								<p class="mb-4">
									I’m a full-stack developer with 7 years of experience in building high-performance
									websites and applications using modern technologies like Vue.js, Laravel, and
									WordPress.
								</p>
								<p class="mb-4">
									I’ve contributed to projects for leading Ukrainian and UK companies, focusing on
									creating scalable, maintainable solutions. My expertise includes front-end
									development with Vue.js and back-end solutions with Laravel.
								</p>
								<p class="mb-6">
									I’m passionate about solving complex problems and ensuring seamless user
									experiences through fast, reliable, and intuitive web applications.
								</p>

								<h3 class="text-2xl font-semibold text-[var(--color-primary)] mb-4">Skills</h3>
								<ul class="grid grid-cols-2 gap-4">
									<li>Vue.js</li>
									<li>Laravel</li>
									<li>WordPress</li>
									<li>HTML & CSS</li>
									<li>JavaScript</li>
									<li>PHP</li>
									<li>MySQL</li>
									<li>Git & Docker</li>
									<li>React</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
				<img
					class="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
					src="/last-bg2.jpg"
					alt=""
				/>
			</div>
		</div>
		<div class="bg-[var(--color-bg-secondary)]">
			<div class="container mx-auto px-4">
				<div class="start-anim scroll-anim py-4 sm:flex text-center">
					<div class="sm:flex-1 sm:text-right sm:order-2 mb-1 sm:mb-0">
						<ul class="text-2xl">
							<li class="inline-block mr-6">
								<a
									href={gitUrl}
									class="hover:opacity-70 transition"
									target="_blank"
									rel="noopener"
									aria-label="Github"
								>
									<svg
										class="enlarge w-6 h-6"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 496 512"
										><path
											d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
										></path></svg
									>
								</a>
							</li>
							<li class="inline-block">
								<a
									href={LinkedinUrl}
									class="hover:opacity-70 transition"
									target="_blank"
									rel="noopener"
									aria-label="LinkedIn"
								>
									<svg
										class="enlarge w-6 h-6"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
										><path
											d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
										></path></svg
									>
								</a>
							</li>
						</ul>
					</div>
					<Year />
				</div>
			</div>
		</div>
	</div>
{/if}
