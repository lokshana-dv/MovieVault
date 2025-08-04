import React from 'react'

const FilterGroup = ({MinRating, onRatingClick, ratings}) => {
  return (
    <ul className="align_center movie_filter">
        {
            ratings.map((rate) => ( <li 
                className={
                    MinRating === rate
                    ? 'movie_filter_item active'
                     : 'movie_filter_item'} 
                     key={rate}
                     onClick={() => onRatingClick(rate)}>
                        {rate}+ Star
                        </li>))
        }
                </ul>
  )
}

export default FilterGroup
