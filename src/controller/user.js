const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    return this.display();
  }

  async loginAction() {
    // 如果是POST过来登录信息
    if (this.isPost) {
      const name = this.post('name');
      const password = this.post('password');

      const data = await this.model('user').where({ name: name, password: password }).find();
      // 用户名、密码不正确
      if (think.isEmpty(data)) {
        this.assign('error', '用户名或密码错误');
        return this.display();
      } else {
        await this.session('userinfo', data);
        return this.redirect('/index/index');
      }
    }
    return this.display();
  }
};
