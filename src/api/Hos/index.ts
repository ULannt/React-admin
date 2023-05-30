import { requestHos } from "@utils/http"
import type { typeReqHosInfoParams, typeHosListInfo, typeAddHosParams } from "./model/hosTypes"

// 请求医院分页列表
export const reqHosListInfo = ({
  page = 1,
  limit = 3,
  hosname,
  hoscode
}: typeReqHosInfoParams) => {
  return requestHos.get<any, typeHosListInfo>(`/admin/hosp/hospitalSet/${page}/${limit}`, {
      params: {
        hosname,
        hoscode
      }
    }
  )
}

// 添加医院
export const reqAddHos = (hosDetail: typeAddHosParams) => {
  return requestHos.post(`/admin/hosp/hospitalSet/save`, hosDetail)
}
