import React from 'react'
import SecondHero from '../components/SecondHero'
import { CardDataSecond } from '../constants/SecondHeroConstant'

const CollectionPages = () => {
  return (
    <div className=''>

 <div className='font-bold '>
        Raspberry Pi
      </div>
<div className="flex gap-1 flex-wrap mt-40 ml-25 mb-5 border-gray-500 border-rounded">
       
              {CardDataSecond.map((item, index) => (
                <SecondHero 
                  key={index}
                  name={item.name}
                  bgcolor={"red-400"}
                  bordercolor={"gray-400"}
                  discount={item.discount}
                />
              ))}
            </div>
      

      
    </div>
  )
}

export default CollectionPages