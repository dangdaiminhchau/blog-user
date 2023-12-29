import { EyeFilled } from "@ant-design/icons";
import { Col, Flex, Image, Row, Skeleton } from "antd"
import { useGetContentTopDateQuery } from "../../../store/api/contentApi";
import { useEffect, useState } from "react";
import { IContent } from "../../../store/type/content.type";
import { useGetCategoriesListQuery } from "../../../store/api/categoriesApi";
import { Link, useNavigate } from "react-router-dom";

const MoreTopDate = () => {
    const navigate = useNavigate()
    const { data: topDateList, isFetching } = useGetContentTopDateQuery()
    const { data: catesList } = useGetCategoriesListQuery()
    const [displayPost, setDisplayPost] = useState<IContent[]>()

    useEffect(() => {
        if (topDateList) setDisplayPost(topDateList && topDateList?.slice(0, 6))
    }, [topDateList])



    return (
        <div className="pl-16 pr-16 pb-16">
            <div className="section-title mb-4 pb-1 w-50">
                <h2 className="m-0 animate-fade-right">More <span>Latest Posts</span></h2>
            </div>
            {isFetching && isFetching ? <Skeleton /> : (
                <div>
                    <Row gutter={[16, 24]}>
                        {displayPost && displayPost?.map(item => (
                            <Col key={item.id} className="gutter-row" span={12}>
                                <div className="bg-white shadow-2xl hover:-translate-y-1 duration-700 rounded-lg">
                                    <Flex justify="space-between">
                                        <div className="flex-1 w-2/3 p-4">
                                            <Flex align="center" className="mb-2">
                                                <span className="h-6 w-0.5 rounded-full bg-green1"></span>
                                                <div onClick={() => navigate(`/categories/${item.categories[0]}`)} className="text-green1 text-lg font-bold font-playfair ml-2 hover:cursor-pointer">{catesList && catesList?.find(cate => cate.id === item.categories[0]).name}</div>
                                            </Flex>
                                            <Link to={`/categories/${item.categories[0]}/${item.id}}`} className="font-display max-w-sm text-xl font-bold leading-tight font-playfair hover:text-green1">
                                                <span className="link link-underline link-underline-black text-black mt-4">{item.title.length > 100 ? item.title.substring(0, 50) + "..." : item.title}</span>
                                            </Link>
                                            <div className="mt-2 flex justify-end text-gray5 text-lg font-normal font-poppins"><EyeFilled className="mr-1" />{item.views}</div>
                                        </div>
                                        <Image preview={false} className="flex-1 w-1/3 p-2" width={150} height={150} src={item.assetList[0].assetURL ? item.assetList[0].assetURL : '/public/assets/home/no-photo.png'} />
                                    </Flex>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div >
            )}

        </div >

    )
}

export default MoreTopDate

const styles = `
            .link-underline {
                border - bottom - width: 0;
            background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff);
            background-size: 0 3px;
            background-position: 0 100%;
            background-repeat: no-repeat;
            transition: background-size .5s ease-in-out;
    }

            .link-underline-black {
                background - image: linear-gradient(transparent, transparent), linear-gradient(#0ED3CF, #0ED3CF)
    }

            .link-underline:hover {
                background - size: 100% 3px;
            background-position: 0 100%;
    }
            `;

// Kết hợp đoạn CSS với component
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];