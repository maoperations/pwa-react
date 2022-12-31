import { useQuery } from "@tanstack/react-query";

const fetchList = async (url) => {
  const result = await fetch(url);
  return result.json();
};

const useEvolutions = (evolutions) => {
  return useQuery(["evolutions", { evolutions: evolutions }], () => {
    return fetchList(evolutions);
  });
};

export default useEvolutions;

