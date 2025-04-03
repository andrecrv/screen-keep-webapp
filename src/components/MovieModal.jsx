import React from 'react'

const MovieModal = ({ movie:
    { title, overview, vote_average, popularity, poster_path, backdrop_path, genre_ids, release_date, original_language, adult }, genres, handleModal }) => {

    const formattedDate = new Date(release_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const filteredGenres = genres.filter(genre => genre_ids.includes(genre.id))

    //console.log("Filtered genres: ", filteredGenres);

    return (
        <div className="movie-modal">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} />

            {/* <img src={backdrop_path ? `https://image.tmdb.org/t/p/w500/${backdrop_path}` : '/no-movie.png'} alt={title} style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain"}} /> */}

            <div className="mt-1">
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="Star Icon" />
                        <p>{vote_average
                            ? `${vote_average.toFixed(1)}/10 (${popularity.toFixed(0)}K)`
                            : 'N/A'
                        }</p>
                    </div>

                    <span>•</span>
                    <p className="lang">{original_language}</p>

                    <span>•</span>
                    <p className="year">
                        {release_date ? release_date.split('-')[0] : 'N/A'}
                    </p>

                    <span>•</span>
                    <p className="text-white">{adult ? "TV-MA" : "PG-13"}</p>
                </div>

                <div className="details">
                    <div className="genres">
                        <p className="label">Genres</p>
                        <div className="flex gap-4">
                            {filteredGenres.map(genre => (
                                <p key={genre.id} className="category">{genre.name}</p>
                            ))}
                        </div>
                    </div>

                    <div className="overview">
                        <p className="label">Overview</p>
                        <p className="description">{overview || "N/A"}</p>
                    </div>

                    <div className="release-date">
                        <p className="label">Release date</p>
                        <p className="description">{formattedDate}</p>
                    </div>
                </div>
            </div>

            <div className="close-button">
                <button
                    name="close-button"
                    onClick={() => handleModal(null)}>
                    🗙
                </button>
            </div>
        </div>
    )
}

export default MovieModal