import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Owner from './pages/owner/Owner';
import UserLogin from './pages/logins/UserLogin';
import OwnerLogin from './pages/logins/OwnerLogin';
import TopCitySearch from './pages/TopCitySearch';
import SearchResults from './pages/search-results/SearchResults';
import PlaceDetails from './pages/PlaceDetails';
import BookForm from './pages/BookForm';
import AccountInformation from './pages/account/AccountInformation';
import MyAccount from './pages/account/views/MyAccount';
import Bookings from './pages/account/views/Bookings';
import Messages from './pages/account/views/Messages';
import TikangCash from './pages/account/views/TikangCash';
import Reviews from './pages/account/views/Reviews';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/top-city-search" element={<TopCitySearch />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/:placeName" element={<PlaceDetails />} />
        <Route path="/book" element={<BookForm />} />
        <Route path="/account" element={<AccountInformation />}>
        <Route index element={<MyAccount />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="messages" element={<Messages />} />
        <Route path="tikangcash" element={<TikangCash />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
