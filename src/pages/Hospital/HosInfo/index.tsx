import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Descriptions } from "antd"
import { reqHosInfo } from "@api/HosList"
import type { typeHosInfo, typeHosInfoHos, typeHosInfoBooking } from "@api/HosList/model/hosTypes"

export default function HosInfo() {
  const navigate = useNavigate()

  const { id } = useParams()

  const [hosInfoHos, setHosInfoHos] = useState<typeHosInfoHos>({
    param: {
      hostypeString: "",
      fullAddress: ""
    }
  })
  const [hosInfoBooking, setHosInfoBooking] = useState<typeHosInfoBooking>({
    rule: []
  })

  useEffect(() => {
    ;(async () => {
      const result = await reqHosInfo(id as string)

      const { hospital, bookingRule } = result

      setHosInfoHos(hospital)
      setHosInfoBooking(bookingRule)
    })()
  }, [])

  return (
    <div>
      <Descriptions title="基本信息" bordered column={2}>
        <Descriptions.Item label="医院名称">{hosInfoHos.hosname}</Descriptions.Item>
        <Descriptions.Item label="医院logo">
          {<img width="100" src={"data:image/*;base64," + hosInfoHos.logoData}/>}
        </Descriptions.Item>
        <Descriptions.Item label="医院编码">{hosInfoHos.hoscode}</Descriptions.Item>
        <Descriptions.Item label="医院地址">{hosInfoHos.param.fullAddress}</Descriptions.Item>
        <Descriptions.Item label="坐车路线" span={2}>{hosInfoHos.route}</Descriptions.Item>
        <Descriptions.Item label="医院简介" span={2}>{hosInfoHos.intro}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="预约规则信息" bordered column={2} style={{ marginTop: "30px" }}>
        <Descriptions.Item label="预约周期">{hosInfoBooking.cycle}</Descriptions.Item>
        <Descriptions.Item label="放号时间">{hosInfoBooking.releaseTime}</Descriptions.Item>
        <Descriptions.Item label="停挂时间">{hosInfoBooking.stopTime}</Descriptions.Item>
        <Descriptions.Item label="退号时间">{hosInfoBooking.quitTime}</Descriptions.Item>
        <Descriptions.Item label="预约规则" span={2}>
          {
            hosInfoBooking.rule.map((item, index) => index + 1 + ". " + item)
          }
        </Descriptions.Item>
      </Descriptions>

      <br/>

      <Button onClick={() => {
        navigate("/syt/hospital/hospitalList")
      }}>返回</Button>
    </div>
  )
}
