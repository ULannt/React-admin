import { requestHos } from "@utils/http"
import { typeReqHosInfoParams, typeHosListInfo } from "./model/hosTypes"

// 请求医院分页列表
export const reqHosListInfo = ({
  page = 1,
  limit = 3,
  hosname,
  hoscode
}: typeReqHosInfoParams) => requestHos.get<any, typeHosListInfo>(
  `/admin/hosp/hospitalSet/${page}/${limit}`,
  {
    params: {
      hosname,
      hoscode
    }
  }
)
