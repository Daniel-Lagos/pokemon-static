const toggleFavorite = (id: number) => {

  let favorite: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]');

  if (favorite.includes(id)) {
    favorite.filter(pokeId => pokeId != id);
  } else {
    favorite.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favorite));

};

export default {
  toggleFavorite
};
