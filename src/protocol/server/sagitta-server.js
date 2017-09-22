"use strict";
class SagittaServer {

  callFunc(options) {
    const callClass = options.callClass;
    const params = options.data;
    const res = {
      response: {},
      statusText: "",
      statusCode: 200,
    };

    return new Promise((resolve, reject) => {
      callClass.server(params)
        .then((data) => {
          res.response = data;
          resolve(res);
        })
        .catch(() => {
          res.statusCode = 500;
          reject(res);
        });
    });
  }

  handleParams(params, aggParams, requiredParams) {
    let data = {};

    // replace ":param" in uri
    aggParams.forEach((key, index) => {
      const value = params[index];
      if (typeof value === "undefined") {
        return;
      }
      if (requiredParams.indexOf(key) >= 0 && (value === "" || value === undefined)) {
        throw new Error("Param " + key + " is required!");
      }
      // pass object
      data[key] = value;
    });

    return data;
  }

  fetchDataList() {
    let _this = this;
    let aggParams = [];
    let requiredParams = [""];

    let data = null;
    try {
      data = _this.handleParams(arguments, aggParams, requiredParams);
    } catch (err) {
      return Promise.reject(err);
    }

    return new Promise((resolve, reject) => {
      _this.callFunc({
        callClass:    require("../server/app/api/fetchDataList"),
        data:         data,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  fetchDataDetail(id) {
    let _this = this;
    let aggParams = ["id"];
    let requiredParams = ["id"];

    let data = null;
    try {
      data = _this.handleParams(arguments, aggParams, requiredParams);
    } catch (err) {
      return Promise.reject(err);
    }

    return new Promise((resolve, reject) => {
      _this.callFunc({
        callClass:    require("../server/app/api/fetchDataDetail"),
        data:         data,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
export default new SagittaServer();
