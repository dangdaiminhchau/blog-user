import { AppstoreOutlined, HomeOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons"
import { Flex, Input, Menu, Image, Button, Dropdown } from "antd"
import type { MenuProps } from "antd"
import "../../scss/override.scss"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useGetUserQuery } from "../../store/api/userApi"
import { logout, setUser } from "../../store/state/authSlice"
import { useGetSearchQuery } from "../../store/api/contentApi"

const Navigation = () => {

    const { user } = useSelector((state: any) => state.auth)

    const token = localStorage.getItem('token')

    const [isSignedin, setIsSignedin] = useState(false);

    const navigate = useNavigate()

    const { data } = useGetUserQuery('user', {
        pollingInterval: 900000,
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (token && token) setIsSignedin(true)
    }, [token])

    useEffect(() => {
        if (data && data) dispatch(setUser(data))
    }, [data, dispatch])

    const signout = () => {
        setIsSignedin(false)
        dispatch(logout())
        navigate('/')
        // window.location.reload()
    }


    const items: MenuProps['items'] = [
        {
            label: 'Home',
            key: '/',
            icon: <HomeOutlined />
        },
        {
            label: 'Categories',
            key: '/categories',
            icon: <AppstoreOutlined />,
        },
        {
            label: 'About Us',
            key: '/about',
            icon: <UserOutlined />
        },

    ]

    const itemsUser: MenuProps['items'] = [
        {
            label: (<Link to={'/upload'}>Upload Post</Link>),
            key: '/upload',
        },
        {
            label: (<Link to={'/feedback'}>Feedback</Link>),
            key: '/feedback',
        },
        {
            label: (<Link to={'/setting-user'}>Setting User</Link>),
            key: '/setting-user',
        },

    ]



    const navigation = useNavigate()
    const [dataSearch, setDataSearch] = useState<any>()
    const { data: getSearchData } = useGetSearchQuery(dataSearch)

    const handleInputChange = (e) => {
        try {
            setDataSearch(e.target.value)
        } catch (error) {
            console.log(error)
        }
    }

    const onHandleSearch = () => {
        console.log(getSearchData)
    }



    return (
        <Flex className="w-full h-16 p-0 bg-white pr-4 shadow-sm" justify="space-between" align="center">
            <Image preview={false} height={32} src="../../../public/assets/logo-page.png" />
            <Menu className="bg-white" style={{ fontWeight: 'bold', color: '#1F2937', overflow: 'visible', paddingLeft: '48px' }} mode="horizontal" items={items} onClick={(item) => navigation(item.key)} />
            <Input onChange={handleInputChange} onPressEnter={onHandleSearch} prefix={<SearchOutlined className="text-text1 " />} className="w-1/5 mr-32 h-1/2" placeholder="Search" />

            {isSignedin ?
                <Flex className="mr-8" gap="middle" align="center">
                    <div className="font-bold text-button1">Hello {user.display_name} &#128129;</div>
                    <Dropdown menu={{ items: itemsUser }} placement="bottomRight" arrow>
                        <Button onClick={() => navigate('/user')} className="bg-button1" type="primary">Profile Account</Button>
                    </Dropdown>
                    <Button className="rounded-lg" type="primary" danger onClick={signout}>Sign out</Button>
                </Flex>
                :
                <div className="mr-8">
                    <Button onClick={() => navigate('/signin')} className="bg-button1 mr-2 rounded-lg" type="primary">Sign in</Button>
                    <Button onClick={() => navigate('/signup')} className="rounded-lg" type="primary" danger>Sign up</Button>
                </div>
            }
        </Flex >
    )
}

export default Navigation