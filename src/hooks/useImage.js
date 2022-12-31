import { useMutation } from "@tanstack/react-query";

const fetchImg = async (name) => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return result.json();
};

const useImage = () => {
  return useMutation((name) => {
    return fetchImg(name);
  });
};

export default useImage;
