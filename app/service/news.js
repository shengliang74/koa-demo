const Service = require('egg').Service;
const dbMiller = require('../dao/dbMiller');

class NewsService extends Service {
	async list(page=1){
		const {serverUrl, pageSize} = this.config.news;
		console.log("333333333333333333333333333333333333333333333333",serverUrl, pageSize);
		try{
			const result = await dbMiller.findPage({name:'test',url:'abc'}, 2, 2)
			return result
		}catch(e){
			console.log("4444444444444444444444444444",e);
		}
		return {}
	}
}

module.exports = NewsService;