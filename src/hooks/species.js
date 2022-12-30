import { useQuery } from "@tanstack/react-query";
const fetchSpecies = async (id) => {
  console.log(id)
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  return result.json();
};

const species = (id) => {
  return useQuery(["species"], (id) => {
    console.log(id)
    return fetchSpecies(id);
  });
};

export default species;