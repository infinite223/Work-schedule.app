import React from 'react'
import './Person.scss'

export const Admin = () => {
  return (
    <div className='Person flex'>
        <div className='flex person_content'>
            <h4>You</h4>
            <form>
                <label>
                <input type="text" placeholder='login'/>
                <input type="text" placeholder='nickname' />
                <input type="password" placeholder='hasło' />
                </label>
            </form>
        </div>
    </div>
  )
}
