import request from './request'
export const getGodsApi = (data : any) => request({
	url: '/getGods',
	data
})
export const getGodsRecommendApi = (data : any) => request({
	url: '/getGodsRecommend',
	data
})
export const addGodsRecommendApi = (data : any) => request({
	url: '/addGodsRecommend',
	method:'POST',
	data
})
export const updateGodsRecommendApi = (data : any) => request({
	url: '/updateGodsRecommend',
	method:'POST',
	data
})
export const deleteGodsRecommendApi = (id) => request({
	url: '/deleteGodsRecommend',
	method:'POST',
	data:{
		id
	}
})

export const getYuHun = () => request({
	url: '/getYuHun',
	method:'GET',
})
