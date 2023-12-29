import { Link, useParams } from "react-router-dom"
import { useGetContentInCatesQuery } from "../../../store/api/contentApi";
import { useGetCategoriesListQuery } from "../../../store/api/categoriesApi";
import { CommentOutlined, EyeFilled, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Spin, Image } from "antd";

const Category = () => {
    const { id } = useParams();
    const { data: cateList, isFetching: isFetchingContent } = useGetCategoriesListQuery();
    const cateName = cateList && cateList?.find(cate => cate.id === parseInt(id)).name
    const { data } = useGetContentInCatesQuery(Number(id));

    return (
        <div>
            <div className="w-full bg-green1 p-8 pl-16 mt-8">
                <div className="font-bold text-lg mb-3 text-white">Categories</div>
                <Breadcrumb
                    items={[
                        { title: <HomeOutlined className="text-white" />, href: '/' },
                        { title: <span className="text-white">Categories</span>, href: '/categories' },
                        { title: <span className="text-white">{cateName}</span>, href: `/categories/${id}` }
                    ]}
                />
            </div>

            <section className="blog blog-left">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">

                            <div className="listing-inner recent-post">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="list-results d-flex align-items-center justify-content-between">
                                            <div className="list-results-sort">
                                                <p className="m-0">Showing 1-5 of 80 results</p>
                                            </div>
                                            <div className="click-menu d-flex align-items-center justify-content-between">
                                                <div className="change-list me-2"><a href="post-list-1.html"><i className="fa fa-bars"></i></a></div>
                                                <div className="change-grid f-active me-2"><a href="post-grid-1.html"><i className="fa fa-th"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                    {data && data.includedContents?.map(item => (
                                        <div key={item.id} className="col-lg-6 mb-4">
                                            <div className="recent-item">
                                                <div className="recent-image">
                                                    <Image width={'100%'} height={500} src={item.assetList[0].assetURL} alt="image" />
                                                    <div className="recent-content p-4">
                                                        <h5 className="white bg-theme py-1 px-2 d-inline-block bordernone mb-1">{cateName}</h5>
                                                        <h4 className="mb-2"><Link to={`/categories/${id}/${item.id}`} className="white">{item.title.length > 100 ? item.title.substring(0, 100) + '...' : item.title}</Link></h4>
                                                        <p className="mb-2 white">
                                                            {item.description}
                                                        </p>
                                                        <div className="entry-meta d-flex align-items-center justify-content-between">
                                                            <div className="entry-metalist d-flex align-items-center">
                                                                <ul>
                                                                    <li className="me-2"><EyeFilled className="mr-2" />{item.views}</li>
                                                                    <li className="me-2"><CommentOutlined className="mr-2" />{item.comments.length}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="color-overlay"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pagination-main text-center">
                                    <ul className="pagination">
                                        <li><a href="#"><i className="fa fa-angle-double-left" aria-hidden="true"></i></a></li>
                                        <li className="active"><a href="#">1</a></li>
                                        <li><a href="#">2</a></li>
                                        <li><a href="#">3</a></li>
                                        <li><a href="#">4</a></li>
                                        <li><a href="#"><i className="fa fa-angle-double-right" aria-hidden="true"></i></a></li>
                                    </ul>
                                </div>
                            </div>


                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="sidebar-sticky">
                                <div className="list-sidebar">
                                    <div className="author-news mb-4 box-shadow p-4 text-center">
                                        <div className="author-news-content">
                                            <div className="author-thumb mb-1">
                                                <img src="images/team/img2.jpg" alt="author" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sidebar-item mb-4">
                                        <h4 className="">All Categories</h4>
                                        {isFetchingContent && isFetchingContent ? <Spin /> : (
                                            <ul className="sidebar-category">
                                                <li><a href="#">All</a></li>
                                                {cateList && cateList?.map(item => (
                                                    <li key={item.id}><Link to={`/categories/${item.id}`}>{item.name}</Link></li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Category