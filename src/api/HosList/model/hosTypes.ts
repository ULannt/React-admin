import { typeHosListItem } from "@api/HosSet/model/hosTypes"

// 发送获取医院列表数据请求的参数
export interface typeHosListParams {
  hoscode?: string
  hosname?: string
  hostype?: string
  provinceCode?: string
  cityCode?: string
  districtCode?: string
  status?: string
}

// 医院列表项
export interface typrHosListItem {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    hostypeString: string
    fullAddress: string
  }
  hoscode: string
  hosname: string
  hostype: string
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  logoData: string
  intro: string
  route: string
  status: number
  bookingRule: {
    cycle: number
    releaseTime: string
    stopTime: string
    quitDay: number
    quitTime: string
    rule: string[]
  }
}

// 医院列表
export type typeHosList = typeHosListItem[]

// 医院列表详细信息(发送获取医院列表数据请求的返回值)
export interface typeHosListInfo {
  content: typeHosList
  pageable: {
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  numberOfElements: number
  size: number
  number: number
  empty: boolean
}

// 省份每一项
export interface typeProvinceItem {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: object,
  parentId: number,
  name: string,
  value: string,
  dictCode: null,
  hasChildren: boolean
}

// 省份
export type typeProvince = typeProvinceItem[]

// 城市每一项
export interface typeCityItem {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: object,
  parentId: number,
  name: string,
  value: string,
  dictCode: null,
  hasChildren: boolean
}

// 城市
export type typeCity = typeCityItem[]

// 县的每一项
export interface typeCountyItem {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: object,
  parentId: number,
  name: string,
  value: string,
  dictCode: null,
  hasChildren: boolean
}

// 县
export type typeCounty = typeCountyItem[]
