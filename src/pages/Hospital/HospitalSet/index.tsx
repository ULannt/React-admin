import { Form, Input, Button, Table } from "antd"
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { reqHosListInfo } from "@api/hos"
import type { typeReqHosInfoParams, typeHosList } from "@api/hos/model/hosTypes"

export default function HospitalSet() {
  // 数据1: reqHosListInfo 请求参数
  const [reqParams, setReqParams] = useState<typeReqHosInfoParams>({
    page: 1,
    limit: 3,
    hosname: "",
    hoscode: ""
  })
  
  // 数据2: 医院列表数据
  const [hosList, setHosList] = useState<typeHosList>([])
  
  // 数据3: 是否加载中
  const [loading, setLoading] = useState(false)
  
  // 数据4: 列表数据总条数
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    const getHosListInfo = async () => {
      setLoading(true)
      
      const result = await reqHosListInfo(reqParams)
      
      setLoading(false)
      
      setHosList(result.records)
      setTotal(result.total)
    }
    getHosListInfo()
  }, [reqParams])
  
  const columns = [
    {
      title: "序号",
      render: (_: any, $: any, c: number) => c + 1
    },
    {
      title: "医院名称",
      dataIndex: "hosname"
    },
    {
      title: "医院编号",
      dataIndex: "hoscode"
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl"
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName"
    },
    {
      title: "联系人手机",
      dataIndex: "contactsPhone"
    },
    {
      title: "操作",
      render: () => (
        <div>
          <Button icon={<EditOutlined/>} type="primary"/>
          <Button icon={<DeleteOutlined/>} type="primary" danger/>
        </div>
      ),
      fixed: "right" as "right"
    }
  ]
  
  return (
    <div>
      <Form layout="inline">
        <Form.Item>
          <Input placeholder="医院名称"/>
        </Form.Item>
        <Form.Item>
          <Input placeholder="医院编号"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SearchOutlined/>}>查询</Button>
        </Form.Item>
        <Form.Item>
          <Button>清空</Button>
        </Form.Item>
      </Form>
      
      <div style={{ margin: "20px 0" }}>
        <Button type="primary" style={{ marginRight: "20px" }}>添加</Button>
        <Button type="primary" danger>删除</Button>
      </div>
      
      <Table
        dataSource={hosList}
        columns={columns}
        bordered
        rowKey={row => row.id}
        rowSelection={{}}
        scroll={{ x: 1500 }}
        pagination={{
          current: reqParams.page,
          pageSize: reqParams.limit,
          pageSizeOptions: [3, 6, 9],
          showQuickJumper: true,
          showSizeChanger: true,
          total: total,
          onChange: (page: number, limit: number) => setReqParams({ ...reqParams, page, limit })
        }}
        loading={loading}
      />
    </div>
  )
}
