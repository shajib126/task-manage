import React,{Suspense,lazy} from 'react'

import Layout from '../../components/Layout/Layout'
import LazyLoader from '../../components/Layout/LazyLoader'
const Create = lazy(()=>import('../../components/Create/Create'))
const CreatePage = () => {
  return (
   <>
    <Layout>
      <Suspense fallback={<LazyLoader/>}> 
      <Create/>
      </Suspense>
    </Layout>
   </>
  )
}

export default CreatePage