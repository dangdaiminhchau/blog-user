import { Button, Card, Flex, Form, FormInstance, Input, Modal, Select, SelectProps, notification as antdNotification } from "antd";
import { IContent, IFormatCateUpdate, IFormatUpdate } from "../../../store/type/content.type";
import { useEffect, useRef, useState } from "react";
import { useGetCategoriesListQuery } from "../../../store/api/categoriesApi";
import { UploadWidget } from "../../Upload/components/UploadWidget";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useUpdateCateContentMutation, useUpdateContentMutation } from "../../../store/api/contentApi";

interface IProps {
    data: IContent;
    isOpened: boolean;
    onClosed: () => void;
    onSuccess: () => void;
}

const UpdatePost = ({ data, isOpened, onClosed, onSuccess }: IProps) => {
    const [notification, contextNotification] = antdNotification.useNotification();
    const formRef = useRef<FormInstance>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [fileType, setFileType] = useState<string>('')
    const { data: categoriesList } = useGetCategoriesListQuery()
    const [updateCateContent, updateCateContentResult] = useUpdateCateContentMutation()
    const [updateContent, updateContentResult] = useUpdateContentMutation()
    useEffect(() => {
        formRef.current?.setFieldsValue({
            ...data
        })
    }, [isOpened, data])

    const options: SelectProps['options'] = []
    {
        categoriesList?.map(category => (
            options.push({
                label: `${category.name}`,
                value: category.id
            })
        ))
    }

    const handleAssetUrl = (value) => {
        const newContent = `${formRef.current.getFieldValue('content')} /*${value}*/`
        formRef.current.setFieldsValue({ content: newContent })
    }

    const onUpdateTitleContent = async (content: string) => {
        try {
            const updateFormatItem: IFormatUpdate = {
                itemId: data.id,
                property: 'setTitle',
                value: content,
            }
            await updateContent(updateFormatItem)
        } catch (error) {
            console.log(error)
        }
    }

    const onUpdateDesContent = async (content: string) => {
        try {
            const updateFormatItem: IFormatUpdate = {
                itemId: data.id,
                property: 'setDescription',
                value: content,
            }
            await updateContent(updateFormatItem)
        } catch (error) {
            console.log(error)
        }
    }

    const onUpdateConContent = async (content: string) => {
        try {
            const updateFormatItem: IFormatUpdate = {
                itemId: data.id,
                property: 'setContent',
                value: content,
            }
            await updateContent(updateFormatItem)
        } catch (error) {
            console.log(error)
        }
    }


    const onUpdateCateContent = async (categories: number[]) => {
        try {
            const value = categories.map(cate => ({ id: cate }))
            console.log(value)
            const updateFormatItem: IFormatCateUpdate = {
                itemId: data.id,
                value: value,
            }
            await updateCateContent(updateFormatItem)
        } catch (error) {
            console.log(error)
        }
    }

    const onUpdateContent = async (formValues: IContent) => {
        try {
            setIsLoading(true)
            if (formRef.current?.getFieldValue('categories') !== data.categories) await onUpdateCateContent(formValues.categories)
            if (formRef.current?.getFieldValue('title') !== data.title) await onUpdateTitleContent(formValues.title)
            if (formRef.current?.getFieldValue('description') != data.description) await onUpdateDesContent(formValues.description)
            if (formRef.current?.getFieldValue('content') != data.content) await onUpdateConContent(formValues.content)
            if (!updateCateContentResult.isLoading && !updateContentResult.isLoading) {
                onSuccess()
                onClosed()
                notification.success({
                    message: 'Thành công',
                    description: 'Bạn đã cập nhật bài viết thành công'
                });
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {

    })
    return (
        <>
            {contextNotification}
            <Modal footer={null} width={800} open={isOpened} onCancel={onClosed}>
                {contextNotification}
                <div className="font-bold text-xl mb-4">UPDATE CONTENT</div>
                <Card>
                    <Form onFinish={onUpdateContent} ref={formRef} layout="vertical" className="mt-8">
                        <Form.Item name={["categories"]} label={<div className="text-[1em] text-text1">Category</div>}>
                            <Select size="large" mode="multiple" placeholder="Please select category for your post" allowClear options={options} />
                        </Form.Item>
                        <Form.Item name="title" label={<div className="text-[1em] text-text1">Title:</div>}>
                            <Input size="large" placeholder="Input the title" />
                        </Form.Item>
                        <Form.Item name="description" label={<div className="text-[1em] text-text1">Description:</div>}>
                            <Input.TextArea rows={2} size="large" placeholder="Input the description" />
                        </Form.Item>
                        <Form.Item name="content" label={<div className="text-[1em] text-text1">Content:</div>}>
                            <Input.TextArea rows={4} size="large" placeholder="Input the content" />
                        </Form.Item>

                        <Form.List name="assetList">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restFields }) => (
                                        <Flex key={key} gap="middle">
                                            <Form.Item
                                                {...restFields}
                                                name={[name, 'name']}>
                                                <Input placeholder="Input name file" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restFields}
                                                name={[name, 'tag']}>
                                                <Select options={[
                                                    { value: 'image', label: 'image' },
                                                    { value: 'video', label: 'video' },
                                                ]} placeholder="Select the tag" onChange={(e) => setFileType(e)} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restFields}
                                                name={[name, 'assetURL']}>
                                                <UploadWidget fileType={fileType} onChange={handleAssetUrl} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Flex>
                                    ))}
                                    <Form.Item>
                                        <Button type="primary" className="bg-button1" onClick={() => add()} block icon={<PlusOutlined />}>Add Image or Video</Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Flex justify="flex-end">
                                <Button loading={isLoading} htmlType="submit" size="middle" className="mr-4" type="primary" danger>Post</Button>
                                <Button size="middle" className="bg-button1" type="primary">Cancel</Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
        </>
    )
}

export default UpdatePost