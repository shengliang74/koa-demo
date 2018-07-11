const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = options => {
  return async function gzip(ctx, next) {
    await next();

    let body = ctx.body;
    if(!body) return;
    if(isJSON(body)) body = JSON.stringify(body);
    console.log("111111111111111111111111111",options.threshold);
    if(options.threshold && ctx.length < options.threshold) return;

    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    ctx.set('Content-Encoding','gzip');
  }
}