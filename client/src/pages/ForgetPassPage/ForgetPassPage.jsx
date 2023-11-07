import React, { lazy, Suspense } from 'react'
import LazyLoader from '../../components/Layout/LazyLoader'
const SendOTP = lazy(()=>import('../../components/AccountRecover/SendOTP'))
const ForgetPassPage = () => {
  return (
    <Suspense fallback={<LazyLoader/>}>
      <SendOTP/>
    </Suspense>
  )
}

export default ForgetPassPage