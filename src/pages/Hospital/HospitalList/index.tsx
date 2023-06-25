import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Select, Input, Button, Table } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { reqProvince, reqCity, reqDistrict, reqHosListParams, reqHosType, reqCheckStatus } from "@api/HosList"
import type {
  typeCity,
  typeHosList,
  typeProvince,
  typeHosType,
  typeHosListParams,
  typrHosListItem
} from "@api/HosList/model/hosTypes"

export default function HospitalList() {
  const navigate = useNavigate()
  
  const [form] = Form.useForm()
  
  const [reqParams, setReqParams] = useState({ page: 1, limit: 50 })
  
  const [hosListParams, setHosListParams] = useState<typeHosListParams>({})
  
  const [hosList, setHosList] = useState<typeHosList>([])
  
  const [total, setTotal] = useState(0)
  
  const [provinceList, setProvinceList] = useState<typeProvince>([])
  
  const [cityList, setCityList] = useState<typeCity>([])
  
  const [districtList, setDistrictList] = useState<typeCity>([])
  
  const [hosTypeList, setHosTypeList] = useState<typeHosType>([])
  
  const [loading, setLoading] = useState(false)
  
  // 请求列表数据
  const getHosListInfo = async () => {
    setLoading(true)
    
    const result = await reqHosListParams(reqParams.page, reqParams.limit, hosListParams)
    
    setHosList(result.content)
    setTotal(result.totalElements)
    
    setLoading(false)
  }
  
  useEffect(() => {
    getHosListInfo()
  }, [reqParams, hosListParams])
  
  useEffect(() => {
    ;(async () => {
      const province = await reqProvince()
      setProvinceList(province)
      
      const hosType = await reqHosType()
      setHosTypeList(hosType)
    })()
  }, [])
  
  const provinceFinish = async (value: string) => {
    setDistrictList([])
    form.setFieldsValue({ cityCode: null, districtCode: null })
    
    const result = await reqCity(value)
    
    setCityList(result)
  }
  
  const cityFinish = async (value: string) => {
    form.setFieldsValue({ districtCode: null })
    
    const result = await reqDistrict(value)
    
    setDistrictList(result)
  }
  
  const search = (hosListParams: typeHosListParams) => {
    setHosListParams(hosListParams)
    
    setReqParams({ ...reqParams, page: 1 })
  }
  
  const clear = () => {
    form.resetFields()
    
    setHosListParams({})
    setReqParams({ ...reqParams, page: 1 })
  }
  
  const checkStatus = (hosListItem: typrHosListItem) => {
    return async () => {
      await reqCheckStatus(hosListItem.id, hosListItem.status ? 0 : 1)
      
      setReqParams({ ...reqParams })
    }
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
      render(hosListItem: typrHosListItem) {
        return (
          <div>
            <Button type="primary" style={{ marginRight: "15px" }} onClick={() => {
              navigate(`/syt/hospital/hosInfo/${hosListItem.id}`)
            }}>查看</Button>
            <Button type="primary" style={{ marginRight: "15px" }}>排班</Button>
            <Button onClick={checkStatus(hosListItem)}>{hosListItem.status ? "下线" : "上线"}</Button>
          </div>
        )
      }
    }
  ]
  
  return (
    <div>
      <Form layout="inline" form={form} style={{ height: "80px", lineHeight: "80px" }} onFinish={search}>
        <Form.Item name="provinceCode">
          <Select style={{ width: "180px" }} placeholder="请选择省" onChange={provinceFinish}>
            {
              provinceList.map(({ name, value, id }) => <Select.Option value={value} key={id}>{name}</Select.Option>)
            }
          </Select>
        </Form.Item>
        
        <Form.Item name="cityCode">
          <Select style={{ width: "180px" }} placeholder="请选择市" onChange={cityFinish}>
            {
              cityList.map(({ name, value, id }) => <Select.Option value={value} key={id}>{name}</Select.Option>)
            }
          </Select>
        </Form.Item>
        
        <Form.Item name="districtCode">
          <Select style={{ width: "180px" }} placeholder="请选择县">
            {
              districtList.map(({ name, value, id }) => <Select.Option value={value} key={id}>{name}</Select.Option>)
            }
          </Select>
        </Form.Item>
        
        <Form.Item name="hosname">
          <Input placeholder="医院名称"/>
        </Form.Item>
        
        <Form.Item name="hoscode">
          <Input placeholder="医院编号"/>
        </Form.Item>
        
        <Form.Item name="hostype">
          <Select style={{ width: "180px" }} placeholder="医院类型">
            {
              hosTypeList.map(({ name, value, id }) => <Select.Option value={value} key={id}>{name}</Select.Option>)
            }
          </Select>
        </Form.Item>
        
        <Form.Item name="status">
          <Select style={{ width: "180px" }} placeholder="医院状态">
            <Select.Option value={0}>未上线</Select.Option>
            <Select.Option value={1}>已上线</Select.Option>
          </Select>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined/>}>查询</Button>
        </Form.Item>
        
        <Form.Item>
          <Button onClick={clear}>清空</Button>
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
