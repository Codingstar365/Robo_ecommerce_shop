import React from 'react'
import ThirdPage from '../components/ThirdPage'
import { CategoryList } from '../constants/ThirdPageConstant'
// import PagesBanner from '../components/PagesBanner'

const CollectionPageThird = () => {
  return (
    <div>

      {/* <PagesBanner/> */}
      <div>
        <ThirdPage />
      </div>
      <div>
        <h2 className='font-bold text-2xl ml-15'>Products</h2>
      </div>
      <div>
        <div className="py-10 px-4 ml-50">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
            {CategoryList.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-36 h-36 rounded-full bg-gradient-to-b from-blue-200 to-blue-500 flex items-center justify-center shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-28 h-28 object-contain"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-black-300 mt-auto'>
          <h2 className='font-bold ml-[20px]'>WHY BUY FROM HERE?</h2>
        </div>
      </div>
    </div>
  )
}

export default CollectionPageThird