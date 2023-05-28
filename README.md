# 项目分析

## 路由分析

`@/routes/index.tsx`

```
"/"     ->  redirect  ->  "/login": 登录界面,
"/syt"  ->  redirect  ->  "/syt/dashboard": 主页,
"*"     ->  redirect  ->  "/404": 错误界面
```

## 布局分析

`@layouts/components`

```
login

  ? <SideBar>: 侧边栏{
      <Menu>: 菜单
    },
    <Layout>: 主页容器{
      Header: 头部{
        <Avatar>: 头像
      },
      <Tabs>: 导航栏,
        Content: <Outlet>
    }

  : <EmptyLayout>: 登录界面容器
```

## 网络请求

`@/utils/http/request.ts`

- 请求拦截器：发送请求前，从 Redux 中获取 token，并携带

- 响应拦截器：
    - 请求成功：用户名密码 ? 返回数据 : 提示密码错误...
    - 请求失败：处理失败 Promise

## 路由鉴权

- 初始化(第一次登录前)：**只请求 token**，并在本地永久化存储

- 登录或刷新页面：验证 token 是否过期，请求用户信息 (用户名密码存储在 Redux 中，刷新页面会清空)

    - 请求成功：token 有效

    - 请求失败：token 过期，跳转到登录界面

- 路由跳转：token 与用户信息都存在，不需要发送请求 (但是可能会请求路由页的其他数据，验证 token)

## 登录登出

`@/pages/login/slice.ts`

- 初始化状态：获取 token ? localStorage : ""

- 登录：发送请求验证用户名密码。请求成功则将 token 存储在 Redux 和 localStorage 中

- 获取用户信息：携带 token, 请求用户信息。请求成功说明 token 有效，否则说明 token 过期

- 退出登录：携带 token 发送请求，告诉服务器 token 失效，并删除本地存储的 token

## 高阶组件 withAuthor

`@/components/withAuthorization/index.tsx`

用于路由鉴权

- token 有效：已登录。访问登录界面，会跳转到主页。然后判断是否有用户信息，如果没有，就发送请求获取

- token 失效：未登录。访问主页，会跳转到登录界面
