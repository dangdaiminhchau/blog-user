import { Button, Flex, Image, Skeleton, Tag, notification as antdNotification } from "antd"
import { useDeleteContentMutation, useGetContentOfUserQuery } from "../../store/api/contentApi"
import { Link } from "react-router-dom"
import { CommentOutlined, EyeFilled } from "@ant-design/icons"
import { useGetCategoriesListQuery } from "../../store/api/categoriesApi"
import { useEffect, useState } from "react"
import UpdatePost from "./components/UpdatePost"
import { IContent } from "../../store/type/content.type"

const UserDetail = () => {
    const [notification, contextNotification] = antdNotification.useNotification()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpendUpdateModal, setIsOpendUpdateModal] = useState(false)
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)
    const [currrentItem, setCurrrentItem] = useState<IContent>()
    const { data: contentList, isFetching: isFetchingContent } = useGetContentOfUserQuery()
    const { data: cateList } = useGetCategoriesListQuery()
    const [deleteContent] = useDeleteContentMutation()

    const onDeletePost = async (id: number) => {
        try {
            setIsLoading(true)
            await deleteContent(id)
            notification.success({
                message: 'Success',
                description: 'Delete post successful'
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isUpdateSuccess) window.location.reload()
    }, [isUpdateSuccess])
    return (
        <div className="w-full p-24">
            <UpdatePost data={currrentItem} isOpened={isOpendUpdateModal} onClosed={() => setIsOpendUpdateModal(false)} onSuccess={() => { setIsUpdateSuccess(true) }} />
            {contextNotification}
            <Flex gap={100} className="w-full p-24" justify="center">
                <div>
                    <div className="text-4xl font-playfair font-bold hover:cursor-pointer justify-end text-left">
                        <span className="link link-underline link-underline-black text-black">Hi there, I'm Jack 👋</span>
                    </div>
                    <div className="text-lg font-playfair mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus malesuada nisi tellus, non imperdiet nisi tempor at.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore.</div>
                </div>
                <div>
                    <Image preview={false} width={300} height={300} className="rounded-full" src="/public/assets/authentication/loginBackground.png" />
                </div>
            </Flex>

            <div className="p-24 pt-4 pb-0">
                <div className="section-title mb-4 pb-1 w-50">
                    <h2 className="m-0 animate-fade-right">My <span>Posts</span></h2>
                </div>
            </div>

            <section className="blog blog-left pt-0 pl-24 pr-24">
                <div className="container">
                    <div className="row">
                        {isFetchingContent && isFetchingContent ? <Skeleton active className="p-24 pt-2" /> : (
                            <div className="listing-inner">
                                <div className="row">
                                    {contentList && contentList?.map(item => (
                                        <div key={item.id} className="col-lg-4 mb-4 hover:-translate-y-2 duration-700">
                                            <div className="trend-item box-shadow bg-white">
                                                <div className="trend-image">
                                                    <Image preview={false} height={250} width={'100%'} src={item.assetList[0].assetURL} alt="image" />
                                                </div>
                                                <div className="trend-content-main p-4">
                                                    <div className="trend-content">
                                                        <Flex justify="space-between">
                                                            <h5 className="theme mb-0">{cateList && cateList?.find(cate => cate.id === item.categories[0]).name}</h5>
                                                            <Tag color={item.pending ? 'magenta' : 'cyan'}>{item.pending ? 'pending' : 'approve'}</Tag>
                                                        </Flex>
                                                        <h4 className="mt-2"><Link to={`/categories/${item.categories[0]}/${item.id}`}>{item.title}</Link></h4>
                                                        <p className="mb-2">
                                                            {item.description}
                                                        </p>
                                                        <div className="entry-meta d-flex align-items-center justify-content-between">
                                                            <div className="entry-metalist d-flex align-items-center">
                                                                <Flex gap={isLoading ? 10 : 60} justify="space-between" align="center">
                                                                    <ul>
                                                                        <li className="me-2"><EyeFilled className="mr-2" />{item.views}</li>
                                                                        <li className="me-2"><CommentOutlined className="mr-2" />{item.comments.length ? item.comments.length : 0}</li>
                                                                    </ul>
                                                                    <div>
                                                                        <Button loading={isLoading} onClick={() => { setIsOpendUpdateModal(true); setCurrrentItem(item); }} type="primary" className="bg-button1 me-2">Update</Button>
                                                                        <Button loading={isLoading} onClick={() => onDeletePost(item.id)} type="primary" danger>Delete</Button>
                                                                    </div>
                                                                </Flex>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </div>

                        )}
                    </div>
                </div >
            </section >
        </div >
    )
}

export default UserDetail

const styles = `
            .link-underline {
            border-bottom-width: 0;
            background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff);
            background-size: 0 3px;
            background-position: 0 100%;
            background-repeat: no-repeat;
            transition: background-size .5s ease-in-out;
    }

            .link-underline-black {
                background-image: linear-gradient(transparent, transparent), linear-gradient(#0ED3CF, #0ED3CF)
    }

            .link-underline:hover {
                background-size: 100% 3px;
            background-position: 0 100%;
    }
            `;

// Kết hợp đoạn CSS với component
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];