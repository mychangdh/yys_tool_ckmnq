import request from './request'
export const getGodsApi = (data : any) => request({
	url: '/getGods',
	data
})