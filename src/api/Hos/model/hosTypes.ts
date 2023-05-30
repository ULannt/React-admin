// 请求医院分页列表函数 reqHosListInfo 的参数类型
export interface typeReqHosInfoParams {
  page: number
  limit: number
  hosname?: string
  hoscode?: string
}

// 医院列表的每一项的类型
export interface typeHosListItem {
  id: 10,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: object,
  hosname: string,
  hoscode: string,
  apiUrl: string,
  contactsName: string,
  contactsPhone: string,
  status: number
}

// 医院列表的类型 [{ id, hosname, hoscode ... }, {}, {} ...]
export type typeHosList = typeHosListItem[]

// 医院所有信息(包括医院列表)
export interface typeHosListInfo {
  records: typeHosList,
  total: number,
  size: number,
  current: number,
  orders: any[],
  hitCount: boolean,
  searchCount: boolean,
  pages: number
}

// 添加医院函数 reqAddHos 参数
export interface typeAddHosParams {
  apiUrl: "string",
  contactsName: "string",
  contactsPhone: "string",
  hoscode: "string",
  hosname: "string"
}
