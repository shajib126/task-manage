import React, { lazy, Suspense } from 'react'

import LazyLoader from '../../components/Layout/LazyLoader'
const CreatePassword = lazy(()=>import('../../components/AccountRecover/CreatePassword'))
const CreatePasswordPage = () => {
  return (
   <Suspense fallback={<LazyLoader/>}>
    <CreatePassword/>
   </Suspense>
  )
}

export default CreatePasswordPage