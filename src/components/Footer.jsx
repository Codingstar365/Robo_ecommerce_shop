
import React from 'react'
import { FaFacebook, FaGoogle, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';
import { Allcategories, FooterBlogs, ShopByBrand, Support } from '../constants/NavbarConstant';


const Footer = () => {
  return (
    <div className='bottom-0 left-0 w-full  '>
      <div className='flex justify-between p-7  text-center bg-secondary'>
        <div>
          <h2 className='mb-8xl'>Sign up for our newsletter and unlock exclusive promotions and discounts</h2>
        </div>


        <div className='flex gap-5'>
          <FaInstagram size={28} className="text-[#3c30e1] hover:scale-110 transition-transform" />
          <FaFacebook size={28}
            className="text-blue-600 hover:text-white hover:bg-blue-600 rounded-full p-1 transition-all" />
          <FaYoutube size={28} className="text-[#3c30e1] hover:scale-110 transition-transform" />
          <FaLinkedin size={28} className="text-[#3c30e1] hover:scale-110 transition-transform" />
          <FaTwitter size={28} className="text-[#3c30e1] hover:scale-110 transition-transform" />
          <FaGoogle size={28} className="text-[#3c30e1] hover:scale-110 transition-transform" />

        </div>

      </div>
      <div className='bg-white flex justify-between p-8 text-1xl'>
        <div>
          <div>Logo </div>
          <div className='w-50 text-sm'>
            Robocraze is India's most trusted 
            Robotics and DIY store. We aim at
             fostering the growth of knowledge in
               Embedded Systems, IoT and Automation.</div>
        </div>
        <div>
          <div className='font-bold'>
            Top Categories
          </div>
          <div>
            {
              Allcategories.map((value) => {
                return <div  className='text-sm'>{value.name}</div>
              })
            }
          </div>
        </div>
        <div>
        <div className='font-bold'>
          Shop By Brand
        </div>
        <div>
          {
            ShopByBrand.map((value)=>{
              return <div className='text-sm'>{value.name}</div>
            })
          }
        </div>
         </div>
        <div>
          <div className='font-bold'>Blogs</div>
          <div>
            {
              FooterBlogs.map((value)=>{
                return <div className='text-sm'>{value.name}</div>
              })
            }
          </div>
        </div>
        <div>
          <div className='font-bold'>Support</div>
          <div>
            {
              Support.map((value)=>{
                return <div className='text-sm'>{value.name}</div>
              })
            }
          </div>
        </div>
      </div>
    </div >
  )
};

export default Footer