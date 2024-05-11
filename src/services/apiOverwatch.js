export async function getCharacters() {
  const res = await fetch('https://overfast-api.tekrop.fr/heroes');
  const data = await res.json();
  return data;
}
