import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SearchIcon from './SearchIcon.jsx';
import './SearchBar.css';

function SearchBar({ searchQuery, setSearchQuery }) {
  const [isOpened, setIsOpened] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    if (!isOpened) {
      setIsOpened(true);
    } else {
      setSearchQuery(localQuery);
    }
  };

  return (
    <div className="search-bar">
      <AnimatePresence>
        {isOpened && (
          <motion.div
            className="input_wrapper"
            key="search"
            initial={{ width: 0 }}
            animate={{ width: 240 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              className="search-input"
              type="text"
              placeholder="Search Tours"
              autoFocus
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="search-button"
        onClick={handleSearch}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
