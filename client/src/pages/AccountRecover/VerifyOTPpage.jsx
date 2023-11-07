import React, { lazy, Suspense } from 'react'
import LazyLoader from '../../components/Layout/LazyLoader'
const VerifyOTP = lazy(()=>import('../../components/AccountRecover/VerifyOTP'))
const VerifyOTPpage = () => {
  return (
   <Suspense fallback={<LazyLoader/>}>
    <VerifyOTP/>
   </Suspense>
  )
}

export default VerifyOTPpage