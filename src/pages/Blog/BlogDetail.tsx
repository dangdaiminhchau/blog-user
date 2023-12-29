import { Button, Flex, Form, FormInstance, Input, Modal, Skeleton, notification as antdNotification } from "antd"
import { Link, useParams } from "react-router-dom"
import { useRef, useState } from "react";
import { useGetContentQuery } from "../../store/api/contentApi";
import { ICommentBody } from "../../store/type/content.type";
import { useAddCommentMutation } from "../../store/api/commentApi";
import { useGetCategoriesListQuery } from "../../store/api/categoriesApi";
import { ClockCircleOutlined, CommentOutlined, EyeFilled } from "@ant-design/icons";


const BlogDetail = () => {
    const formRef = useRef<FormInstance>(null);

    const token = localStorage.getItem('token');

    const { id } = useParams();
    const { data: contentItem, isFetching: isFetchingContenItem } = useGetContentQuery(Number(id))
    const { data: cateLists, isFetching: isFetchingCateList } = useGetCategoriesListQuery()
    const [addComment, addCommentResult] = useAddCommentMutation()

    const [notification, contextNotification] = antdNotification.useNotification()
    const [isOpenedModal, setIsOpenModal] = useState(false)

    const onPostComment = (values) => {
        if (token && token) {
            const comment: ICommentBody = {
                ...values,
                post: { id: Number(id) }
            }
            try {
                addComment(comment)
                if (addCommentResult.isSuccess && addCommentResult.isSuccess) {
                    notification.success({
                        message: 'Success',
                        description: 'Comment posted! 🎉'
                    });
                    window.location.reload()
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setIsOpenModal(true)
        }
    }


    return (
        <>
            {contextNotification}
            <Modal className="p-8" footer={null} open={isOpenedModal}>
                <div className="text-3xl font-playfair text-green1 font-bold mb-3">Thông báo</div>
                <div className="text-lg font-playfair font-medium mb-3">You need to Sign in to comment on this post !</div>
                <Flex justify="flex-end">
                    <Button onClick={() => setIsOpenModal(false)} type="primary" danger>Cancel</Button>
                </Flex>
            </Modal>
            {isFetchingContenItem && isFetchingContenItem ? <Skeleton active className="p-24" /> : (
                <div className="p-16">
                    <div className="page-cover pt-5">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 mb-4">
                                    <div className="cover-content">
                                        <div className="author-detail mb-2">
                                            <Link to={`/categories/${contentItem.categories[0]}`} className="tag white bg-theme py-1 px-3 me-2">{cateLists && cateLists?.find(cate => cate.id === contentItem.categories[0]).name}</Link>
                                            <a href="#" className="tag white bg-navy py-1 px-3"><EyeFilled />{contentItem && contentItem.views}</a>
                                        </div>
                                        <h1>{contentItem && contentItem.title}</h1>
                                        <div className="author-detail d-flex align-items-center">
                                            <span className="me-3"><a href="#"><ClockCircleOutlined className="mr-2" />{`Posted On : ${contentItem && contentItem.lastUpload.split(' ')[0]}`}</a></span>
                                            <span><a href="#"><CommentOutlined className="mr-2" />{contentItem && contentItem.comments.length ? contentItem.comments.length : 0}</a></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <img width={600} height={500} src={contentItem && contentItem.assetList[0].assetURL ? contentItem.assetList[0].assetURL : '/public/assets/home/no-photo.png'} alt="Image" className="w-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="blog blog-left pt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-md-12 col-sm-12">
                                    <div className="blog-single">
                                        <div className="blog-wrapper">
                                            <div className="blog-content first-child-cap">
                                                <p className="mb-3 font-playfair text-lg">{contentItem && contentItem.description}</p>
                                                <div className="font-playfair text-lg">
                                                    {contentItem && contentItem.content.split('\n').map((item, index) => (

                                                        item.trim().startsWith('/*') && item.trim().endsWith('*/') ? (
                                                            <div key={index} className="flex flex-col justify-center" >
                                                                <img width={'100%'} style={{ marginBottom: '8px' }} src={item.slice(3, -2).trim()} />
                                                                <div className="mb-4 italic self-center">Hình.{contentItem.assetList?.find(assetItem => assetItem.assetURL === item.slice(3, -2).trim()).name}</div>
                                                            </div>

                                                        ) : (
                                                            item.trim().startsWith('/h1*') && item.trim().endsWith('*h1/') ? (
                                                                <div key={index} className="text-xl font-bold mb-4" >{item.slice(4, -4).trim()}</div>
                                                            ) : (
                                                                <div className="mb-4" key={index}>{item}</div>
                                                            )

                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="blog-share d-flex justify-content-between align-items-center mb-4 bg-lgrey border">
                                                <div className="blog-share-tag">
                                                    <ul className="inline">
                                                        <li className="mr-2"><strong>Posted In:</strong></li>
                                                        {contentItem && contentItem.categories?.map(cateItem => (
                                                            <li key={cateItem} className="mr-1"><Link to={`/categories/${cateItem}`}>{cateLists && cateLists?.find(cate => cate.id === cateItem).name}</Link></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="single-comments single-box mb-4">
                                            <h4 className="mb-4">Showing {contentItem && contentItem.comments.length ? contentItem.comments.length : 0} Comments</h4>
                                            {contentItem && contentItem.comments?.map(comment => (
                                                <div key={comment.id} className="comment-box">
                                                    <div className="comment-image mt-2 text-2xl">
                                                        &#128587;
                                                    </div>
                                                    <div className="comment-content">
                                                        <p className="comment">{comment.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="single-add-review">
                                            <h4 className="">Write a Review</h4>
                                            <Form onFinish={onPostComment} ref={formRef}>
                                                <Form.Item name="content">
                                                    <Input.TextArea rows={6} placeholder="Comment" />
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="default" className="group border-gray2 border-opacity-50 rounded-lg relative h-10 w-1/5 overflow-hidden bg-white text-lg" htmlType="submit">
                                                        <div className="absolute inset-0 w-0 transition-all duration-[300ms] ease-out group-hover:w-full bg-green1 border-green1"></div>
                                                        <span className="relative text-green1 text-based font-medium group-hover:text-white">Submit Comment</span>
                                                    </Button>
                                                </Form.Item>
                                            </Form>

                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-4 col-md-12">
                                    <div className="sidebar-sticky">
                                        <div className="list-sidebar">
                                            <div className="sidebar-item mb-4">
                                                <h4 className="">All Categories</h4>
                                                {isFetchingCateList && isFetchingCateList ? <Skeleton active className="p-8" /> : (
                                                    <ul className="sidebar-category">
                                                        <li><a href="#">All</a></li>
                                                        {cateLists && cateLists.map(cate => (
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
                    </section>
                </div >
            )}

        </>

    )
}

export default BlogDetail