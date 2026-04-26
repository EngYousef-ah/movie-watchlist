export const updateMovieRating = async (movieId, rating) => {
    const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating })
    });
    return response.json();
};