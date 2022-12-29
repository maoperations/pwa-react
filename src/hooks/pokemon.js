import { useQuery } from "@tanstack/react-query";
const fetchList = async () => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`);
  return result.json();
};

const pokemon = () => {
  return useQuery(["data"], () => {
    return fetchList();
  });
};

export default pokemon;