const libPath = require('path');
// 配置
var url = "https://api-test.shinezone.com";
var constructUrl = "http://172.16.0.15:9000/v1.0/"; // todo constructUrl

var apiVersion = "1.0";

var error = {
  10000: "JSON SyntaxError",
  4003: "InValid AccessToken",
  9999: "Request Error",
  9998: "missing params or invalid param format",
  9997: "invalid format",
  10001: "没有修改IT模块权限",
  10002: "没有修改资产模块权限",
  20001: "操作状态有误",
  40000: "不能转发给自已",
  40001: "转发用户不存在",
  40002: "类型不存在",
  40003: "申请已达上限",
  40004: "文档不存在",
  40005: "标签不存在",
  40006: "角色不存在",
  40007: "服务单有误",
  40008: "用户没有分组",
  40009: "用户不在该分组",
  40010: "没有置顶权限",
  50001: "code/type/name duplicated!",
  50002: "error/unknown fixedAssetID",
  50003: "lack of important parameters",
};

var documentPreviewUnderSize = 25;
var documentPreviewTypes = [
  // "JPG", "JPEG", "PNG", "GIF", "TIFF", "BMP", "WebM",
  "MPEG4", "3GPP", "MOV", "AVI", "MPEGPS", "WMV", "FLV",
  "XLS", "XLSX", "CSV",
  "PPT", "PPTX",
  "PDF",
  "PAGES",
  "DOC", "DOCX",
  "TXT"
];
var pictureTypes = [
  "JPG", "JPEG", "PNG", "GIF", "BMP"
];

var eventCountFieldMap = {
  like: "likeCount",
  collection: "collectionCount",
  download: "collectionCount",
  view: "docViews",
  review: "reviewCount"
};
var eventBehaviorFieldMap = {
  like: "likeDocIds",
  collection: "collectionDocIds",
  review: "reviewDocs"
};

var eventIdMap = {
  like: "点赞",
  collection: "收藏",
  download: "下载",
  view: "查看",
  review: "评论",
  reply: "回复",
  version: "版本更新",
  share: "共享",
  remove: "删除",
  recover: "恢复",
  itHelpDesk_3: "处理中",
  itHelpDesk_4: "已完成",
  itResource_3: "审核通过",
  itResource_4: "审核驳回",
};
var weChatMsgMap = {
  "create": "您有一份必读文档待阅读，请及时登录内网查看",
  "share": "您有一份必读文档待阅读，请及时登录内网查看",
  "update": "您有一份必读文档版本已更新，请及时登录内网查看"
};

var uploadPath = libPath.join(__dirname, '..', '..', '..', 'upload');
var movePath = libPath.join(__dirname, '..', '..', '..', 'upload_move');


var itHelpDeskOrderStatusMap = {
  0: "已删除",
  1: "待处理",
  2: "已撤回",
  3: "处理中",
  4: "已完成",
  5: "已评价",
  6: "已撤回"  // 用户主动删除
};
var itResourceOrderStatusMap = {
  0: "已删除",
  1: "待审核",
  2: "已撤回",
  3: "审核通过",
  4: "审核驳回",
  5: "已转发",
  6: "被转发",
  7: "已撤回"  // 用户主动删除
};

const exportExcelCols = [
  {
    caption: '资产编码',
    type: 'string',
    width: 80
  },
  {
    caption: '资产类型',
    type: 'string',
    width: 80
  },
  {
    caption: '资产细类',
    type: 'string',
    width: 80
  },
  {
    caption: '资产名称',
    type: 'string',
    width: 80
  },
  {
    caption: '品牌',
    type: 'string',
    width: 80
  },
  {
    caption: '型号',
    type: 'string',
    width: 80
  },
  {
    caption: '存放地点',
    type: 'string',
    width: 80
  },
  {
    caption: '资产状态',
    type: 'string',
    width: 80
  },
  {
    caption: '登记人',
    type: 'string',
    width: 80
  },
  {
    caption: '登记时间',
    type: 'string',
    width: 80,
    // beforeCellWrite: function(){
    // }()
  },
  {
    caption: '备注',
    type: 'string',
    width: 80
  }
];

const exportExcelFields = {
  _id: 0,
  fixedAssetCode: 1,
  typeId: 1, typeDetailId: 1,
  title: 1,
  trademark: 1,
  model: 1,
  location: 1,
  status: 1,
  checkInUserName: 1,
  createdAt: 1,
  remark: 1
};


const fixedAssetsStatus = {
  0: "登记入库",
  1: "被领用",
  2: "领用归还",
  3: "送修登记",
  4: "修好入库",
  5: "被借用",
  6: "被外借",
  7: "借用归还",
  8: "报废登记",
  9: "已删除"
};

var itPermissionConfig = [271332]; // 运维部
var permissionConfig = {
  it: itPermissionConfig,
  assets: [283292],                 // 行政部
  document: []
};
// 与架构对应的权限id
let permissionMap = {
  document: "7a888057-7356-4f9e-82e9-034bd8eb6199",
  it: "48c373d2-f33c-4aa4-aa64-110087c6df50",
  assets: "90a390d1-a13c-4a04-aa64-1430a0c6df99",
  community: "7a888057-7356-4f9e-82e9-034bd8eb6199",
};

var itEmail = "it@shinezone.com";

module.exports = {
  url: url,
  constructUrl: constructUrl,
  apiVersion: apiVersion,
  error: error,
  documentPreviewUnderSize: documentPreviewUnderSize,
  documentPreviewTypes: documentPreviewTypes,
  eventIdMap: eventIdMap,
  eventCountFieldMap: eventCountFieldMap,
  eventBehaviorFieldMap: eventBehaviorFieldMap,
  weChatMsgMap: weChatMsgMap,
  uploadPath: uploadPath,
  movePath: movePath,
  itHelpDeskOrderStatusMap: itHelpDeskOrderStatusMap,
  itResourceOrderStatusMap: itResourceOrderStatusMap,
  itPermissionConfig: itPermissionConfig,
  permissionConfig: permissionConfig,
  getItEmail: itEmail,
  fixedAssetsStatus: fixedAssetsStatus,
  exportExcelFields: exportExcelFields,
  exportExcelCols: exportExcelCols,
  permissionMap: permissionMap,
  pictureTypes: pictureTypes
};
