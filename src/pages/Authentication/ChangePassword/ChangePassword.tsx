import { Flex, Input, Image, FormInstance, Button, Form, notification } from "antd"
import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useResetPasswordMutation } from "../../../store/api/authApi"

const ChangePassword = () => {
    const params = useParams()
    const formRef = useRef<FormInstance>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [resetPass, resetPassResult] = useResetPasswordMutation()

    const navigate = useNavigate()

    const onResetPassword = (formValues) => {
        try {
            setIsLoading(true)
            resetPass(formValues)
            if (!resetPassResult.isLoading) {
                notification.success({
                    message: 'Success',
                    description: 'Input the verified Code to reset Password',
                    onClose: () => { navigate('/signin') }
                })
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    return (
        <div>
            <Flex gap={100} justify="space-around" align="center" className="p-48">
                <Image width={'40%'} preview={false} src="/public/assets/authentication/forgotPassword.jpg" />
                <div className="font-playfair flex justify-center flex-col p-8 pr-12 text-lg">
                    <div className="text-4xl font-playfair font-black hover:cursor-pointer  justify-end text-left">
                        <span className="link link-underline link-underline-black text-black hover:text-green1">Forgot Password</span>
                    </div>
                    <div className=" mt-4">You must input the email to get the reset password code</div>

                    <Form ref={formRef} onFinish={onResetPassword} className="mt-2" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Form.Item name="email" label="Email" initialValue={params.email}>
                            <Input style={{ borderRadius: '10px' }} placeholder="Type email to get verified code" />
                        </Form.Item>
                        <Form.Item name="resetPasscode" label="Verified Code:">
                            <Input style={{ borderRadius: '10px' }} placeholder="Type reset code" />
                        </Form.Item>
                        <Form.Item name="newPassword" label="New Password">
                            <Input.Password style={{ borderRadius: '10px' }} placeholder="Type new Password" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button loading={isLoading} htmlType="submit" type="primary" className="bg-green1 text1">Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Flex>
        </div>
    )
}

export default ChangePassword