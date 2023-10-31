export type levelType = 'N' | 'R' | 'SR' | 'SSR' | 'SP'
// 抽一次
export function mockGachaOnce(improve : number = 1) : levelType {
	const randomNum = Math.random()
	if (randomNum >= (1 - improve * 0.0025)) return 'SP'
	if (randomNum >= (1 - improve * 0.0125)) return 'SSR'
	if (randomNum >= (0.8 - improve * 0.0125)) return 'SR'
	return 'R'
}
export function mockGachaIndefinite(times : number, improve : number = 1) : levelType[] {
	const arr : levelType[] = []
	for (let i = 1; i <= times; i++) {
		arr.push(mockGachaOnce(improve))
	}
	return arr
}