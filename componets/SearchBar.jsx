// components/SearchBar.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(term);
    if (term.trim()) {
      router.push({
        pathname: '/recommendations',
        query: { mood: term }
      });
    } else {
      console.log('Please enter a mood');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={term}
        onChange={handleInputChange}
        placeholder="Enter a mood"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;




