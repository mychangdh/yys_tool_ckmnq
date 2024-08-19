
type configType = {
	url : string,
	data ?: any,
	header ?: any,
	method ?: 'GET' | 'POST',
	baseURL ?: string
}
const requests = (config : configType) => {
	return new Promise((resolve, reject) => {

		uni.request({
			// #ifndef H5
			url: (config.baseURL !== undefined ? config.baseURL : 'https://www.cdhtsl8.cn/ckmnqapi') + config.url,
			// #endif
			// #ifdef  H5
			url: (config.baseURL !== undefined ? config.baseURL : '/ckmnqapi') + config.url,
			// #endif
			data: config.data,
			method: config.method || 'GET',
			header: {
				...config.header || {}
			},
			timeout: 100000,
			success: (res) => {
				console.log(res, 224);
				resolve(res.data)
			},
			fail: (err) => {
				console.log(err, 2435);
				reject(err)
			}
		});
	})
}
export default requests