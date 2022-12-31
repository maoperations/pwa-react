import { useQuery } from "@tanstack/react-query";

const fetchSpecies = async (id) => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  return result.json();
};

const useSpecies = (id) => {
  return useQuery(['spesies'], () => {
    return fetchSpecies(id)
  });
};

export default useSpecies;