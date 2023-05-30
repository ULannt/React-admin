import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Input, Button, Table } from "antd"
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { reqBacthDelListItemByIdList, reqDelHosListItemById, reqHosListInfo } from "@api/Hos"
import type { typeReqHosInfoParams, typeHosList, typeHosListItem } from "@api/Hos/model/hosTypes"

export default function HospitalSet() {
  const navigate = useNavigate()
  
  // 获取表单实例
  const [form] = Form.useForm()
  
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
      render: (row: typeHosListItem) => (
        <div>
          <Button icon={<EditOutlined/>} type="primary" onClick={editForm(row.id)} style={{ marginRight: "20px" }}/>
          <Button icon={<DeleteOutlined/>} type="primary" danger onClick={delFormItem(row.id)}/>
        </div>
      ),
      fixed: "right" as "right"
    }
  ]
  
  // 数据1: 请求医院分页列表函数 reqHosListInfo 的参数
  const [reqParams, setReqParams] = useState<typeReqHosInfoParams>({
    page: 1,
    limit: 100
  })
  
  // 数据2: 医院列表的数据
  const [hosList, setHosList] = useState<typeHosList>([])
  
  // 数据3: 是否加载中
  const [loading, setLoading] = useState(false)
  
  // 数据4: 列表数据总条数
  const [total, setTotal] = useState(0)
  
  // 数据5: id 列表, 用于批量删除
  const [idList, setIdList] = useState<React.Key[]>([])
  
  // 副作用: 当请求参数发生变化, 重新渲染
  useEffect(() => {
    (async () => {
      setLoading(true) // 发送请求, 正在加载, 等待请求结果
      
      const result = await reqHosListInfo(reqParams) // 获取响应结果
      
      setLoading(false) // 请求完成, 加载完成
      
      setHosList(result.records) // 更新医院列表数据
      setTotal(result.total) // 更新医院列表数据总条数
    })()
  }, [reqParams])
  
  // 方法1: 点击搜索按钮, 根据关键字渲染
  const searchForm = (values: { hosname: string, hoscode: string }) => {
    setReqParams({ ...reqParams, ...values, page: 1 })
  }
  
  // 方法2: 点击清空按钮, 清空搜索关键字并默认渲染
  const resetForm = () => {
    setReqParams({ ...reqParams, page: 1, hosname: "", hoscode: "" })
  }
  
  // 方法3: 点击列表项编辑按钮, 进入编辑页面
  const editForm = (id: number) => {
    return () => {
      navigate(`/syt/hospital/editHos/${id}`)
    }
  }
  
  // 方法4: 点击列表项删除按钮, 删除对应列表项
  const delFormItem = (id: number) => {
    return async () => {
      if (!window.confirm("确认删除吗?")) return
      
      await reqDelHosListItemById(id)
      
      // 重新渲染
      setReqParams({ ...reqParams })
    }
  }
  
  // 方法5: 点击批量删除按钮, 根据 idList 删除选中的列表项
  const bacthDelete = async () => {
    await reqBacthDelListItemByIdList(idList)
    
    // 重新渲染
    setReqParams({ ...reqParams })
  }
  
  return (
    <div>
      <Form layout="inline" form={form} onFinish={searchForm}>
        <Form.Item name="hosname">
          <Input placeholder="医院名称"/>
        </Form.Item>
        <Form.Item name="hoscode">
          <Input placeholder="医院编号"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SearchOutlined/>} htmlType="submit">查询</Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="reset" onClick={resetForm}>清空</Button>
        </Form.Item>
      </Form>
      
      <div style={{ margin: "20px 0" }}>
        <Button type="primary" style={{ marginRight: "20px" }} onClick={() => {
          navigate("/syt/hospital/addHos")
        }}>添加</Button>
        <Button type="primary" danger disabled={!idList.length} onClick={bacthDelete}>批量删除</Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={hosList}
        bordered
        rowKey={row => row.id}
        rowSelection={{
          onChange: (selectedRowKeys: React.Key[]) => {
            setIdList(selectedRowKeys)
          }
        }}
        // scroll={{ x: 1500 }}
        pagination={{
          current: reqParams.page, // 当前页
          pageSize: reqParams.limit, // 每页条数
          pageSizeOptions: [3, 6, 9, 50, 100], // 下拉列表, 可选每页条数
          showQuickJumper: true, // 快速跳转
          showSizeChanger: true, // 显示切换器(防止50条以上数据时可能出现的错误)
          total: total, // 数据总条数
          onChange: (page: number, limit: number) => {
            // 解决 antd 警告, 每次改变页码的时候, 清除 table 数据, 反正下边都要重新请求的
            setHosList([])
            
            // 点击翻页
            setReqParams({ ...reqParams, page, limit })
          }
        }}
        loading={loading} // 是否正在加载
      />
    </div>
  )
}
