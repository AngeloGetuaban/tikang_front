import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Lessor from './pages/lessor/Lessor';
import UserLogin from './pages/logins/UserLogin';
import LessorLogin from './pages/logins/LessorLogin';
import TopCitySearch from './pages/TopCitySearch';
import SearchResults from './pages/search-results/SearchResults';
import PlaceDetails from './pages/PlaceDetails';
import BookForm from './pages/BookForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessor" element={<Lessor />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/lessor-login" element={<LessorLogin />} />
        <Route path="/top-city-search" element={<TopCitySearch />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/:placeName" element={<PlaceDetails />} />
        <Route path="/book" element={<BookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
