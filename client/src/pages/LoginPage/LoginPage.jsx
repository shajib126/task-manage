import React, { lazy, Suspense } from 'react'
import LazyLoader from '../../components/Layout/LazyLoader'

const Login = lazy(()=>import('../../components/Login/Login'))

const LoginPage = () => {
  return (
    <>
    <Suspense fallback={<LazyLoader/>}>
    <Login/>
    </Suspense>
    </>
  )
}

export default LoginPage