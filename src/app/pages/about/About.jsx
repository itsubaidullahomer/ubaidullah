import React from 'react'

const About = () => {
    return (
        <div className="flex items-start h-full">

            {/* <div className="flex flex-col gap-[30px] p-[24px] border-r-[1px] border-[#1E2D3D] h-full">
                <i className="cursor-pointer opacity-45 text-[24px] ri-terminal-box-fill"></i>
                <i className="cursor-pointer opacity-100 text-[24px] ri-user-4-fill"></i>
                <i className="cursor-pointer opacity-45 text-[24px] ri-gamepad-fill"></i>
            </div> */}

            <div className="flex flex-col min-w-[301px] border-r-[1px] border-[#1E2D3D] h-full">
                <div className='flex items-center gap-[12px] p-[12px] py-[10px] border-b-[1px] border-[#1E2D3D] cursor-pointer group'>
                    <i className="ri-arrow-down-s-fill text-[18px] text-[#FFF] group-hover:text-[#607B96] transition-all"></i>
                    <span className='text-[#FFF] text-[14px] group-hover:text-[#607B96] transition-all'>
                        personal-info
                    </span>
                </div>
                <div className="flex flex-col gap-[8px] p-[12px] border-b-[1px] border-[#1E2D3D] py-[10px]">

                    <div className="flex items-center gap-[12px] group cursor-pointer">
                        <i className="ri-arrow-right-s-line text-[18px] text-[#607B96]"></i>
                        <div className="flex items-center gap-[8px]">
                            <i className="ri-folder-3-fill text-[20px] text-[#E99287]"></i>
                            <span className='group-hover:text-[#FFF] transition-all'>
                                bio
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-[12px] group cursor-pointer">
                        <i className="ri-arrow-right-s-line text-[18px] text-[#607B96]"></i>
                        <div className="flex items-center gap-[8px]">
                            <i className="ri-folder-3-fill text-[20px] text-[#43D9AD]"></i>
                            <span className='group-hover:text-[#FFF] transition-all'>
                                interests
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[8px] group cursor-pointer">
                        <div className="flex items-center gap-[12px] group cursor-pointer">
                            <i className="ri-arrow-right-s-line text-[18px] text-[#607B96] rotate-90"></i>
                            <div className="flex items-center gap-[8px]">
                                <i className="ri-folder-3-fill text-[20px] text-[#3A49A4]"></i>
                                <span className='group-hover:text-[#FFF] transition-all'>
                                    education
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[8px] group cursor-pointer ml-[30px]">
                            <div className="flex items-center gap-[8px]">
                                <i className="ri-school-fill text-[18px]"></i>
                                <span className=''>
                                    high-school
                                </span>
                            </div>
                            <div className="flex items-center gap-[8px]">
                                <i className="ri-school-fill text-[18px]"></i>
                                <span className=''>
                                    university
                                </span>
                            </div>
                        </div>

                    </div>

                </div>
                <div className='flex items-center gap-[12px] p-[12px] py-[10px] border-b-[1px] border-[#1E2D3D] cursor-pointer group'>
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
            </div>

            <div className="flex flex-col w-full border-r-[1px] border-[#1E2D3D] h-full">
                <div className="border-b-[1px] w-full border-[#1E2D3D]">
                    <div className="flex items-center gap-[24px] p-[10px] px-[14px]  border-r-[1px] w-fit border-[#1E2D3D]">
                        <span className='text-[#607B96] text-[16px]'>
                            personal-info
                        </span>
                        <i class="ri-close-line text-[18px] text-[#607B96] transition-all hover:text-[#FFF] cursor-pointer"></i>
                    </div>
                </div>
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
                /**
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

            <div className="flex flex-col w-full h-full">
                <div className="border-b-[1px] w-full border-[#1E2D3D] h-[48px]">
                </div>
                <div className="flex flex-col gap-[18px] items-start pt-[18px] px-[36px] w-full">
                    <span className='text-[18px]'>
                        // Code snippet showcase:
                    </span>
                    <div className="flex flex-col gap-[24px] pt-[32px] w-full"> 
                        <div className="flex flex-col gap-[12px] w-full">

                            <div className="flex items-center justify-between w-full">

                                <div className="flex items-center gap-[10px]">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-[36px] h-[36px] rounded-full object-cover' alt="" />
                                    <div className="flex flex-col gap-[2px]">
                                        <span className='text-[#5565E8] font-[600] text-[14px]'>
                                            @username
                                        </span>
                                        <span className='text-[12px]'>
                                            Created 5 months ago
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-[18px]">
                                    <div className="flex items-end gap-[4px]">
                                        <i className="ri-chat-smile-3-fill text-[#607B96] text-[16px]"></i>
                                        <span className='text-[14px]'>
                                            details
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-[4px]">
                                        <i className="ri-star-fill text-[#607B96] text-[16px]"></i>
                                        <span className='text-[14px]'>
                                            3 starts
                                        </span>
                                    </div>
                                </div>

                            </div>
                            
                            <p className="p-[24px] rounded-[16px]">
                                <code>

                                    <span className='text-[#E99287]'>{'function '}</span>initializeModelChunk
                                    
                                    <span className='inline-block w-[20px]'></span>
                                    {'<T>(chunk: ResolvedModelChunk): T {'}
                                    <br />
                                    
                                    <span className='inline-block w-[20px]'></span>
                                    {'  const value: T = parseModel(chunk._response, chunk._value);'}
                                    <br />
                                    
                                    <span className='inline-block w-[20px]'></span>
                                    {'  const initializedChunk: InitializedChunk<T> = (chunk as any);'}
                                    <br />
                                    
                                    <span className='inline-block w-[20px]'></span>
                                    {'  initializedChunk._status = '}<span style={{ color: 'green' }}>INITIALIZED</span>{';'}
                                    <br />
                                    
                                    <span className='inline-block w-[20px]'></span>
                                    {'  initializedChunk._value = value;'}
                                    <br />
                                    
                                    <span className='inline-block w-[20px]'></span>
                                    {'  return value;'}
                                    <br />
                                    
                                    {'}'}
                                </code>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About