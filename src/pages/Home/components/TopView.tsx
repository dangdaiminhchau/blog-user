import '../../../scss/style.scss'
import '../../../css/style.css'
import '../../../scss/override.scss'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { RxArrowTopRight } from "react-icons/rx";
import { FreeMode, Pagination } from "swiper/modules";
import { Skeleton } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useGetContentTopViewQuery } from '../../../store/api/contentApi';
import { useGetCategoriesListQuery } from '../../../store/api/categoriesApi';
import { CalendarOutlined } from '@ant-design/icons';


const TopView = () => {
    const navigate = useNavigate()
    const { data: topViewList, isFetching } = useGetContentTopViewQuery()
    const { data: catesList } = useGetCategoriesListQuery()

    return (
        <div>

            <div className='pl-16 pr-16 pb-16'>
                <div className="container">
                    <div className="section-title mb-4 pb-1 w-50">
                        <h2 className="m-0 animate-fade-right">Trending <span>Topics</span></h2>
                    </div>
                    {isFetching ? <Skeleton active className="p-16" /> :
                        (
                            <div>
                                <Swiper
                                    slidesPerView="auto"
                                    centeredSlides={true}
                                    speed={1000}
                                    loop={true}
                                    autoplay={{ delay: 0, disableOnInteraction: false }}
                                    breakpoints={{
                                        480: {
                                            slidesPerView: 2,
                                            spaceBetween: 15,
                                        },
                                        700: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        },
                                    }}
                                    freeMode={true}
                                    pagination={{
                                        clickable: true,

                                    }}
                                    modules={[FreeMode, Pagination]}
                                    className="max-w-[90%] lg:max-w-[80%]"
                                >
                                    {topViewList && topViewList?.map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center "
                                                    style={{ backgroundImage: `url(${item.assetList[0].assetURL})` }}
                                                />
                                                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-70" />
                                                <div className="relative flex flex-col gap-3">
                                                    <div className="flex flex-row gap-5">
                                                        <button onClick={() => navigate(`/categories/${item.categories[0]}`)} className="group relative h-8 w-1/2 overflow-hidden rounded-sm bg-white text-lg shadow">
                                                            <div className="absolute inset-0 w-0 transition-all duration-[300ms] ease-out group-hover:w-full bg-green1"></div>
                                                            <span className="relative text-green1 text-based font-medium group-hover:text-white">{catesList && catesList?.find(cate => cate.id === item.categories[0]).name}</span>
                                                        </button>
                                                        <div className="lg:text-[14px] text-white font-medium"><CalendarOutlined className="mr-2" />{item.lastUpload.split(' ')[0]}</div>
                                                    </div>
                                                    <div onClick={() => navigate(`/categories/${item.categories[0]}/${item.id}`)} className="lg:text-2xl text-white font-bold">
                                                        {item.title.length > 15 ? item.title.substring(0, 50) + "..." : item.title}
                                                    </div>
                                                </div>
                                                <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                </div>
            </div >




        </div >
    )
}

export default TopView