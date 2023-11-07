import React, { lazy, Suspense } from 'react'
import Layout from '../../components/Layout/Layout'
import LazyLoader from '../../components/Layout/LazyLoader'

const Profile = lazy(()=>import('../../components/Profile/Profile'))
const ProfilePage = () => {
  return (
   <Layout>
   <Suspense fallback={<LazyLoader/>}>
      <Profile/>
   </Suspense>
   </Layout>
  )
}

export default ProfilePage