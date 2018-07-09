const Service = require('egg').Service;

class NewsService extends Service {
	async list(page=1){
		const {serverUrl, pageSize} = this.config.news;
		console.log("333333333333333333333333333333333333333333333333",serverUrl, pageSize);
		console.log("4444444444444444444444444444444",`${serverUrl}/topstories.json`, {
				orderBy: '"$key"',
				startAt: `"${pageSize * (page - 1)}"`,
				endAt: `"${pageSize * page - 1}"`
			});
		// const {data: idList} = await this.ctx.curl(`${serverUrl}/topstories.json`,{
		// 	data: {
		// 		orderBy: '"$key"',
		// 		startAt: `"${pageSize * (page - 1)}"`,
		// 		endAt: `"${pageSize * page - 1}"`
		// 	},
		// 	dataType: 'json'
		// })
		const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
	      data: {
	        orderBy: '"$key"',
	        startAt: `"${pageSize * (page - 1)}"`,
	        endAt: `"${pageSize * page - 1}"`,
	      },
	      dataType: 'json',
	    });
		console.log("1111111111111111111111111111111111111111111",idList);
		const newsList = await Promise.all(
			Object.keys(idList).map(key=>{
				const url = `${serverUrl}/item/${idList[key]}.json`;
				return this.ctx.curl(url,{dataType:'json'})
			})
		);
		return newsList.map(res=> res.data);
	}
}

module.exports = NewsService;