
type configType = {
	url : string,
	data ?: any,
	header ?: any,
	method ?: 'GET' | 'POST'
}
const requests = (config : configType) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: '/api'+config.url, //仅为示例，并非真实接口地址。
			data: config.data,
			method: config.method || 'GET',
			header: {
				...config.header || {}
			},
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
export default requests