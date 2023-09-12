export async function getMovies() {
  const res = await fetch('https://api.nomoreparties.co/beatfilm-movies');
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
