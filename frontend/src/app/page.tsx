'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Hero from '@/components/hero'
import CarrerGuide from '@/components/carrer-guide'
import ResumeAnalyzer from '@/components/resume-analyzer'
import { useAppData } from '@/context/AppContext'
import Loading from '@/components/loading'

function Home() {
  const {loading}=useAppData();
  if(loading) return <Loading/>
  return (
    <div>

     <Hero/>
     <CarrerGuide/>
     <ResumeAnalyzer/>
    </div>
  )
}

export default Home