const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    let userinfo = await this.session('userinfo');
    this.assign('userinfo', userinfo);
    return this.display();
  }
};
