import React from 'react'
import { useArrivals } from 'services/useArrivals'
import { useGetProperties } from 'services/useGetProperties'

type HomeCards = {
  title: string
  type: 'arrivals' | 'departure' | 'stays_over'
}
export const HomeCards: React.FC<HomeCards> = ({ title, type }) => {
  const properties = useGetProperties()
  const arrivals = useArrivals()
  console.log(properties, arrivals)
  return (
    <div>
      {title}
      {type}
    </div>
  )
}
