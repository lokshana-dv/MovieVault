import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';

import './MovieList.css';
import MovieCard from './MovieCard';
import FilterGroup from './FilterGroup';

const MovieList = ({ type, title, emoji }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: 'default',
    order: 'asc',
  });

  const fetchMovies = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=4354e3ee09668cdd49aa7e758deb9e82`
    );
    const data = await response.json();
    setMovies(data.results);
    setFilteredMovies(data.results);
  }, [type]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    let updated = [...movies];

    if (minRating > 0) {
      updated = updated.filter((movie) => movie.vote_average >= minRating);
    }

    if (sort.by !== 'default') {
      updated = _.orderBy(updated, [sort.by], [sort.order]);
    }

    setFilteredMovies(updated);
  }, [movies, minRating, sort]);

  const handleFilter = (rate) => {
    setMinRating((prev) => (prev === rate ? 0 : rate));
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title} <img src={emoji} alt={`${emoji} icon`} className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <FilterGroup
            MinRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />

          <select
            name="by"
            onChange={handleSort}
            value={sort.by}
            className="movie_sorting"
          >
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>

          <select
            name="order"
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;

