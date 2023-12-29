import { HomeOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Flex, Form, FormInstance, Image, Input, notification as antdNotification } from "antd"
import { IFeedbackBody } from "../../store/type/feedback"
import { useAddFeedbackMutation } from "../../store/api/feedbackApi"
import { useRef, useState } from "react"

const Feedback = () => {
    const [notification, contextNotification] = antdNotification.useNotification()
    const [addFeeback, addFeebackResult] = useAddFeedbackMutation()
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<FormInstance>(null)

    const onSubmitFeedback = async (formValues: IFeedbackBody) => {
        try {
            setIsLoading(true)
            await addFeeback(formValues)
            if (!addFeebackResult.isLoading) {
                formRef.current?.resetFields()
                notification.success({
                    message: 'Success',
                    description: 'You have successfully submitted feedback 🎉'
                })
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    return (
        <div>
            {contextNotification}
            <div className="w-full bg-green1 p-8 pl-16 mt-8">
                <div className="font-bold text-lg mb-3 text-white">Feedback</div>
                <Breadcrumb
                    items={[
                        { title: <HomeOutlined className="text-white" />, href: '/' },
                        { title: <span className="text-white">Feedback</span>, href: '/feedback' }
                    ]}
                />
            </div>
            <Flex gap={100} justify="space-between" className="p-24">
                <Image width={'100%'} preview={false} src="/public/assets/home/feedback.jpg" />
                <div className="font-playfair flex justify-center flex-col p-8 pr-12 text-lg">
                    <div className="text-4xl font-playfair font-black hover:cursor-pointer  justify-end text-left">
                        <span className="link link-underline link-underline-black text-black hover:text-green1">Our Client Review 💌</span>
                    </div>
                    <div className=" mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus malesuada nisi tellus, non imperdiet nisi tempor at.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore.</div>
                    <div className="mt-8 font-semibold text-black">Give us your review now!</div>
                    <Form ref={formRef} onFinish={onSubmitFeedback} className="mt-2">
                        <Flex gap="large">
                            <Form.Item name="content" className="flex-1 w-2/3">
                                <Input style={{ borderRadius: '10px' }} placeholder="Type here" />
                            </Form.Item>
                            <Form.Item>
                                <Button loading={isLoading} htmlType="submit" type="primary" className="bg-green1 text1">Submit</Button>
                            </Form.Item>
                        </Flex>

                    </Form>
                </div>
            </Flex>
        </div>
    )
}

export default Feedback

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