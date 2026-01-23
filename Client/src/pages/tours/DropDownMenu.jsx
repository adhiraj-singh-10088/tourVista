import { useState } from 'react';
import DropDownIcon from './DropDownIcon.jsx';
import './DropDownMenu.css';

function DropDownMenu({ filters, setFilters }) {
  const [isOpened, setIsOpened] = useState(false);
  const [menuView, setMenuView] = useState('main');

  const toggleMenu = () => {
    setIsOpened((prev) => !prev);
    setMenuView('main');
  };

  const applyFilter = (type, value) => {
    setFilters({
      ...filters,
      [type]: value,
    });
    setIsOpened(false);
  };

  return (
    <div className="dropdown-menu">
      <button className="dropdown-button" onClick={toggleMenu}>
        <DropDownIcon />
      </button>

      {isOpened && (
        <ul className="dropdown-content">
          {menuView === 'main' && (
            <>
              <li>
                <button onClick={() => setFilters({})}>
                    Clear Filters
                </button>
              </li>

              <li>
                <button onClick={() => setMenuView('difficulty')}>
                  Difficulty
                </button>
              </li>

              <li>
                <button onClick={() => setMenuView('ratings')}>Ratings</button>
              </li>

              <li>
                <button onClick={() => setMenuView('price')}>Price</button>
              </li>
            </>
          )}

          {menuView === 'difficulty' && (
            <>
              <li>
                <button onClick={() => setMenuView('main')}>← Back</button>
              </li>

              <li>
                <button onClick={() => applyFilter('difficulty', 'easy')}>
                  Easy
                </button>
              </li>

              <li>
                <button onClick={() => applyFilter('difficulty', 'medium')}>
                  Medium
                </button>
              </li>

              <li>
                <button onClick={() => applyFilter('difficulty', 'difficult')}>
                  Hard
                </button>
              </li>
            </>
          )}

          {menuView === 'ratings' && (
            <>
              <li>
                <button onClick={() => setMenuView('main')}>← Back</button>
              </li>

              <li>
                <button onClick={() => applyFilter('ratingsAverage[gte]', 2)}>
                  Above 2 Stars
                </button>
              </li>

              <li>
                <button onClick={() => applyFilter('ratingsAverage[gte]', 3)}>
                  Above 3 Stars
                </button>
              </li>

              <li>
                <button onClick={() => applyFilter('ratingsAverage[gte]', 4)}>
                  Above 4 Stars
                </button>
              </li>
            </>
          )}

          {menuView === 'price' && (
            <>
              <li>
                <button onClick={() => setMenuView('main')}>← Back</button>
              </li>

              <li>
                <button onClick={() => applyFilter('price[gte]', 400)}>
                  Above 400
                </button>
              </li>

              <li>
                <button onClick={() => applyFilter('price[gte]', 500)}>
                  Above 500
                </button>
              </li>

              <li>
                <button onClick={() => applyFilter('sort', 'price')}>
                  Price: Low to High
                </button>
              </li>

              <li>
                <button onClick={() => applyFilter('sort', '-price')}>
                  Price: High to Low
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default DropDownMenu;
