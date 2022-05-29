import {
  Consonants,
  DependentVowels,
  Diacritics,
  IndependentVowels,
} from './data';

export const CHARACTER_MAP = new Map(
  [
    ...Object.values(Consonants),
    ...Object.values(Diacritics),
    ...Object.values(IndependentVowels),
    ...Object.values(DependentVowels),
  ].map((cls) => [cls.Code, cls]),
);
