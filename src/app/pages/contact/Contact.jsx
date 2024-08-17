import React from 'react'

const Contact = () => {
  return (
    <div className="flex items-start h-full max-sm:flex-col">

      <div className="flex flex-col max-sm:w-full sm:min-w-[301px] sm:border-r-[1px] border-[#1E2D3D] h-full">

        <div className='max-sm:py-[5px] flex items-center gap-[12px] p-[12px] py-[10px] sm:border-b-[1px] border-[#1E2D3D] cursor-pointer group max-sm:bg-[#1E2D3D]'>
          <i className="ri-arrow-down-s-fill text-[18px] text-[#FFF] group-hover:text-[#607B96] transition-all"></i>
          <span className='text-[#FFF] text-[14px] group-hover:text-[#607B96] transition-all'>
            contacts
          </span>
        </div>

        <div className="flex flex-col gap-[8px] p-[12px] py-[10px]">
          <div className="flex items-center gap-[8px] group cursor-pointer">
            <i className="ri-mail-fill text-[20px] text-[#607B96]"></i>
            <span className='group-hover:text-[#FFF] transition-all text-[#607B96]'>
              ubaidullahu448@g..
            </span>
          </div>
          <div className="flex items-center gap-[8px] group cursor-pointer">
            <i className="ri-phone-fill text-[20px] text-[#607B96]"></i>
            <span className='group-hover:text-[#FFF] transition-all text-[#607B96]'>
              +92 3286701202
            </span>
          </div>
        </div>

        <div className='max-sm:py-[5px] flex items-center gap-[12px] p-[12px] py-[10px] sm:border-y-[1px] border-[#1E2D3D] cursor-pointer group max-sm:bg-[#1E2D3D]'>
          <i className="ri-arrow-down-s-fill text-[18px] text-[#FFF] group-hover:text-[#607B96] transition-all"></i>
          <span className='text-[#FFF] text-[14px] group-hover:text-[#607B96] transition-all'>
            find-me-also-in
          </span>
        </div>

        <div className="flex flex-col gap-[8px] p-[12px] sm:border-b-[1px] border-[#1E2D3D] py-[10px]">

          <a href='#' target='_blank' className="flex items-center group cursor-pointer gap-[8px]">
            <i className="ri-share-box-line transition-all group-hover:text-[#FFF] text-[18px]"></i>
            <span className='group-hover:text-[#FFF] transition-all'>
              GuruShots profile
            </span>
          </a>

          <a href='#' target='_blank' className="flex items-center group cursor-pointer gap-[8px]">
            <i className="ri-share-box-line transition-all group-hover:text-[#FFF] text-[18px]"></i>
            <span className='group-hover:text-[#FFF] transition-all'>
              YouTube channel
            </span>
          </a>

          <a href='#' target='_blank' className="flex items-center group cursor-pointer gap-[8px]">
            <i className="ri-share-box-line transition-all group-hover:text-[#FFF] text-[18px]"></i>
            <span className='group-hover:text-[#FFF] transition-all'>
              Twich profile
            </span>
          </a>

          <a href='#' target='_blank' className="flex items-center group cursor-pointer gap-[8px]">
            <i className="ri-share-box-line transition-all group-hover:text-[#FFF] text-[18px]"></i>
            <span className='group-hover:text-[#FFF] transition-all'>
              Twich profile
            </span>
          </a>

        </div>

      </div>

      <div className="flex flex-col w-full h-full">

        <div className="w-full max-sm:hidden border-b-[1px] border-[#1E2D3D]">
          <div className="flex w-fit p-[12px] border-r-[1px] border-[#1E2D3D]">
            <span className='text-[#607B96] text-[16px]'>
              contacts
            </span>
          </div>
        </div>

        <div className="flex items-start w-full h-full">

          <div className="w-full border-r-[1px] border-[#1E2D3D] flex flex-col items-center justify-center gap-[24px] h-full max-[1300px]:border-r-0">

            <div className="flex flex-col items-start justify-center gap-[24px] h-full p-[24px] max-sm:w-full">

              <div className="flex flex-col gap-[10px] max-sm:w-full">
                <span className='text-[#607B96]'>
                  _name:
                </span>
                <input type="text" placeholder='' className='sm:w-[372px] w-full border-[1px] outline-none border-[#607B96] p-[8px] rounded-[8px] bg-transparent' />
              </div>

              <div className="flex flex-col gap-[10px] max-sm:w-full">
                <span className='text-[#607B96]'>
                  _email:
                </span>
                <input type="text" placeholder='' className='sm:w-[372px] w-full border-[1px] outline-none border-[#607B96] p-[8px] rounded-[8px] bg-transparent' />
              </div>

              <div className="flex flex-col gap-[10px] max-sm:w-full">
                <span className='text-[#607B96]'>
                  _message:
                </span>
                <textarea placeholder='' className='sm:w-[372px] w-full h-[145px] resize-none border-[1px] outline-none border-[#607B96] p-[8px] rounded-[8px] bg-transparent' />
              </div>

              <span className='cursor-pointer transition-all hover:scale-95 text-[#FFF] py-[10px] px-[12px] rounded-[8px] bg-[#1C2B3A]'>
                submit-message
              </span>

            </div>

          </div>

          <div className="flex items-center justify-center p-[24px] py-[64px] h-full w-full max-[1300px]:hidden">
            <div className="flex items-start pt-[18px]">
              <span className='px-[36px] text-[18px]'>
                1
                <br />
                2
                <br />
                3
                <br />
                4
                <br />
                5
                <br />
                6
                <br />
                7
                <br />
                8
                <br />
                9
                <br />
                10
                <br />
                11
                <br />
                12
                <br />
                13
                <br />
                14
                <br />
                15
                <br />
                16
              </span>

              <span className='text-[18px]'>
                <span className='text-[#C98BDF]'>const</span>
                {' '}
                <span className='text-[#5565E8]'>button</span>
                {' '}
                <span className='text-[#C98BDF]'>=</span>
                {' '}
                <span className='text-[#5565E8]'>document<span className='text-[#607B96]'>.</span>querySelector</span><span className='text-[#607B96]'>{'('}</span><span>{"'#sendBtn"}</span><span className='text-[#607B96]'>{'('}</span>
                <br />
                <span className='ml-[16px]'>
                  * About me
                </span>
                <br />
                <span className='ml-[16px]'>
                  * I have 5 years of еxperience in web
                </span>
                <br />
                <span className='ml-[16px]'>
                  * development lorem ipsum dolor sit amet,
                </span>
                <br />
                <span className='ml-[16px]'>
                  * consectetur adipiscing elit, sed do eiusmod
                </span>
                <br />
                <span className='ml-[16px]'>
                  * tempor incididunt ut labore et dolore
                </span>
                <br />
                <span className='ml-[16px]'>
                  * magna aliqua. Ut enim ad minim veniam,
                </span>
                <br />
                <span className='ml-[16px]'>
                  * quis nostrud exercitation ullamco laboris
                </span>
                <br />
                <span className='ml-[16px]'>
                  * nisi ut aliquip ex ea commodo consequat.
                </span>
                <br />
                <span className='ml-[16px]'>
                  * Duis aute irure dolor in reprehenderit in
                </span>
                <br />
                *
                <br />
                <span className='ml-[16px]'>
                  * Duis aute irure dolor in reprehenderit in
                </span>
                <br />
                <span className='ml-[16px]'>
                  * voluptate velit esse cillum dolore eu fugiat
                </span>
                <br />
                <span className='ml-[16px]'>
                  * nulla pariatur. Excepteur sint occaecat
                </span>
                <br />
                <span className='ml-[16px]'>
                  * officia deserunt mollit anim id est laborum.
                </span>
                <br />
                */
              </span>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Contact;