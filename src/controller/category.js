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

  async saveAction() {
    if (this.isPost) {
      const data = this.post();
      const categoryModel = this.model('category');

      if (data.id) {
        const res = await categoryModel.where({ 'id': data.id }).update(data);
        if (res) {
          return this.json({ 'success': true });
        } else {
          return this.json({ 'success': false });
        }
      } else {
        const res = await categoryModel.add(data);
        if (res) {
          return this.json({ 'success': true });
        } else {
          return this.json({ 'success': false });
        }
      }
    }
  }

  async editAction() {
    if (this.isPost) {
      const id = this.post('id');
      const categoryModel = this.model('category');

      const category = await categoryModel.where({ 'id': id }).select();
      return this.json({ 'category': category[0] });
    }
  }

  async deleteAction() {
    if (this.isPost) {
      const id = this.post('id');
      const categoryModel = this.model('category');

      const deleteNum = await categoryModel.where({ 'id': id }).delete();
      if (deleteNum) {
        return this.json({ 'success': true });
      } else {
        return this.json({ 'success': false });
      }
    }
  }
};
