import { animate } from 'motion';

export function animateStartIn(element, options = {}) {
	return animate(
		element,
		{ opacity: [0,1] },
		{
			duration: 0.9,
			easing: [0.17, 0.55, 0.55, 1],
			...options 
		}
	);
}

export function animateIn(element, options = {}) {
	return animate(
		element,
		{ opacity: 1},
		{
			duration: 0.9,
			easing: [0.17, 0.55, 0.55, 1],
			...options 
		}
	);
}

export function animateOut(element, options = {}) {
	return animate(
		element,
		{ opacity: 0 },
		{
			duration: 0.6,
			easing: [0.33, 1, 0.68, 1],
			...options
		}
	);
}