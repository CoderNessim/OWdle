import { useLoaderData } from "react-router-dom";
import { getRandomCharacter } from "../../services/apiOverwatch"

function ImageGuess() {
  const data = useLoaderData();
  return (
    <div>
      <img src={data.portrait} />
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export async function imageLoader() {
  const data = await getRandomCharacter();
  return data;
}

export default ImageGuess
