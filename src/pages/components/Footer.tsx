import { FacebookOutlined, GoogleOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, PushpinOutlined, TwitterOutlined, YoutubeFilled } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useGetAboutListQuery } from "../../store/api/aboutApi"

const FooterComponent = () => {
    const { data: footerContent } = useGetAboutListQuery()

    return (
        <div className="footer-area bg-gray1 w-full p-24">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="widget">
                            <h5 className="widget-title text-white">ABOUT US</h5>
                            <div className="widget_about">
                                <p>{footerContent && footerContent[4].content}</p>
                                <ul className="social-area social-area-2 mt-4">
                                    <li><a className="facebook-icon" href="https://www.facebook.com/solverwp/"><FacebookOutlined /></a></li>
                                    <li><a className="twitter-icon" href="https://www.twitter.com/solverwp/"><TwitterOutlined /></a></li>
                                    <li><a className="youtube-icon" href="https://www.youtube.com/solverwp/"><YoutubeFilled /></a></li>
                                    <li><a className="instagram-icon" href="https://www.instagram.com/solverwp/"><InstagramOutlined /></a></li>
                                    <li><a className="google-icon" href="https://www.google.com/solverwp/"><GoogleOutlined /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <div className="widget">
                            <h5 className="widget-title">CONTACTS</h5>
                            <ul className="contact_info_list">
                                <li><PushpinOutlined /> {footerContent && footerContent[3].content.split('\n')[0]}</li>
                                <li><PhoneOutlined /> {footerContent && footerContent[3].content.split('\n')[1]}</li>
                                <li><MailOutlined /> {footerContent && footerContent[3].content.split('\n')[2]}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="widget">
                            <h5 className="widget-title">QUICK LINK</h5>
                            <ul className="widget_nav_menu go-top">
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/categories">Categories</Link></li>
                                <li><Link to="/">Home</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom text-center">

                    <p>Copyright ©2022 CustomBlog</p>
                </div>
            </div>
        </div>
    )
}

export default FooterComponent