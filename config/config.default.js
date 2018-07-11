exports.keys = "shengliang74";
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
exports.news = {
	pageSize: 5,
	serverUrl: 'https://hacker-news.firebaseio.com/v0'
};
exports.middleware = [
  'robot',
  'compress'
];
exports.robot = {
  ua: [
    /Baiduspider/i,
  ]
};
exports.compress = {
  threshold: 2048
};