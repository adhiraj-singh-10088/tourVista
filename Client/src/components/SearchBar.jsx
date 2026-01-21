import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SearchIcon from './SearchIcon.jsx';
import './SearchBar.css';

function SearchBar() {
  const [isOpened, setIsOpened] = useState(false);

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
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="search-button"
        onClick={() => setIsOpened(prev => !prev)}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
