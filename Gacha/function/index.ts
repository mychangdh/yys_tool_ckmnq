export function getRandomElement<T>(arr : T[]) : T {
	if(!arr.length) console.error('传入数组不得为空')
	const randomNum = Math.floor(Math.random() * arr.length)
	return arr[randomNum]
}