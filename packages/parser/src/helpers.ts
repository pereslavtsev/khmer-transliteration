import {
  Consonants,
  DependentVowels,
  Diacritics,
  IndependentVowels,
} from './data';

export function isConsonant(code: number) {
  return Object.values(Consonants)
    .map((cls) => cls.Code)
    .includes(code);
}

export function isIndependentVowel(code: number) {
  return Object.values(IndependentVowels)
    .map((cls) => cls.Code)
    .includes(code);
}

export function isDiacritics(code: number) {
  return Object.values(Diacritics)
    .map((cls) => cls.Code)
    .includes(code);
}

export function isDependentVowel(code: number) {
  return Object.values(DependentVowels)
    .map((cls) => cls.Code)
    .includes(code);
}
