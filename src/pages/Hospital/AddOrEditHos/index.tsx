import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, Input, Button } from "antd"
import { useForm } from "antd/es/form/Form"
import { reqAddHos, reqHosDetailById, reqUpdateHos } from "@api/HosSet"
import type { typeAddOrUpdateHosParams } from "@api/HosSet/model/hosTypes"

export default function HospitalList() {
  const navigator = useNavigate()
  const { id } = useParams()
  const [form] = useForm()
  
  useEffect(() => {
    (async () => {
      if (!id) return
      
      const result = await reqHosDetailById(Number(id))
      
      form.setFieldsValue(result)
    })()
  }, [])
  
  const submitForm = (hosDetail: typeAddOrUpdateHosParams) => {
    (async () => {
      await (
        id
          ? reqUpdateHos({ ...hosDetail, id: Number(id) })
          : reqAddHos(hosDetail)
      )
      navigator("/syt/hospital/hospitalSet")
    })()
  }
  
  return (
    <div>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onFinish={submitForm} form={form}>
        <Form.Item name="hosname" label="医院名称" rules={[{ required: true }]}>
          <Input/>
        </Form.Item>
        <Form.Item name="hoscode" label="医院编号" rules={[{ required: true }]}>
          <Input/>
        </Form.Item>
        <Form.Item name="apiUrl" label="api基础路径" rules={[{ required: true }]}>
          <Input/>
        </Form.Item>
        <Form.Item name="contactsName" label="联系人姓名" rules={[{ required: true }]}>
          <Input/>
        </Form.Item>
        <Form.Item name="contactsPhone" label="联系人电话" rules={[
          { required: true },
          { pattern: /^1[0-9]{10}$/g }]}
        >
          <Input/>
        </Form.Item>
        
        <Form.Item style={{ marginLeft: "530px" }}>
          <Button style={{ margin: "0 10px" }} htmlType="submit" type="primary">
            {id ? "修改" : "添加"}
          </Button>
          <Button style={{ margin: "0 10px" }} htmlType="button" onClick={() => {
            navigator("/syt/hospital/hospitalSet")
          }}>返回</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
