import TopNavBar from "../modules/TopNavBar";

export default function Home() {


    return <>
        <TopNavBar />
        
        <h1>Welcome to _ProjectName_</h1>

        <p> On the Profiles page, explore user profiles and compare their achievements against the global leaderboard for each game.</p>
        <p>All users must be searched by a valid steam ID and have their profiles set to public, otherwise information will be unavailable.</p>
        {/*TODO: using pictures show examples on how to use site and where it might break if profile is private*/}
        {/*TODO: HashRouter*/}
    </>
}
