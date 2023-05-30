import { useNavigate } from "react-router-dom"
import { Form, Input, Button, message } from "antd"
import { reqAddHos } from "@api/Hos"
import type { typeAddHosParams } from "@api/Hos/model/hosTypes"

export default function HospitalList() {
  const navigator = useNavigate()
  
  const submitForm = (hosDetail: typeAddHosParams) => {
    (async () => {
      try {
        await reqAddHos(hosDetail)
        
        navigator("/syt/hospital/hospitalSet")
      } catch (error: any) {
        message.error("123", error.message)
      }
    })()
  }
  
  return (
    <div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        onFinish={submitForm}
      >
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
          <Button style={{ margin: "0 10px" }} htmlType="submit" type="primary">保存</Button>
          <Button style={{ margin: "0 10px" }} htmlType="button" onClick={() => {
            navigator("/syt/hospital/hospitalSet")
          }}>返回</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
