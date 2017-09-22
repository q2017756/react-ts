"use strict";
let apiHost = (__UNLOCK_API_HOST__ == 'true')
  ? require('../src/common/Configs').Server.API_HOST
  : 'http://api.game4us.com:3000/';

class SagittaClient {

  ajax (options) {
    options = options || {};
    options.type = (options.type || 'GET').toUpperCase();
    options.dataType = (options.dataType || 'json'). toLowerCase();

    const buildParam = (condition) => {
      let data = null;
      if (condition != null) {
        if (typeof condition == 'string') {
          data = condition;
        }
        if (typeof condition == 'object') {
          let arr = [];
          for (let dname in condition) {
            let dvalue = condition[dname];
            arr.push(encodeURIComponent(dname) + '=' + encodeURIComponent(dvalue));
          }
          data = arr.join('&');
        }
      }
      return data;
    };

    let url = options.url;
    let token;
    if (options.enableJWT === true && options.data.token) {
      token = options.data.token;
      delete options.data.token;
    }
    if (options.enableJWT === true && token == undefined) {
      return Promise.reject("Please log in");
    }

    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    let params = buildParam(options.data);
    let res;
    return new Promise((resolve, reject) => {
      if (options.type == 'GET' || options.type == 'DELETE') {
        if (params !== null) {
          url = url + '?' + params;
        }
        xhr.open(options.type, url, true);
      } else if (options.type == 'POST' || options.type == 'PUT' || options.type == 'PATCH') {
        xhr.open(options.type, url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      // enable jwt
      if (token) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      }
      xhr.send(params);

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          let status = xhr.status;
          let response = xhr.responseText;
          if (status >= 200 && status < 300) {
            if (options.dataType == 'json') {
              response = JSON.parse(response);
            } else if (options.dataType == 'xml') {
              response = xhr.responseXML;
            }
            res = { response: response, statusText: xhr.statusText, statusCode: xhr.status };
            resolve(res);
          } else {
            reject(response);
          }
        }
      }

    });
  }

  handleParams(uri, params, aggParams, requiredParams) {
    let data = {};

    // replace ":param" in uri
    aggParams.forEach((key, index) => {
      const value = params[index];
      let hasQueryParam = (uri.match(':' + key) !== null);
      if (requiredParams.indexOf(key) >= 0 && ((hasQueryParam && value === '') || value === undefined)) {
        throw new Error('Param ' + key + ' is required!');
      } else if (value === undefined) {
        return;
      }

      // if in uri
      if (hasQueryParam) {
        uri = uri.replace(':' + key, value);
      } else {
        data[key] = value;
      }
    });

    return { uri: uri, data: data };
  }

  postUserLogin(name, pwd) {
    let _this = this;
    let uri = '/user/login';
    let aggParams = ['name', 'pwd'];
    let requiredParams = ['name', 'pwd'];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'POST',
        timeout:    5000,
        enableJWT:  false,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  getMe(token) {
    let _this = this;
    let uri = '/user/me';
    let aggParams = [, 'token'];
    let requiredParams = [];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'GET',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  postAdminLogin(name, pwd) {
    let _this = this;
    let uri = '/admin/user/login';
    let aggParams = ['name', 'pwd'];
    let requiredParams = ['name', 'pwd'];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'POST',
        timeout:    5000,
        enableJWT:  false,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  getAdminMe(token) {
    let _this = this;
    let uri = '/admin/user/me';
    let aggParams = [, 'token'];
    let requiredParams = [];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'GET',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  getBanner(offset, limit) {
    let _this = this;
    let uri = '/banner/list';
    let aggParams = ['offset', 'limit'];
    let requiredParams = [];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'GET',
        timeout:    5000,
        enableJWT:  false,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  postCreateBanner(image, link, token) {
    let _this = this;
    let uri = '/banner/add';
    let aggParams = ['image', 'link', 'token'];
    let requiredParams = ['image'];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'POST',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  patchCreateBanner(id, image, link, token) {
    let _this = this;
    let uri = '/banner/edit';
    let aggParams = ['id', 'image', 'link', 'token'];
    let requiredParams = ['id', 'image'];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'POST',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  deleteDeleteBanner(id, token) {
    let _this = this;
    let uri = '/banner/delete';
    let aggParams = ['id', 'token'];
    let requiredParams = [];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'DELETE',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  uploadImage(token) {
    let _this = this;
    let uri = '/image/upload';
    let aggParams = [, 'token'];
    let requiredParams = [];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'POST',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  presentList(offset, limit) {
    let _this = this;
    let uri = '/present/list';
    let aggParams = ['offset', 'limit'];
    let requiredParams = [];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'GET',
        timeout:    5000,
        enableJWT:  false,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  presentAdd(gamename, icon, iconname, platformDisplay, expireTime, description, source, token) {
    let _this = this;
    let uri = '/present/add';
    let aggParams = ['gamename', 'icon', 'iconname', 'platformDisplay', 'expireTime', 'description', 'source', 'token'];
    let requiredParams = ['gamename', 'icon', 'iconname', 'platformDisplay', 'expireTime', 'description', 'source'];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'POST',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  presentDelete(pid, token) {
    let _this = this;
    let uri = '/present/delete';
    let aggParams = ['pid', 'token'];
    let requiredParams = ['pid'];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'DELETE',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  presentEdit(pid, gamename, icon, iconname, platformDisplay, expireTime, description, token) {
    let _this = this;
    let uri = '/present/edit';
    let aggParams = ['pid', 'gamename', 'icon', 'iconname', 'platformDisplay', 'expireTime', 'description', 'token'];
    let requiredParams = ['pid', 'gamename', 'icon', 'iconname', 'platformDisplay', 'expireTime', 'description'];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'POST',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  mainboardDetail() {
    let _this = this;
    let uri = '/mainboard/detail';
    let aggParams = [];
    let requiredParams = [];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'GET',
        timeout:    5000,
        enableJWT:  false,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  mainboardAdd(description, token) {
    let _this = this;
    let uri = '/mainboard/add';
    let aggParams = ['description', 'token'];
    let requiredParams = ['description'];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'POST',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  mainboardEdit(id, description, token) {
    let _this = this;
    let uri = '/mainboard/edit';
    let aggParams = ['id', 'description', 'token'];
    let requiredParams = ['id', 'description'];

    let data = null;
    try {
      data = _this.handleParams(uri, arguments, aggParams, requiredParams)
    } catch (err) {
      return Promise.reject(err);
    }

    let url = apiHost + 'api/1.0' + data.uri;
    return new Promise((resolve, reject) => {
      _this.ajax({
        url:        url,
        type:       'POST',
        timeout:    5000,
        enableJWT:  true,
        data:       data.data
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }
}
export default new SagittaClient();