import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm'
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({params: { type } }: SearchParamProps) => {
  const { userId } = auth()
  console.log("User ID:", userId); // Check the user ID

  if(!userId) {redirect('/sign-in')}

  const transformation = transformationTypes[type]

  const user = await getUserById(userId)
  
  return (
   <>
    <Header 
    title={transformation.title} 
    subtitle={transformation.subTitle}
    />

    <section className='mt-10'>
    <TransformationForm
    action='Add'
    userId={user._id}
    type={transformation.type as TransformationTypeKey}
    creditBalance={user.creditBalance}
    />
    </section>
   </>
  )
}

export default page
