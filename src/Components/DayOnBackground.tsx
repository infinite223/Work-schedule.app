import React from 'react'

export const DayOnBackground:React.FC<{ className:string, day:number }> = ({className, day}) => {
  return (
    <div className={className}><text>{day}<span>May</span></text></div>
  )
}
