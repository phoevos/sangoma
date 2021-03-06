import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination' style={{cursor: 'pointer'}}>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <div onClick={() => {paginate(number); window.scrollTo(0, 0);}} className='page-link'>
              {number}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;