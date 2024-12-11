/**
 * Utilitário que visa diminuir a quantidade de chamadas de uma função com um tempo determinado
 * @param callback
 * @param time
 */
export function useDebounce<T extends unknown[], U>(
	callback: (...args: T) => PromiseLike<U> | U,
	time: number
) {
	let timer: ReturnType<typeof setTimeout> | undefined;

	return (...args: T): Promise<U> => {
		clearTimeout(timer);
		return new Promise((resolve) => {
			timer = setTimeout(() => resolve(callback(...args)), time);
		});
	};
}
