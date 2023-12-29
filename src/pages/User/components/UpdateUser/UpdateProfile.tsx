import { Button, Card, Flex, Form, FormInstance, Input, Modal, Space, notification as antdNotification } from "antd"
import { useEffect, useRef, useState } from "react"
import { useGetUserQuery, useUpdateUserMutation } from "../../../../store/api/userApi"
import { IUpdateFormat } from "../../../../store/type/user.type"
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { IComment } from "../../../../store/type/content.type";
import { useDeleteCommentMutation, useUpdateCommentMutation } from "../../../../store/api/commentApi";


const UpdateProfile = () => {
    const [notification, contextNotification] = antdNotification.useNotification();
    const [isLoadingDisName, setIsLoadingDisName] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [currentItem, setCurrentItem] = useState<IComment>()
    const [isOpenedModal, setIsOpenedModal] = useState(false)
    const formDisplayNameRef = useRef<FormInstance>(null)
    const formRef = useRef<FormInstance>(null)
    const actionRef = useRef<ActionType>()

    const { data } = useGetUserQuery('user', {
        pollingInterval: 900000,
    })

    const [updateUserInfo, updateUserInfoResult] = useUpdateUserMutation()
    const [deleteComment, deleteCommentResult] = useDeleteCommentMutation()
    const [updateComment, updateCommentResult] = useUpdateCommentMutation()

    useEffect(() => {
        formDisplayNameRef.current?.setFieldsValue({
            ...data,
        })
    }, [data])

    const layout = {
        labelCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }
    }
    const onChangeDisplayName = async (formValues) => {
        try {
            setIsLoadingDisName(true)
            const updateFormatItem: IUpdateFormat = {
                itemId: data.id,
                property: 'setDisplay_name',
                value: formValues.display_name,
            }
            await updateUserInfo(updateFormatItem)
            if (!updateUserInfoResult.isLoading) {
                formDisplayNameRef.current.resetFields()
                notification.success({
                    message: 'Success',
                    description: 'You have successfully updated your display name.',
                    onClose: () => { window.location.reload() }
                });
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoadingDisName(false)
    }

    const onDeleteComment = async (id: number) => {
        try {
            setIsLoading(true)
            await deleteComment(id)
            if (!deleteCommentResult.isLoading) {
                notification.success({
                    message: 'Success',
                    description: 'You have successfully updated your display name.',
                    onClose: () => { actionRef.current?.reload() }
                });
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    const columns: ProColumns<IComment>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Comment',
            dataIndex: 'content',
            search: false,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            valueType: 'option',
            width: '18%',
            render: (_, row) => (
                <Space>
                    <Button onClick={() => { setIsOpenedModal(true); setCurrentItem(row) }} type="primary" className="bg-button1">Update</Button>
                    <Button loading={isLoading} type='primary' danger onClick={() => onDeleteComment(row.id)}>
                        Delete
                    </Button>
                </Space>
            )
        }
    ]
    useEffect(() => {
        formRef.current?.setFieldsValue({
            ...currentItem,
        })
    }, [isOpenedModal, currentItem])

    console.log(currentItem)
    const onUpdateComment = async (formValues) => {
        try {
            setIsLoadingDisName(true)
            const updateFormatItem: IUpdateFormat = {
                itemId: currentItem.id,
                property: 'setContent',
                value: formValues.content,
            }
            await updateComment(updateFormatItem)
            if (!updateCommentResult.isLoading) {
                formRef.current.resetFields()
                notification.success({
                    message: 'Success',
                    description: 'You have successfully updated your display name.',
                    onClose: () => { window.location.reload() }
                });
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoadingDisName(false)
    }

    return (
        <>
            {contextNotification}
            <Modal footer={null} open={isOpenedModal} onCancel={() => setIsOpenedModal(false)}>
                <div className="font-bold text-xl mb-4">UPDATE COMMENT</div>
                <Card>
                    <Form onFinish={onUpdateComment} ref={formRef}>
                        <Form.Item name="content" label="Comment">
                            <Input />
                        </Form.Item>
                        <Flex justify="flex-end">
                            <Form.Item>
                                <Button htmlType="submit" loading={isLoading} type="primary" className="bg-button1 mr-2">Update</Button>
                            </Form.Item>
                        </Flex>
                    </Form>
                </Card>
            </Modal>
            <Card>
                <Form ref={formDisplayNameRef} onFinish={onChangeDisplayName} {...layout}>
                    <Flex>
                        <Form.Item name="display_name" label="Display Name:" className="flex-1 w-2/3">
                            <Input style={{ borderRadius: '8px', height: '40px' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={isLoadingDisName} type="primary" className="bg-button1">Change Display Name</Button>
                        </Form.Item>
                    </Flex>
                </Form>
                <ProTable
                    className='h-full'
                    id="content-management"
                    loading={isLoading}
                    rowKey="id"
                    actionRef={actionRef}
                    search={false}
                    columns={columns}
                    dataSource={data && data.Comments}
                    options={{
                        fullScreen: false,
                        reload: false,
                        setting: false,
                        density: false,
                    }}
                    pagination={{
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        defaultPageSize: 3,
                    }} />
            </Card >
        </>

    )
}

export default UpdateProfile