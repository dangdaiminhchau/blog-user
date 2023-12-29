import { Skeleton } from "antd"
import { useGetCategoriesListQuery } from "../../../store/api/categoriesApi"
import { useGetContentTopViewQuery } from "../../../store/api/contentApi"
import { Link, useNavigate } from "react-router-dom"

const MostView = () => {
    const { data: topViewList, isFetching } = useGetContentTopViewQuery()
    const { data: cateList } = useGetCategoriesListQuery()

    const navigate = useNavigate()

    const firstCates = cateList && topViewList && cateList?.find(cate => cate.id === topViewList?.[0].categories?.[0]).name
    const firstIdCate = topViewList?.[0].categories?.[0]
    const firstId = topViewList?.[0].id
    const firstImage = topViewList && topViewList?.[0].assetList?.[0].assetURL
    const firstTitle = topViewList && topViewList?.[0].title

    return (
        <div>
            {isFetching && isFetching ? <Skeleton active className="p-24" /> : (
                <section className="discount-action pt-0 bg-grey">
                    <div className="container">
                        <div className="call-banner"
                            style={{ backgroundImage: `url(${firstImage})` }}>
                            <div className="row d-flex align-items-center">
                                <div className="col-lg-6 col-md-7 p-0">
                                    <div className="call-banner-inner bg-theme">
                                        <div className="trend-content-main">
                                            <div className="trend-content p-4">
                                                <h5 onClick={() => navigate(`/categories/${firstIdCate}`)} className="px-0 mb-1 white"><span className="ml-4">{firstCates}</span></h5>
                                                <h2 className="mb-2"><a href="#" className="white">{firstTitle}</a></h2>
                                                <Link to={`/categories/${firstIdCate}/${firstId}`} className="main-btn bg-green1">View Details <i className="fa fa-arrow-right white pl-1"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-5 p-0"></div>
                            </div>
                        </div>
                        <div className="social-wrapper bg-white p-4">
                            <ul className="social-with-text d-md-flex align-items-center justify-content-between">
                                <li className="twitter"><a href="#"><i className="fab fa-twitter"></i><span>Twitter</span></a></li>
                                <li className="facebook"><a href="#"><i className="fab fa-facebook-f"></i><span>Facebook</span></a></li>
                                <li className="instagram"><a href="#"><i className="fab fa-instagram"></i><span>Instagram</span></a></li>
                                <li className="youtube"><a href="#"><i className="fab fa-youtube"></i><span>Youtube</span></a></li>
                                <li className="pinterest"><a href="#"><i className="fab fa-pinterest"></i><span>Pinterest</span></a></li>
                                <li className="discord"><a href="#"><i className="fab fa-discord"></i><span>Discord</span></a></li>
                            </ul>
                        </div>
                    </div>
                </section>
            )}

        </div>
    )
}

export default MostView