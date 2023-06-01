// src/routes/index.tsx
import { lazy, Suspense, FC } from "react"
import { useRoutes, Navigate } from "react-router-dom"
import { HomeOutlined, TeamOutlined } from "@ant-design/icons"
import type { XRoutes } from "./types"

import { Layout, EmptyLayout } from "@/layouts"
import Loading from "@comps/Loading"

import Translation from "@comps/Translation"

const Login = lazy(() => import("@pages/login"))
const Dashboard = lazy(() => import("@pages/dashboard"))
const NotFound = lazy(() => import("@pages/404"))
const Hospital = lazy(() => import("@pages/Hospital"))
const HospitalList = lazy(() => import("@pages/Hospital/HospitalList"))
const HospitalSet = lazy(() => import("@pages/Hospital/HospitalSet"))
const AddOrEditHos = lazy(() => import("@pages/Hospital/AddOrEditHos"))
const HosInfo = lazy(() => import("@pages/Hospital/HosInfo"))

const load = (Comp: FC) => {
  return (
    // 因为路由懒加载，组件需要一段网络请求时间才能加载并渲染
    // 在组件还未渲染时，fallback就生效，来渲染一个加载进度条效果
    // 当组件渲染完成时，fallback就失效了
    <Suspense fallback={ <Loading/> }>
      {/* 所有lazy的组件必须包裹Suspense组件，才能实现功能 */ }
      <Comp/>
    </Suspense>
  )
}

const routes: XRoutes = [
  {
    path: "/",
    element: <EmptyLayout/>,
    children: [
      {
        path: "login",
        element: load(Login)
      }
    ]
  },
  {
    path: "/syt",
    element: <Layout/>,
    children: [
      {
        path: "/syt/dashboard",
        meta: {
          icon: <HomeOutlined/>,
          title: <Translation>route:dashboard</Translation>
        },
        element: load(Dashboard)
      },
      {
        path: "/syt/hospital",
        meta: {
          icon: <TeamOutlined/>,
          title: "医院管理"
        },
        element: load(Hospital),
        children: [
          {
            path: "/syt/hospital/hospitalSet",
            element: load(HospitalSet),
            meta: {
              title: "医院设置"
            }
          },
          {
            path: "/syt/hospital/hospitalList",
            element: load(HospitalList),
            meta: {
              title: "医院列表"
            }
          },
          // 添加医院列表, 不在左侧菜单栏展示
          {
            path: "/syt/hospital/addHos",
            element: load(AddOrEditHos),
            meta: {
              title: "添加医院"
            },
            hidden: true
          },
          // 编辑医院列表
          {
            path: "/syt/hospital/editHos/:id",
            element: load(AddOrEditHos),
            meta: {
              title: "编辑医院"
            },
            hidden: true
          },
          {
            path: "/syt/hospital/hosInfo/:id",
            element: load(HosInfo),
            meta: {
              title: "医院详情"
            },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: "/404",
    element: load(NotFound)
  },
  {
    path: "*",
    element: <Navigate to="/404"/>
  }
]

// 渲染路由
// 注意：首字母必须大写
export const RenderRoutes = () => {
  // react-router-dom的新增语法。不用自己遍历了，它帮我们遍历生成
  return useRoutes(routes)
}

// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
  const currentIndex = routes.findIndex((route) => route.path === "/syt")
  return routes[currentIndex].children as XRoutes
}

export default routes
