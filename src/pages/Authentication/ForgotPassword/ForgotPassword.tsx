import { Button, Flex, Form, FormInstance, Image, Input, notification } from "antd"
import { useRef, useState } from "react"
import { useForgotPasswordMutation } from "../../../store/api/authApi"
import { useNavigate } from "react-router-dom"


const ForgotPassword = () => {
    const formRef = useRef<FormInstance>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation()
    const navigate = useNavigate()

    const onForgotPassword = async (formValues) => {
        try {
            setIsLoading(true)
            await forgotPassword(formValues.email)
            if (!forgotPasswordResult.isLoading) {
                notification.success({
                    message: 'Success',
                    description: 'Input the verified Code to reset Password',
                    onClose: () => { navigate(`/resetPassword/${formValues.email}`) }
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

                    <Form ref={formRef} onFinish={onForgotPassword} className="mt-2" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Form.Item name="email" label="Email">
                            <Input style={{ borderRadius: '10px' }} placeholder="Type email to get verified code" />
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

export default ForgotPassword