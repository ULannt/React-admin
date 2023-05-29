import { Form, Input, Button, Table } from "antd"
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"

export default function HospitalSet() {
  const dataSource = [
    {
      "id": 10,
      "createTime": "2022-04-11 16:41:18",
      "updateTime": "2022-06-15 08:22:30",
      "isDeleted": 0,
      "param": {},
      "hosname": "北京大学深圳医院",
      "hoscode": "2022222",
      "apiUrl": "http://api.bjdxszyy.cn",
      "signKey": "62b84e910bd6d7b67157aed66e7aa866",
      "contactsName": "隔壁老王",
      "contactsPhone": "13000000000",
      "status": 0
    },
    {
      "id": 9,
      "createTime": "2022-01-18 10:53:14",
      "updateTime": "2022-06-15 08:22:29",
      "isDeleted": 0,
      "param": {},
      "hosname": "民航总医院",
      "hoscode": "1000_8",
      "apiUrl": "http://api.mzyy.cn",
      "signKey": "6f8006485dca34cd5849b724981dbe99",
      "contactsName": "周全",
      "contactsPhone": "15745634567",
      "status": 0
    },
    {
      "id": 8,
      "createTime": "2022-01-18 10:53:10",
      "updateTime": "2022-06-15 08:22:27",
      "isDeleted": 0,
      "param": {},
      "hosname": "北京市海淀区同步中医骨科医院",
      "hoscode": "1000_7",
      "apiUrl": "http://api.hdqtb.cn",
      "signKey": "6f8006485dca34cd5849b724981dbe99",
      "contactsName": "王伟",
      "contactsPhone": "13134564567",
      "status": 0
    },
    {
      "id": 7,
      "createTime": "2022-01-18 10:52:57",
      "updateTime": "2022-06-15 08:22:26",
      "isDeleted": 0,
      "param": {},
      "hosname": "中国医学科学院阜外医院",
      "hoscode": "1000_6",
      "apiUrl": "http://api.zgykxy.cn",
      "signKey": "6f8006485dca34cd5849b724981dbe99",
      "contactsName": "钱已",
      "contactsPhone": "16709807654",
      "status": 0
    },
    {
      "id": 6,
      "createTime": "2022-01-18 10:52:48",
      "updateTime": "2022-06-15 08:22:25",
      "isDeleted": 0,
      "param": {},
      "hosname": "中国医学科学院肿瘤医院",
      "hoscode": "1000_5",
      "apiUrl": "http://api.zgzl.cn",
      "signKey": "6f8006485dca34cd5849b724981dbe99",
      "contactsName": "米话",
      "contactsPhone": "18089078907",
      "status": 0
    }
  ]
  
  const columns = [
    {
      title: "序号",
      render(_: any, $: any, c: number) {
        return c + 1
      },
      key: "id"
    },
    {
      title: "医院名称",
      dataIndex: "hosname",
      key: "hosname"
    },
    {
      title: "医院编号",
      dataIndex: "hoscode",
      key: "hoscode"
    },
    {
      title: "api基础路径",
      dataIndex: "apiUrl",
      key: "apiUrl"
    },
    {
      title: "签名",
      dataIndex: "signKey",
      key: "signKey"
    },
    {
      title: "联系人姓名",
      dataIndex: "contactsName",
      key: "contactsName"
    },
    {
      title: "联系人手机",
      dataIndex: "contactsPhone",
      key: "contactsPhone"
    },
    {
      title: "操作",
      render() {
        return (
          <div>
            <Button icon={<EditOutlined/>} type="primary"/>
            <Button icon={<DeleteOutlined/>} type="primary" danger/>
          </div>
        )
      },
      key: "id"
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
      
      <Table dataSource={dataSource} columns={columns} bordered rowSelection={{}}/>
    </div>
  )
}
