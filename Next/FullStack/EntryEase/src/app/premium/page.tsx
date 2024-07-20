import { getSession } from '@/actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const PremiumPage =async () => {

  const session = await getSession()

  if(!session.isLoggedIn){
    redirect("/")
  }

  if(!session.isPro){
    return(
      <div className="notPremium">
        <h1>Only premium users can see the content!</h1>
        <Link href="/profile">
        Go to the profile page to upgrade the premium</Link>
      </div>
    )
  }

  return (
    <div className='premium color'>
        <h1>Welcome to the PremiumPage</h1>
    </div>
  )
}

export default PremiumPage