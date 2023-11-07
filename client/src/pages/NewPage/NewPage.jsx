import React,{Suspense,lazy} from 'react'
import Layout from '../../components/Layout/Layout'
import LazyLoader from '../../components/Layout/LazyLoader'
const New = lazy(()=>import('../../components/New/New'))
const NewPage = () => {
  return (
    <>
      <Layout>
        <Suspense fallback={<LazyLoader/>}>
            <New/>
        </Suspense>
      </Layout>
    </>
  )
}

export default NewPage