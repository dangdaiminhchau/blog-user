import { HomeOutlined } from "@ant-design/icons"
import { Breadcrumb, Card, Tabs } from "antd"
import UpdateAccount from "./UpdateUser/UpdateAccount"
import UpdateProfile from "./UpdateUser/UpdateProfile"

const UpdateUser = () => {
    return (
        <div>
            <div className="w-full bg-green1 p-8 pl-16 mt-8">
                <div className="font-bold text-lg mb-3 text-white">Feedback</div>
                <Breadcrumb
                    items={[
                        { title: <HomeOutlined className="text-white" />, href: '/' },
                        { title: <span className="text-white">User</span>, href: '/user' },
                        { title: <span className="text-white">Profile Setting</span>, href: '/setting-user' }
                    ]}
                />
            </div>

            <div className="p-24">
                <div className="text-4xl font-playfair font-black hover:cursor-pointer  justify-end text-left">
                    <span className="link link-underline link-underline-black text-black hover:text-green1">Profile Setting 🔧</span>
                </div>
                <div className="flex justify-center">
                    <Card className="mt-8 border-gray2 border-opacity-30 w-[50vw]">
                        <Tabs
                            type="card"
                            items={[
                                {
                                    label: 'Account',
                                    key: 'account',
                                    children: <UpdateAccount />
                                },
                                {
                                    label: 'Profile',
                                    key: 'profile',
                                    children: <UpdateProfile />
                                }
                            ]}
                        />
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default UpdateUser