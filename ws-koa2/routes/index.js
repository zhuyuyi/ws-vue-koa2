const router = require('koa-router')()

router.prefix('/api')

router.get('/ws', async (ctx, next) => {
  console.log(ctx.cookies)
  ctx.body = {
    msg: '你好'
  }
})

module.exports = router
