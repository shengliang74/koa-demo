// app/middleware/robot.js
// options === app.config.robot
// module.exports = (options, app) => {
//   return async function robotMiddleware(ctx, next) {
//     const source = ctx.get('user-agent') || '';
//     const match = options.ua.some(ua => ua.test(source));
//     if (match) {
//       ctx.status = 403;
//       ctx.message = 'Go away, robot.';
//     } else {
//       await next();
//     }
//   }
// };

module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    console.log("1111111111111111111baidu");
    console.log(options,source);
    const match = options.ua.some(ua => ua.test(source));
    if(match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot.';
    }else{
      await next();
      ctx.status = 403;
      ctx.message = 'Go away, robot.aaa';
    }
  }
}