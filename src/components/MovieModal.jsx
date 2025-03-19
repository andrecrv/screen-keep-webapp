import React from 'react'

const MovieModal = ({ movie:
    { title, overview, vote_average, popularity, poster_path, backdrop_path, genre_ids, release_date, original_language, adult }, handleModal }) => {
    return (
        <div className="movie-modal">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} />

            {/* <img src={backdrop_path ? `https://image.tmdb.org/t/p/w500/${backdrop_path}` : '/no-movie.png'} alt={title} style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain"}} /> */}

            <div className="mt-4">
                <div>
                    <h3>{title}</h3>
                </div>

                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="Star Icon" />
                        <p>{vote_average
                            ? `${vote_average.toFixed(1)}/10 (${popularity})`
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

                <div className="mt-5 flex flex-row gap-16">
                    <p className="text-white">Overview</p>
                    <p className="text-white">{overview || "N/A"}</p>
                </div>

                <div className="mt-5 flex flex-row gap-10">
                    <p className="text-white">Release date</p>
                    <p className="text-white">{release_date}</p>
                </div>
            </div>

            <div className="flex justify-end items-start">
                <button name="close-button" className="text-white bg-red-500 rounded-lg px-3 py-1 cursor-pointer" onClick={() => handleModal(null)}>x</button>
            </div>
        </div>
    )
}

export default MovieModal