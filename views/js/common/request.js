/**
 * 请求再封装
 */
define(["http", "layer"], function (
    { httpRequest, unAuthError },
    layer,
    global
) {
    let request = {
        get: function (url, params = {}, config = {}) {
            return new Promise((resolve, reject) => {
                httpRequest({
                    url: window.BASE_URL + url,
                    type: "get",
                    data: params,
                    ...config,
                    beforeSend: function (xhr) {
                        // xhr.setRequestHeader(
                        //     "Authorization",
                        //     global.getToken()
                        // );
                    },
                    success: function (res) {
                        // console.log('RES :>> ', res)
                        if (res && res.code === 200) {
                            return resolve(res);
                        } else if (res.code === 401) {
                            console.log("用户信息失效 :>> ", res.message);

                            reject(res);
                        } else {
                            // layer.msg(res.message || res.msg || '网络走神了~')
                            reject(res);
                        }
                    },
                    error: function (err) {
                        console.log("ERR :>> ", err);
                        if (!err) {
                            err = { message: "网络错误" };
                        }
                        layer.msg(err.message || err.msg);
                        reject(err);
                    },
                });
            });
        },
        post: function (url, params = {}, config = {}) {
            return new Promise((resolve, reject) => {
                // console.log('url :>> ', url)
                httpRequest({
                    url: window.BASE_URL + url,
                    type: "post",
                    contentType: "application/json;charset=utf-8",
                    data: params,
                    ...config,
                    beforeSend: function (xhr) {
                        // xhr.setRequestHeader(
                        //     "Authorization",
                        //     global.getToken()
                        // );
                    },
                    success: function (res) {
                        // console.log('RES :>> ', res)
                        if (res.code === 200) {
                            resolve(res);
                        } else if (res.code === 401) {
                            console.log("用户信息失效 :>> ", res.message);
                            reject(res);
                        } else {
                            // console.log('res :>> ', res)
                            // layer.msg(res.message || res.msg || '网络走神了~')
                            reject(res);
                        }
                    },
                    error: function (err) {
                        console.log("ERR :>> ", err);
                        if (!err) {
                            err = { message: "网络错误" };
                        }
                        layer.msg(err.message || err.msg);
                        reject(err);
                    },
                });
            });
        },
    };
    return request;
});
