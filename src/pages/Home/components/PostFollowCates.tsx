import { Button, Flex, Skeleton } from "antd"
import { useGetContentInCatesQuery } from "../../../store/api/contentApi"
import { useGetCategoriesListQuery } from "../../../store/api/categoriesApi"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ClockCircleOutlined } from "@ant-design/icons"

const PostFollowCates = () => {
    const { data: cateList } = useGetCategoriesListQuery();
    const [cate, setCate] = useState(10)
    const { data: contentCateList, isFetching } = useGetContentInCatesQuery(cate)


    useEffect(() => {
        if (cateList && cate === null) {
            setCate(cateList[0].id)
        }
    }, [cateList, cate])

    return (
        <>
            {isFetching ? <Skeleton active className="p-24" /> : (
                <div className="news-area pd-bottom-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-full pt-16 pl-48 pr-48 go-top">
                                <div className="how-news">
                                    <div className="section-title style-two mb-3">
                                        <div className="nxp-tab-inner nxp-tab-post style-two">
                                            <Flex gap="small" className="w-full max-lg:flex-wrap">
                                                {cateList && cateList?.map(cate => (
                                                    <Button key={cate.id} onClick={() => setCate(cate.id)} className="bg-button1 rounded-sm w-1/4" type="primary">{cate.name}</Button>
                                                ))}
                                            </Flex>
                                        </div>
                                    </div>
                                    <div className="tab-content nxp-tab-content-2" id="ex1-content">
                                        <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel">
                                            {contentCateList && contentCateList.includedContents?.map(item => (
                                                <div key={item.id} className="single-post-list-wrap style-two">
                                                    <div className="media">
                                                        <div className="media-left">
                                                            <img src={item.assetList[0].assetURL} alt="img" />
                                                        </div>
                                                        <div className="media-body align-self-center">
                                                            <div className="details">
                                                                <h6 className="title"><Link className="font-semibold" to="/blog-details">{item.title}</Link></h6>
                                                                <div className="post-meta-single">
                                                                    <ul>
                                                                        <li className="text-button1"><ClockCircleOutlined className="mr-2" />{item.lastUpload.split(' ')[0]}</li>
                                                                    </ul>
                                                                </div>
                                                                <p className="text-text1">{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PostFollowCates