import DestinationWeddings from "./HomePages/DestinationWeddings";
import Section1 from "./HomePages/Section1";
import Section3 from "./HomePages/Section3";
import Section4 from "./HomePages/Section4";
import Section5 from "./HomePages/Section5";
import Section6 from "./HomePages/Section6";
import SectionRoom from "./HomePages/SectionRoom";
import Video from "./HomePages/video";



function Home() {
    return (
        <>
            <Section1 />
            <Video />
            <Section3 />
            <SectionRoom />
            <DestinationWeddings />
            <Section4 />
            <Section5 />
            <Section6 />


        </>
    );
}

export default Home;