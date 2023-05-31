import { requestHos, requestAddress } from "@utils/http"
import type { typeHosListParams, typeHosListInfo, typeProvince, typeCity, typeCounty } from "./model/hosTypes"

export const reqHosListParams = (page: number, limit: number, params?: typeHosListParams) => {
  return requestHos.get<any, typeHosListInfo>(`/admin/hosp/hospital/${page}/${limit}`, {
    params
  })
}

export const reqProvince = () => {
  return requestAddress.get<any, typeProvince>(`/admin/cmn/dict/findByDictCode/province`)
}

export const reqCity = (id: string) => {
  return requestAddress.get<any, typeCity>(`/admin/cmn/dict/findByParentId/${id}`)
}

export const reqCounty = (id: string) => {
  return requestAddress.get<any, typeCounty>(`/admin/cmn/dict/findByParentId/${id}`)
}
