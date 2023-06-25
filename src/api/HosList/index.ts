import { requestHos, requestAddress } from "@utils/http"
import type {
  typeHosListParams,
  typeHosListInfo,
  typeProvince,
  typeCity,
  typeCounty,
  typeHosType,
  typeHosInfo
} from "./model/hosTypes"

export const reqHosListParams = (page: number, limit: number, params: typeHosListParams) => {
  return requestHos.get<any, typeHosListInfo>(`/admin/hosp/hospital/${page}/${limit}`, { params })
}

export const reqProvince = () => {
  return requestAddress.get<any, typeProvince>(`/admin/cmn/dict/findByDictCode/province`)
}

export const reqCity = (id: string) => {
  return requestAddress.get<any, typeCity>(`/admin/cmn/dict/findByParentId/${id}`)
}

export const reqDistrict = (id: string) => {
  return requestAddress.get<any, typeCounty>(`/admin/cmn/dict/findByParentId/${id}`)
}

export const reqHosType = () => {
  return requestAddress.get<any, typeHosType>(`/admin/cmn/dict/findByParentId/10000`)
}

export const reqCheckStatus = (id: string, status: number) => {
  return requestHos.get<any, null>(`/admin/hosp/hospital/updateStatus/${id}/${status}`)
}

export const reqHosInfo = (id: string) => {
  return requestHos.get<any, typeHosInfo>(`/admin/hosp/hospital/show/${id}`)
}
