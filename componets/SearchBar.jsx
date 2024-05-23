// components/SearchBar.jsx
import { useState } from 'react';
// import { useRouter } from 'next/router';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  // const router = useRouter();

  const handleInputChange = (e) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    onSearch(newTerm); //Call onSearch when the input value changes
  };

  // const handleSearch = () => {
  //   onSearch(term);
  //   if (term.trim()) {
  //     router.push({
  //       pathname: '/recommendations',
  //       query: { mood: term }
  //     });
  //   } else {
  //     console.log('Please enter a mood');
  //   }
  // };

  return (
    <div>
      <input
        type="text"
        value={term}
        onChange={handleInputChange}
        placeholder="Enter a movie or tv show"
      />
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
};

export default SearchBar;




