import React,{Suspense,lazy} from 'react'
import Layout from '../../components/Layout/Layout'

import LazyLoader from '../../components/Layout/LazyLoader'

const DashboardComp = lazy(()=>import('../../components/Dashboard/DashboardComp'))
const Dashboard = () => {
  return (
    <div>
      <Layout>
        <Suspense fallback={<LazyLoader/>}>
          <DashboardComp/>
        </Suspense>
      </Layout>
    </div>
  )
}

export default Dashboard