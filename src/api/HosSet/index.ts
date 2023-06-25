import React from "react"
import { requestHos } from "@utils/http"
import type {
  typeReqHosInfoParams,
  typeHosListItem,
  typeHosListInfo,
  typeAddOrUpdateHosParams
} from "./model/hosTypes"

// 请求1: 请求医院分页列表
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

// 请求2: 添加医院
export const reqAddHos = (hosDetail: typeAddOrUpdateHosParams) => {
  return requestHos.post<any, null>(`/admin/hosp/hospitalSet/save`, hosDetail)
}

// 请求3: 编辑医院, 根据 id 获取回填数据
export const reqHosDetailById = (id: number) => {
  return requestHos.get<any, typeHosListItem>(`/admin/hosp/hospitalSet/get/${id}`)
}

// 请求4: 编辑完成, 更新医院列表
export const reqUpdateHos = (hosDetail: typeAddOrUpdateHosParams) => {
  return requestHos.put<any, null>(`/admin/hosp/hospitalSet/update`, hosDetail)
}

// 请求5: 根据 id, 删除医院列表项
export const reqDelHosListItemById = (id: number) => {
  return requestHos.delete<any, null>(`/admin/hosp/hospitalSet/remove/${id}`)
}

// 请求6: 根据 idList, 批量删除医院列表项
export const reqBacthDelListItemByIdList = (idList: React.Key[]) => {
  return requestHos.delete<any, null>(`/admin/hosp/hospitalSet/batchRemove`, { data: idList })
}
