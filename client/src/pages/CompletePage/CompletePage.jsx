import React,{Suspense,lazy} from 'react'
import Layout from '../../components/Layout/Layout'
import LazyLoader from '../../components/Layout/LazyLoader'
const Completed = lazy(()=>import('../../components/Completed/Completed'))
const CompletePage = () => {
  return (
    <>
      <Layout>
        <Suspense fallback={<LazyLoader/>}>
          <Completed/>
        </Suspense>
      </Layout>
    </>
  )
}

export default CompletePage