import React, { lazy, Suspense } from 'react'
import Layout from '../../components/Layout/Layout'
import LazyLoader from '../../components/Layout/LazyLoader'
const Progress = lazy(()=>import('../../components/Progress/Progress'))
const ProgressPage = () => {
  return (
    <Layout >
      <Suspense fallback={<LazyLoader/>} >
      <Progress/>
      </Suspense>
    </Layout>
  )
}

export default ProgressPage