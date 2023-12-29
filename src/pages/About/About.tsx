import { HomeOutlined } from "@ant-design/icons"
import { Breadcrumb, Skeleton } from "antd"
import { useGetAboutListQuery } from "../../store/api/aboutApi"

const About = () => {
    const { data: aboutList, isFetching: isFetchingAboutList } = useGetAboutListQuery()

    return (
        <div>
            <div className="w-full bg-green1 p-8 pl-16 mt-8">
                <div className="font-bold text-lg mb-3 text-white">About</div>
                <Breadcrumb
                    items={[
                        { title: <HomeOutlined className="text-white" />, href: '/' },
                        { title: <span className="text-white">About Us</span>, href: '/about' }
                    ]}
                />
            </div>

            {isFetchingAboutList && isFetchingAboutList ? <Skeleton className="p-24" active /> : (
                <>
                    <section className="about-us p-24">
                        <div className="container">
                            <div className="about-image-box">
                                <div className="row d-flex align-items-center justify-content-between">
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="about-content">
                                            <h4 className="mb-1 theme font-weight-normal">About Us</h4>
                                            <h2>{aboutList[2].name}</h2>
                                            <p className="mb-3 font-playfair text-lg">{aboutList[2].content}</p>
                                            <div className="about-imagelist">
                                                <ul className="d-flex justify-content-between">
                                                    <li className="me-2">
                                                        <img src={`${aboutList[2].assetList[0].assetURL}`} alt="" />
                                                    </li>
                                                    <li className="me-2">
                                                        <img src={`${aboutList[2].assetList[1].assetURL}`} alt="" />
                                                    </li>
                                                    <li className="me-2">
                                                        <img src={`${aboutList[2].assetList[2].assetURL}`} alt="" />
                                                    </li>
                                                    <li>
                                                        <img src={`${aboutList[2].assetList[3].assetURL}`} alt="" />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="about-image">
                                            <img src={`${aboutList[2].assetList[4].assetURL}`} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="about-us1 bg-grey pb-6 p-24">
                        <div className="container">
                            <div className="about-image-box">
                                <div className="row d-flex align-items-center justify-content-between">
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="about-content">
                                            <h2 className="theme">{aboutList[1].name}</h2>
                                            <p className="mb-2 font-playfair text-lg">{aboutList[1].content}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="about-image-main">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 mt-4 mb-4">
                                                    <img src={aboutList[1].assetList[0].assetURL} alt="" />
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <img src={aboutList[1].assetList[1].assetURL} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="our-team pb-4 p-24">
                        <div className="container">
                            <div className="section-title mb-4 pb-1 w-50">
                                <h2 className="m-0">Our <span>Team</span></h2>
                            </div>
                            <div className="team-main">
                                <div className="row shop-slider">
                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                        <div className="team-list">
                                            <div className="team-image">
                                                <img src={aboutList[0].assetList[0].assetURL} alt="team" />
                                            </div>
                                            <div className="team-content text-center p-3 bg-theme">
                                                <h4 className="mb-0 white">{aboutList[0].assetList[0].name}</h4>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                        <div className="team-list">
                                            <div className="team-image">
                                                <img src={aboutList[0].assetList[1].assetURL} alt="team" />
                                            </div>
                                            <div className="team-content text-center p-3 bg-theme">
                                                <h4 className="mb-0 white">{aboutList[0].assetList[1].name}</h4>
                                            </div>


                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                        <div className="team-list">
                                            <div className="team-image">
                                                <img src={aboutList[0].assetList[2].assetURL} alt="team" />
                                            </div>
                                            <div className="team-content text-center p-3 bg-theme">
                                                <h4 className="mb-0 white">{aboutList[0].assetList[2].name}</h4>
                                            </div>


                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                        <div className="team-list">
                                            <div className="team-image">
                                                <img src={aboutList[0].assetList[3].assetURL} alt="team" />
                                            </div>
                                            <div className="team-content text-center p-3 bg-theme">
                                                <h4 className="mb-0 white">{aboutList[0].assetList[3].name}</h4>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )
            }
        </div>

    )
}

export default About