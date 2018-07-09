const Controller = require('egg').Controller;

class NewsController extends Controller {
	async list(){
		const ctx = this.ctx;
		const page = ctx.query.page || 1;
		// console.log("222222222222222222222222222222222",page);
		// const newsList = await ctx.service.news.list(page);
		// console.log("55555555555555555555555555555555555",newsList);
		// await ctx.render('news/list.tpl', {list: newsList});
		this.ctx.body = 'Hello world2';
	}
}

module.exports = NewsController;