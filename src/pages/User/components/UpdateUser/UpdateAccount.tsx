import { Alert, Button, Card, Flex, Form, FormInstance, Input, notification as antdNotification } from "antd"
import { useEffect, useRef, useState } from "react"
import { useGetUserQuery, useUpdatePasswordMutation, useUpdateUserMutation } from "../../../../store/api/userApi"
import { IUpdateFormat, IUpdatePassword } from "../../../../store/type/user.type"
import { useDispatch } from "react-redux"
import { logout } from "../../../../store/state/authSlice"
import { useNavigate } from "react-router-dom"

const UpdateAccount = () => {
    const [notification, contextNotification] = antdNotification.useNotification();
    const [isLoadingMail, setIsLoadingMail] = useState(false)
    const [isLoadingPass, setIsLoadingPass] = useState(false)
    const [message, setMessage] = useState('')
    const [isShowMessage, setIsShowMessage] = useState(false)
    const formMailRef = useRef<FormInstance>(null)
    const formPassRef = useRef<FormInstance>(null)
    const { data } = useGetUserQuery('user', {
        pollingInterval: 900000,
    })

    const [updateUserInfo, updateUserInfoResult] = useUpdateUserMutation()
    const [updatePassword, updatePasswordResult] = useUpdatePasswordMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        formMailRef.current?.setFieldsValue({
            ...data,
        })
    }, [data])

    const layout = {
        labelCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } }
    }
    const onChangeEmail = async (formValues) => {
        try {
            setIsLoadingMail(true)
            const updateFormatItem: IUpdateFormat = {
                itemId: data.id,
                property: 'setEmail',
                value: formValues.email,
            }
            await updateUserInfo(updateFormatItem)
            if (!updateUserInfoResult.isLoading) {
                formMailRef.current.resetFields()
                notification.success({
                    message: 'Success',
                    description: 'You have successfully updated your email.'
                });
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoadingMail(false)
    }

    const onChangePass = async (formValues) => {
        try {
            setIsLoadingPass(true)
            if (formValues.newPassword !== formValues.confirmPass) { setIsShowMessage(true); setMessage('Passwords do not match.') }
            else {
                const updateFormatItem: IUpdatePassword = {
                    newPassword: formValues.newPassword,
                    authenticationRequest: {
                        username: data.username,
                        password: formValues.password,
                    },
                }
                await updatePassword(updateFormatItem)
                if (!updatePasswordResult.isLoading) {
                    formPassRef.current.resetFields()
                    notification.success({
                        message: 'Success',
                        description: 'You have successfully updated your email.',
                        onClose: () => {
                            dispatch(logout())
                            navigate('/signin')
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoadingPass(false)
    }

    return (
        <>
            {contextNotification}
            <Card>
                <Form ref={formMailRef} onFinish={onChangeEmail} {...layout}>
                    <Flex>
                        <Form.Item name="email" label="Email:" className="flex-1 w-2/3" rules={[{ required: true, message: 'Email is required', type: 'email' }]}>
                            <Input style={{ borderRadius: '8px', height: '40px' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={isLoadingMail} type="primary" className="bg-button1">Change email</Button>
                        </Form.Item>
                    </Flex>
                </Form>
                <Card>
                    {isShowMessage && <Alert type="error" message={message} className="mb-2" />}
                    <Form ref={formPassRef} onFinish={onChangePass} {...layout}>
                        <Form.Item>
                            <Button htmlType="submit" loading={isLoadingPass} type="primary" className="bg-button1">Change password</Button>
                        </Form.Item>
                        <Form.Item name="password" label="Old Password">
                            <Input.Password style={{ borderRadius: '8px', height: '40px' }} />
                        </Form.Item>
                        <Form.Item name="newPassword" label="New Password" rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters!',
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                message:
                                    'Password must contain at least one lowercase letter, one uppercase letter, and one special character!',
                            },
                        ]}>
                            <Input.Password style={{ borderRadius: '8px', height: '40px' }} />
                        </Form.Item>
                        <Form.Item name="confirmPass" label="Confirm Password">
                            <Input.Password style={{ borderRadius: '8px', height: '40px' }} />
                        </Form.Item>
                    </Form>
                </Card>

            </Card >
        </>

    )
}

export default UpdateAccount