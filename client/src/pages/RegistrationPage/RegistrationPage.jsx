import React, { lazy, Suspense } from 'react'
import LazyLoader from '../../components/Layout/LazyLoader'
const Registration = lazy(()=>import('../../components/Registraton/Ragistration'))
const RegistrationPage = () => {
  return (
    <div>
      <Suspense fallback={<LazyLoader/>}>
          <Registration/>
      </Suspense>
    </div>
  )
}

export default RegistrationPage