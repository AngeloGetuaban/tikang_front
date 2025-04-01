import React from 'react';
import NavBar from '../../components/Navbar';
import SearchBox from './homeComponents/SearchBox';
import './Home.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '../../components/Footer';
import RecommendedHomes from './homeComponents/RecommendedHomes';
import 'react-datepicker/dist/react-datepicker.css';
import CarouselSection from './homeComponents/CarouselSection';
import TopCitiesSection from './homeComponents/TopCitiesSection';
import DiscountsSection from './homeComponents/DiscountsSection';


function Home() {
  return (
    <div className="min-h-screen bg-[#F9FDFB]">
      <NavBar />
      <CarouselSection />
      <SearchBox />
      <TopCitiesSection />
      <DiscountsSection/>
      <RecommendedHomes />
      <Footer />
    </div>
  );
}

export default Home;
