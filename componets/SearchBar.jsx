// components/SearchBar.jsx
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleInputChange = (e) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    onSearch(newTerm); //Call onSearch when the input value changes
  };


  return (
    <div>
      <input
        type="text"
        value={term}
        onChange={handleInputChange}
        placeholder="Enter a movie or tv show"
      />
    </div>
  );
};

export default SearchBar;




