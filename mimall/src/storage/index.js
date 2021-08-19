/**
 * 在浏览器存储数据
 * Storage封装sessionStorage 随着浏览器结束关闭
 */
const  STORAGE_KEY = 'mall';
export default{
  // 存储值 加一个a模块 或者给模块加值
  setItem(key,value,module_name){
    if (module_name){//有模块名称
      let val = this.getItem(module_name);//获取所有值
      val[key] = value;//存值
      this.setItem(module_name, val);
    }else{//无模块名称
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));//json对象转字符串
    }
  },
  // 获取某一个模块下面的属性user下面的userName
  //获取键值 module_name 模块有模块名子 而模块又是一个对象
  getItem(key,module_name){//获取对象的key值
    if (module_name){//如果有子对象
      let val = this.getItem(module_name);//进入子对象
      if(val) return val[key];
    }
    //否则说明没有模块名字，直接返回当前对象键值
    return this.getStorage()[key];
  },
  //获取整个浏览器中的信息
  getStorage(){
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
  },
  clear(key, module_name){
    let val = this.getStorage();
    if (module_name){
      if (!val[module_name])return;
      delete val[module_name][key];
    }else{
      delete val[key];
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  }
}