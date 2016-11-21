export default function (func, delay) {
	let timer = null;
	return (...args) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			func(...args);
		}, delay);
	}
}
