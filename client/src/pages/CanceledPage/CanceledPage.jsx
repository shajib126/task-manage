import React,{Suspense,lazy} from 'react'

import Layout from '../../components/Layout/Layout'
import LazyLoader from '../../components/Layout/LazyLoader'

const Canceled = lazy(()=>import('../../components/Canceled/Canceled'))
const CanceledPage = () => {
  return (
    <>
      <Layout>
        <Suspense fallback={<LazyLoader/>}>
          <Canceled/>
        </Suspense>
      </Layout>
    </>
  )
}

export default CanceledPage