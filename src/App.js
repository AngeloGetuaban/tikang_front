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
      </Routes>
    </Router>
  );
}

export default App;
