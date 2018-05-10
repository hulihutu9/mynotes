const Base = require('./base.js');

module.exports = class extends Base {
  
  async indexAction() {
    // 如果是POST过来登录信息
    if (this.isPost) {
      let name = this.post('name');
      let password = this.post('password');

      let data = await this.model('user').where({name:name, password:password}).find();
      // 用户名、密码不正确
      if (think.isEmpty(data)) {
        this.assign('error', '用户名或密码错误');
        return this.display();
      } else {
        await this.session('userinfo', data);
        return this.redirect('/notes/index');
      }
    }

    return this.display();
  }
  
  async logoutAction() {
    await this.session(null);
    return this.redirect('/');;
  }
};
