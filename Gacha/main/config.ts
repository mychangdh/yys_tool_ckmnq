export type probabilityType = {
	value : number,
	probavility : number

}
// 60保底的出货概率
export const Guarantees60Data : { [key in 'SSR' | 'SP']: { [key in 'notFull' | 'full']: probabilityType[] } } = {
	SSR: {
		// SSR的非全图概率n
		notFull: [
			{
				value: 0,
				probavility: 0.04
			}, {
				value: 60,
				probavility: 0.07
			}, {
				value: 120,
				probavility: 0.11
			}, {
				value: 180,
				probavility: 0.15
			}, {
				value: 240,
				probavility: 0.2
			}, {
				value: 300,
				probavility: 0.25
			}, {
				value: 360,
				probavility: 0.3
			}, {
				value: 420,
				probavility: 0.4
			}, {
				value: 480,
				probavility: 0.5
			}, {
				value: 540,
				probavility: 0.6
			}, {
				value: 600,
				probavility: 0.7
			}, {
				value: 660,
				probavility: 0.8
			}, {
				value: 720,
				probavility: 0.9
			}, {
				value: 780,
				probavility: 1
			},
		],

		// SSR的全图概率
		full: [
			{
				value: 0,
				probavility: 0.15
			}, {
				value: 60,
				probavility: 0.17
			}, {
				value: 120,
				probavility: 0.19
			}, {
				value: 180,
				probavility: 0.25
			}, {
				value: 240,
				probavility: 0.35
			}, {
				value: 300,
				probavility: 0.45
			}, {
				value: 360,
				probavility: 0.60
			}, {
				value: 420,
				probavility: 0.8
			}, {
				value: 450,
				probavility: 1
			},
		]
	},
	// SP的非全图概率
	SP: {
		notFull: [
			{
				value: 0,
				probavility: 0.03
			}, {
				value: 60,
				probavility: 0.05
			}, {
				value: 120,
				probavility: 0.08
			}, {
				value: 180,
				probavility: 0.1
			}, {
				value: 240,
				probavility: 0.15
			}, {
				value: 300,
				probavility: 0.2
			}, {
				value: 360,
				probavility: 0.25
			}, {
				value: 420,
				probavility: 0.3
			}, {
				value: 480,
				probavility: 0.4
			}, {
				value: 540,
				probavility: 0.5
			}, {
				value: 600,
				probavility: 0.7
			}, {
				value: 660,
				probavility: 0.8
			}, {
				value: 720,
				probavility: 0.9
			}, {
				value: 780,
				probavility: 1
			},
		],
		// SP的全图概率
		full: [
			{
				value: 0,
				probavility: 0.10
			}, {
				value: 60,
				probavility: 0.12
			}, {
				value: 120,
				probavility: 0.14
			}, {
				value: 180,
				probavility: 0.18
			}, {
				value: 240,
				probavility: 0.25
			}, {
				value: 300,
				probavility: 0.4
			}, {
				value: 360,
				probavility: 0.55
			}, {
				value: 420,
				probavility: 0.8
			}, {
				value: 450,
				probavility: 1
			},
		]
	}
}

// 3up的出货概率
export const UP_3Data : { [key in 'SSR' | 'SP']: { [key in 'notFull' | 'full']: probabilityType[] } } = {
	SSR:  {
		// SSR的非全图概率
		notFull: [
			{
				value: 0,
				probavility: 0.04
			}, {
				value: 50,
				probavility: 0.05
			}, {
				value: 100,
				probavility: 0.06
			}, {
				value: 150,
				probavility: 0.07
			}, {
				value: 200,
				probavility: 0.08
			}, {
				value: 250,
				probavility: 0.9
			}, {
				value: 300,
				probavility: 0.1
			}, {
				value: 350,
				probavility: 0.11
			}, {
				value: 400,
				probavility: 0.12
			}, {
				value: 450,
				probavility: 0.15 
			}, {
				value: 500,
				probavility: 0.2
			}, {
				value: 600,
				probavility: 0.3
			},
		],
		// SSR的全图概率
		full: [
			{
				value: 0,
				probavility: 0.15
			}, {
				value: 50,
				probavility: 0.2
			}, {
				value: 100,
				probavility: 0.25
			}, {
				value: 150,
				probavility: 0.3
			}, {
				value: 200,
				probavility: 0.35
			}, {
				value: 250,
				probavility: 0.4
			}, {
				value: 300,
				probavility: 0.45
			}, {
				value: 350,
				probavility: 0.5
			}, {
				value: 400,
				probavility: 0.6
			}, {
				value: 450,
				probavility: 0.8
			}, {
				value: 500,
				probavility: 1
			},
		]
	},
	// SP的非全图概率
	SP: {
		notFull: [
			{
				value: 0,
				probavility: 0.03
			}, {
				value: 50,
				probavility: 0.04
			}, {
				value: 100,
				probavility: 0.05
			}, {
				value: 150,
				probavility: 0.06
			}, {
				value: 200,
				probavility: 0.08
			}, {
				value: 250,
				probavility: 0.1
			}, {
				value: 300,
				probavility: 0.11
			}, {
				value: 350,
				probavility: 0.12
			}, {
				value: 400,
				probavility: 0.13
			}, {
				value: 450,
				probavility: 0.14
			}, {
				value: 500,
				probavility: 0.15
			}, {
				value: 600,
				probavility: 0.25
			},
		],
		// SP的全图概率
		full: [
			{
				value: 0,
				probavility: 0.1
			}, {
				value: 50,
				probavility: 0.15
			}, {
				value: 100,
				probavility: 0.2
			}, {
				value: 150,
				probavility: 0.25
			}, {
				value: 200,
				probavility: 0.3
			}, {
				value: 250,
				probavility: 0.35
			}, {
				value: 300,
				probavility: 0.4
			}, {
				value: 350,
				probavility: 0.5
			}, {
				value: 400,
				probavility: 0.6
			}, {
				value: 450,
				probavility: 0.8
			}, {
				value: 500,
				probavility: 1
			},
		]
	}
}