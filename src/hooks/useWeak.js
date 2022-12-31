import { useMutation } from "@tanstack/react-query";

const fetchWeak = async (name) => {
  const result = await fetch(`https://pokeapi.co/api/v2/type/grass`)
  return result.json()
}

const useWeak = () => {
  return useMutation(name => {
    return fetchWeak(name)
  })

}
export default useWeak