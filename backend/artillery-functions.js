module.exports = {
    email: function (equestParams, ctx, ee, next) {
      ctx.vars["email"] = `user${Math.floor(Math.random() * 1000)}@example.com`;
      next()
    }
  };
  