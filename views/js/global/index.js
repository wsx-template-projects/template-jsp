define("global", function () {
  const storage = {
    // todo token，30分钟过期，需要处理一下
    /** 获取token */
    getToken: function () {
      return localStorage.getItem("TOKEN") || "";
    },
    /** 获取encryptKey */
    getEncryptKey() {
      return localStorage.getItem("ENCRYPT_KEY");
    },
    /** 获取用户类型，个人: 1;法人: 2 */
    getUserType: function () {
      return localStorage.getItem("USER_TYPE") || "";
    },
    /**
     * 获取菜单 - list
     */
    getMenuList: function () {
      return JSON.parse(localStorage.getItem("MENU_LIST")) || [];
    },
    /**
     * 设置用户相关信息
     */
    setUserInfo: function ({ encryptKey, userInfo, token }) {
      window.token = token;
      localStorage.setItem("ENCRYPT_KEY", encryptKey);
      localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
      localStorage.setItem("TOKEN", token);
      localStorage.setItem("USER_TYPE", userInfo.usertype);
    },
    /**
     * 获取用户详情
     */
    getUserInfo: function () {
      const infoData = localStorage.getItem("USER_INFO");
      return infoData ? JSON.parse(infoData) : {};
    },
    /**
     * 清除用户相关信息
     * */
    removeUserInfo() {
      console.log("清除用户信息 :>> ");
      window.token = "";
      window.encryptKey = "";
      localStorage.setItem("ENCRYPT_KEY", "");
      localStorage.setItem("USER_INFO", "");
      localStorage.setItem("TOKEN", "");
      localStorage.setItem("USER_TYPE", "");
    },
    /**
     * 清除用户相关
     */
    // removeUserStorage() {
    //     window.token = ''
    //     window.encryptKey = ''
    //     localStorage.setItem('ENCRYPT_KEY', '')
    //     localStorage.setItem('USER_INFO', '')
    //     localStorage.setItem('TOKEN', '')
    //     localStorage.setItem('USER_TYPE', '')
    // }
  };

  const validator = {
    /** 是否法人 */
    isLegalPerson: function () {
      const userType = storage.getUserType();
      console.log("userType :>> ", userType);
      return userType == "2";
    },
    /* 是否个人 */
    isPerson: function () {
      const userType = storage.getUserType();
      console.log("userType :>> ", userType);
      return userType == "1";
    },
  };

  const global = {
    ...storage,
    ...validator,
  };

  return global;
});
