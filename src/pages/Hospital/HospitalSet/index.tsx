import { Form, Input, Button, Table } from "antd"
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { reqHosListInfo } from "@api/hos"
import type { typeReqHosInfoParams, typeHosList } from "@api/hos/model/hosTypes"

export default function HospitalSet() {
  // 数据1: 请求医院分页列表函数 reqHosListInfo 的参数
  const [reqParams, setReqParams] = useState<typeReqHosInfoParams>({
    page: 1,
    limit: 3
  })
  
  // 数据2: 医院列表的数据
  const [hosList, setHosList] = useState<typeHosList>([])
  
  // 数据3: 是否加载中
  const [loading, setLoading] = useState(false)
  
  // 数据4: 列表数据总条数
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    (async () => {
      setLoading(true) // 发送请求, 正在加载, 等待请求结果
      
      const result = await reqHosListInfo(reqParams) // 获取响应结果
      
      setLoading(false) // 请求完成, 加载完成
      
      setHosList(result.records) // 更新医院列表数据
      setTotal(result.total) // 更新医院列表数据总条数
    })()
  }, [reqParams])
  
  const columns = [
    {
      title: "序号",
      render: (_/* 行值 */: any, $/* 行数据 */: any, index/* 行索引 */: number) => index + 1
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
        columns={columns}
        dataSource={hosList}
        bordered
        rowKey={row => row.id}
        rowSelection={{}}
        scroll={{ x: 1500 }}
        pagination={{
          current: reqParams.page, // 当前页
          pageSize: reqParams.limit, // 每页条数
          pageSizeOptions: [3, 6, 9], // 下拉列表, 可选每页条数
          showQuickJumper: true, // 快速跳转
          showSizeChanger: true, // 显示切换器(防止50条以上数据时可能出现的错误)
          total: total, // 数据总条数
          onChange: (page: number, limit: number) => setReqParams({ ...reqParams, page, limit }) // 点击翻页
        }}
        loading={loading} // 是否正在加载
      />
    </div>
  )
}
