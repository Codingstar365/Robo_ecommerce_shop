import React from 'react'
import ThirdPage from '../components/ThirdPage'
import { CategoryList, WhyBuyHere } from '../constants/ThirdPageConstant'
import Brand from '../components/Brand'
import TestimonialCard from '../components/TestimonialCard'
import { Testimonial } from '../constants/TestimonialConstant'
import SecondPageFAQ from '../components/SecondPageFAQ'
import { ElecrowFAQ } from '../constants/SecondPageConstant'
import PagesBanner from '../components/PagesBanner'
// import PagesBanner from '../components/PagesBanner'

const CollectionPageThird = () => {
  return (
    <div>
      <div>
        <PagesBanner />
      </div>
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
        <div className='ml-15'>
          <div className='bg-black-300 mt-auto'>
            <h2 className='font-bold  text-2xl'>WHY BUY FROM HERE?</h2>
          </div>
          <section className="p-6 bg-white">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {WhyBuyHere.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-gradient-to-b from-white to-gray-100 p-4 rounded-md shadow-sm"
                >
                  <div className="w-20 h-20 mb-3">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className=''>
          <Brand isCenter={false} />
        </div>
        <div className='justify-items ml-15 text-2xl font-bold'>
          <h2 className='flex ml-[15px]'>TESTIMONIAL
          </h2>
        </div>
        <div className="flex  flex-wrap mt-5 mb-5 ml-15 ">
          {Testimonial.map((item, index) => (
            <TestimonialCard
              key={index}
              name={item.name}
              avatar={item.avatar}
              platform={item.platformIcon}
              rating={item.rating}
              time={item.time}
              message={item.message}
            />
          ))}
        </div>
        <div>
          <div>
            <h2 className='flex justify-center text-3xl'>
              FAQs
            </h2>
          </div>
          <div className='w-40px'>
            <div >
              {
                ElecrowFAQ.map((item, index) => {
                  return <SecondPageFAQ

                    key={index}
                    question={item.question}
                    answer={item.answer} />
                })
              }
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CollectionPageThird
