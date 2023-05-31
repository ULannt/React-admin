import { useEffect, useState } from "react"
import { Form, Select, Input, Button, Table } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { reqCity, reqCounty, reqHosListParams, reqProvince } from "@api/HosList"
import type { typeCity, typeHosList, typeProvince } from "@api/HosList/model/hosTypes"
import { useForm } from "antd/es/form/Form"

export default function HospitalList() {
  const [form] = useForm()
  
  const [reqParams, setReqParams] = useState({ page: 1, limit: 50 })
  
  const [hosList, setHosList] = useState<typeHosList>([])
  
  const [total, setTotal] = useState(0)
  
  const [provinceList, setProvinceList] = useState<typeProvince>([])
  
  const [cityList, setCityList] = useState<typeCity>([])
  
  const [countyList, setCountyList] = useState<typeCity>([])
  
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    (async () => {
      setLoading(true)
      
      const result = await reqHosListParams(reqParams.page, reqParams.limit)
      
      setHosList(result.content)
      setTotal(result.totalElements)
      
      setLoading(false)
    })()
  }, [reqParams])
  
  useEffect(() => {
    (async () => {
      const result = await reqProvince()
      
      setProvinceList(result)
    })()
  }, [])
  
  const provinceFinish = async (value: string) => {
    setCityList([])
    // setCountyList([])
    
    const result = await reqCity(value)
    
    setCityList(result)
  }
  
  const cityFinish = async (value: string) => {
    // setCountyList([])
    
    const result = await reqCounty(value)
    
    setCountyList(result)
  }
  
  const columns = [
    {
      title: "序号",
      render: (_/* 行值 */: any, $/* 行数据 */: any, index/* 行索引 */: number) => index + 1
    },
    {
      title: "医院logo",
      dataIndex: "logoData",
      render: (logoData: string) => <img width="100" src={"data:image/*;base64," + logoData}/>
    },
    {
      title: "医院名称",
      dataIndex: "hosname"
    },
    {
      title: "等级",
      dataIndex: "param",
      render: (param: any) => param.hostypeString
      
    },
    {
      title: "详细地址",
      dataIndex: "param",
      render: (param: any) => param.fullAddress
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status: number) => status ? "已上线" : "未上线"
    },
    {
      title: "创建时间",
      dataIndex: "createTime"
    },
    {
      title: "操作",
      render() {
        return (
          <div>
            <Button type="primary" style={{ marginRight: "15px" }}>查看</Button>
            <Button type="primary" style={{ marginRight: "15px" }}>排班</Button>
            <Button>上线</Button>
          </div>
        )
      }
    }
  ]
  
  return (
    <div>
      <Form layout="inline" form={form}>
        <Form.Item>
          <Select style={{ width: "180px" }} placeholder="请选择省" onChange={provinceFinish}>
            {
              provinceList.map(({ name, value, id }) => <Select.Option value={value} key={id}>{name}</Select.Option>)
            }
          </Select>
        </Form.Item>
        
        <Form.Item>
          <Select style={{ width: "180px" }} placeholder="请选择市" onChange={cityFinish}>
            {
              cityList.map(({ name, value, id }) => <Select.Option value={value} key={id}>{name}</Select.Option>)
            }
          </Select>
        </Form.Item>
        
        <Form.Item>
          <Select style={{ width: "180px" }} placeholder="请选择县">
            {
              countyList.map(({ name, value, id }) => <Select.Option value={value} key={id}>{name}</Select.Option>)
            }
          </Select>
        </Form.Item>
        
        <Form.Item>
          <Input placeholder="医院名称"/>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" icon={<SearchOutlined/>}>查询</Button>
        </Form.Item>
        
        <Form.Item>
          <Button>清空</Button>
        </Form.Item>
      </Form>
      
      <Table
        columns={columns}
        dataSource={hosList}
        bordered
        rowKey={row => row.id}
        pagination={{
          current: reqParams.page, // 当前页
          pageSize: reqParams.limit, // 每页条数
          pageSizeOptions: [3, 6, 9, 50], // 下拉列表, 可选每页条数
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
        loading={loading}
        style={{ margin: "20px 0" }}
      />
    </div>
  )
}
