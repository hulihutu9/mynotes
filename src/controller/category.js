const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    return this.display();
  }

  async listAction() {
    const category = await this.model('category').select();
    return this.json({ 'category': category });
  }

  async addAction() {
    return this.display();
  }

  async deleteAction() {
    if (this.isPost) {
      const id = this.post('id');
      const categoryModel = this.model('category');

      const deleteNum = categoryModel.where({ 'id': id }).delete();
      if (deleteNum) {
        return this.json({ 'success': true });
      } else {
        return this.json({ 'success': false });
      }
    }
  }
};
