module.exports = class extends think.Controller {
  async __before() {
    if(this.ctx.controller === 'user' && this.ctx.action === 'login' ){ //如果是user_login那么就不验证了，直接返回给予登录。 
        return;   
    } 
    let userinfo =await this.session('userinfo')
    if (!think.isEmpty(userinfo)){  
      this.assign('userinfo',userinfo);  
    }else{  
      return this.redirect('/user/login');  
    }  
  }
};
