import { CommentOutlined, EyeFilled, HomeOutlined } from "@ant-design/icons"
import { Breadcrumb, Skeleton, Image, Spin } from "antd"
import '../../scss/override.scss'
import { useGetCategoriesListQuery } from "../../store/api/categoriesApi"
import { Link } from "react-router-dom"
import { useGetAllContentQuery } from "../../store/api/contentApi"
const Categories = () => {
    const { data: cateList, isFetching: isFetchingCate } = useGetCategoriesListQuery();
    const { data: contentList, isFetching: isFetchingContent } = useGetAllContentQuery()

    return (
        <div>
            <div className="w-full bg-green1 p-8 pl-16 mt-8">
                <div className="font-bold text-lg mb-3 text-white">Categories</div>
                <Breadcrumb
                    items={[
                        { title: <HomeOutlined className="text-white" />, href: '/' },
                        { title: <span className="text-white">Categories</span>, href: '/categories' }
                    ]}
                />
            </div>
            <section className="blog blog-left">
                <div className="container">
                    <div className="row">
                        {isFetchingContent && isFetchingContent ? <Skeleton active className="p-24" /> : (
                            <div className="col-lg-8">
                                <div className="listing-inner">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="list-results d-flex align-items-center justify-content-between">
                                                <div className="click-menu d-flex align-items-center justify-content-between">
                                                    <div className="change-grid f-active me-2"><a href="post-grid-1.html"><i className="fa fa-th"></i></a></div>
                                                </div>
                                            </div>
                                        </div>
                                        {contentList && contentList?.map(item => (
                                            <div key={item.id} className="col-lg-6 mb-4 hover:-translate-y-2 duration-700">
                                                <div className="trend-item box-shadow bg-white">
                                                    <div className="trend-image">
                                                        <Image preview={false} height={250} width={'100%'} src={item.assetList[0].assetURL} alt="image" />
                                                    </div>
                                                    <div className="trend-content-main p-4">
                                                        <div className="trend-content">
                                                            <h5 className="theme">{cateList && cateList?.find(cate => cate.id === item.categories[0]).name}</h5>
                                                            <h4><Link to={`/categories/${item.categories[0]}/${item.id}`}>{item.title}</Link></h4>
                                                            <p className="mb-2">
                                                                {item.description}
                                                            </p>
                                                            <div className="entry-meta d-flex align-items-center justify-content-between">
                                                                <div className="entry-metalist d-flex align-items-center">
                                                                    <ul>
                                                                        <li className="me-2"><EyeFilled className="mr-2" />{item.views}</li>
                                                                        <li className="me-2"><CommentOutlined className="mr-2" />{item.comments.length ? item.comments.length : 0}</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="col-lg-4 col-md-12">
                            <div className="sidebar-sticky">
                                <div className="list-sidebar">
                                    <div className="sidebar-item mb-4">
                                        <h4 className="">All Categories</h4>
                                        {isFetchingCate && isFetchingCate ? <Spin /> : (
                                            <ul className="sidebar-category">
                                                <li><Link to="/categories">All</Link></li>
                                                {cateList && cateList?.map(cate => (
                                                    <li key={cate.id}><Link to={`/categories/${cate.id}`}>{cate.name}</Link></li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section >
        </div >
    )
}

export default Categories