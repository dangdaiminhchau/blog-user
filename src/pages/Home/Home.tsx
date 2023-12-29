// import PostFollowCates from "./components/PostFollowCates"
import MoreTopDate from "./components/MoreTopDate"
import MostView from "./components/MostView"
import TopDate from "./components/TopDate"
import TopView from "./components/TopView"

const Home = () => {
    return (
        <div className="mt-16">
            <TopDate />
            <TopView />
            <MoreTopDate />
            <MostView />
            {/* <PostFollowCates /> */}
        </div>
    )
}

export default Home