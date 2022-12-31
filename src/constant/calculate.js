import { useMutation } from "@tanstack/react-query";

export const LBS = (weight) => {
  return (
    (weight * 2.2046).toFixed(1)
  )
}

export const FEET = (height) => {
  let feet = height * 3.28084;
  let wholeFeet = (feet / 12).toFixed(1) * 10
  let inches = feet * 12;
  let remainingInches = Math.round(inches % 12);
  remainingInches = remainingInches.toString().padStart(2, '0');
  return `(${wholeFeet}'${remainingInches}")`;
}

export async function calculateWeakness(type) {
  let weaknesses = [];
  let resistances = [];

  const result = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
  const data = await result.json()

  weaknesses = weaknesses.concat(data.damage_relations.double_damage_from);
  resistances = resistances.concat(data.damage_relations.half_damage_from);

  return {
    weaknesses: [...new Set(weaknesses)],
    resistances: [...new Set(resistances)]
  };
}

export async function calculateWeakness1(type1, type2) {
  let weaknesses = [];
  let resistances = [];

  // Retrieve the weaknesses and resistances for type 1
  const response1 = await fetch(`https://pokeapi.co/api/v2/type/${type1}`);
  const data1 = await response1.json();
  weaknesses = weaknesses.concat(data1.damage_relations.double_damage_from);
  resistances = resistances.concat(data1.damage_relations.half_damage_from);

  // Retrieve the weaknesses and resistances for type 2
  const response2 = await fetch(`https://pokeapi.co/api/v2/type/${type2}`);
  const data2 = await response2.json();
  weaknesses = weaknesses.concat(data2.damage_relations.double_damage_from);
  resistances = resistances.concat(data2.damage_relations.half_damage_from);

  // Remove duplicates and return the combined weaknesses and resistances
  return {
    weaknesses: [...new Set(weaknesses)],
    resistances: [...new Set(resistances)]
  };
}









