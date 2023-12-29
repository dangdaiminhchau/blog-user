import { Button, Divider, Flex, Form, FormInstance, Input, Select, SelectProps, Spin, Typography, notification as antdNotification } from "antd"
import '../../scss/override.scss'
import { useEffect, useRef, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useAddContentMutation } from "../../store/api/contentApi";
import { useGetCategoriesListQuery } from "../../store/api/categoriesApi";
import { IContentBody } from "../../store/type/content.type";
import { UploadWidget } from "./components/UploadWidget";
import { useGetUserQuery } from "../../store/api/userApi";


const { Title } = Typography

const UploadPost = () => {

    const { data } = useGetUserQuery('user', {
        pollingInterval: 900000,
    })

    const [notification, contextNotification] = antdNotification.useNotification();

    const [fileType, setFileType] = useState<string>('')

    const [addContent, addContentResult] = useAddContentMutation()

    const { data: categoriesList } = useGetCategoriesListQuery()

    const formRef = useRef<FormInstance>(null);

    const options: SelectProps['options'] = []
    {
        categoriesList?.map(category => (
            options.push({
                label: `${category.name}`,
                value: category.id
            })
        ))
    }


    const convertCategories = (formValues) => {
        const updatedCategories = formValues.categories.map(categoryId => ({ id: categoryId }));
        return { ...formValues, categories: updatedCategories };
    };

    const onCreateContent = (formValues: IContentBody) => {
        try {

            const form = convertCategories(formValues);

            addContent(form)
            {
                addContentResult.isSuccess &&
                    notification.success({
                        message: 'Thành công',
                        description: 'Bạn đã tạo bài viết thành công'
                    });
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        formRef.current?.resetFields();
    }, [addContentResult.isSuccess]);

    const handleAssetUrl = (value) => {
        const newContent = `${formRef.current.getFieldValue('content')} /*${value}*/`
        formRef.current.setFieldsValue({ content: newContent })
    }
    return (
        <div>
            {contextNotification}
            {data ?
                <Flex className="w-full bg-text1 bg-opacity-5 p-16">
                    <div className="flex-1 m-8 shadow-lg p-8 bg-white rounded-xl">
                        <Title style={{ fontWeight: 'bolder', textAlign: 'center' }} level={2}>Create your own post</Title>
                        <Divider />
                        <Form onFinish={onCreateContent} ref={formRef} layout="vertical" className="mt-8">
                            <Form.Item name={["categories"]} label={<div className="text-[1em] text-text1">Category</div>}>
                                <Select size="large" placeholder="Please select category for your post" mode="multiple" allowClear options={options} />
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
                                    <Button htmlType="submit" size="middle" className="mr-4" type="primary" danger>
                                        {addContentResult.isLoading ? <Spin /> : 'Post'}
                                    </Button>
                                    <Button size="middle" className="bg-button1" type="primary">Cancel</Button>
                                </Flex>
                            </Form.Item>
                        </Form>
                    </div>
                </Flex>
                : <div>Error</div>}
        </div>

    )
}

export default UploadPost