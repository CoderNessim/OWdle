export async function getCharacters() {
  const res = await fetch('https://overfast-api.tekrop.fr/heroes');
  if (!res.ok) throw new Error('Failed to fetch characters');
  const data = await res.json();
  return data;
}

export async function getRandomCharacter() {
  const allCharacters = await getCharacters();
  const selectArray = allCharacters.map((character) => character.name);
  const randomIndex = Math.floor(Math.random() * allCharacters.length);
  const randomCharacter = allCharacters[randomIndex].key;
  const res = await fetch(
    `https://overfast-api.tekrop.fr/heroes/${randomCharacter}`
  );
  if (!res.ok) throw new Error('Failed to fetch characters');
  const data = await res.json();
  return { data, selectArray };
}
