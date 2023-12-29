import { Carousel, Skeleton } from "antd"
import { useGetContentTopDateQuery } from "../../../store/api/contentApi"
import { useGetCategoriesListQuery } from "../../../store/api/categoriesApi"
import { CalendarOutlined, EyeOutlined } from "@ant-design/icons"
import '../../../scss/style.css'
import { Link } from "react-router-dom"

const TopDate = () => {
    const { data: topDateList, isFetching } = useGetContentTopDateQuery()
    const { data: catesList } = useGetCategoriesListQuery()

    return (
        <>
            {isFetching ? <Skeleton active className="p-24" /> : (
                <div className="pb-16">
                    <Carousel >
                        {topDateList && topDateList?.slice(0, 3).map(item => (
                            <section key={item.id} className="banner overflow-hidden">
                                <div className="container pl-24 pr-24">
                                    <div className="slider slider-before">
                                        <div className="swiper-container">
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide">
                                                    <div className="slide-inner">
                                                        <img className="slide-image" src={item.assetList[0].assetURL ? item.assetList[0].assetURL : '/public/assets/home/no-photo.png'} />
                                                        <div className="swiper-content">
                                                            <div className=" entry-meta d-flex align-items-center justify-content-between">
                                                                <span className="bg-green1 entry-category me-2 white bg-ơ py-1 px-3">
                                                                    <Link to={`/categories/${item.categories[0]}`} className="white">
                                                                        {catesList && catesList?.find(cate => cate.id === item.categories[0]).name}
                                                                    </Link>
                                                                </span>
                                                                <span className="entry-date"><a href="#"><CalendarOutlined className="mr-2" />{item.lastUpload}</a></span>
                                                            </div>
                                                            <h1 className="mb-4"><Link to={`/categories/${item.categories[0]}/${item.id}`}>{item.title}</Link></h1>
                                                            <div className="entry-meta d-flex align-items-center justify-content-between">
                                                                <div className="entry-metalist d-flex align-items-center">
                                                                    <ul>
                                                                        <li className="me-2"><EyeOutlined />{item.views}</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="overlay"></div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </Carousel>
                </div >
            )}
        </>
    )
}

export default TopDate