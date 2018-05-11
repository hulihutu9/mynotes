const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    let category = await this.model('category').select();
    this.assign('data', category);
    return this.display();
  }

  async deleteAction() {
    if (this.isPost) {
      let id = this.post('id')
      let categoryModel = this.model('category');
      let deleteNum = categoryModel.where({'id': id}).delete();
      let result = deleteNum ? true : false;
      return this.json({'success': result});
    }    
  }
};
