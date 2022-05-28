import { Character, CharacterOptions } from './character.class';
import { TransliterationSystem } from './consonant.class';

type IndependentVowelOptions = CharacterOptions & {
  pronunciations: typeof IndependentVowel.Pronunciations;
};

type Pronunciation = Partial<Record<TransliterationSystem, string>>;

export abstract class IndependentVowel extends Character {
  static readonly Pronunciations: Pronunciation;

  get pronunciations() {
    return this['constructor']['Pronunciations'];
  }

  transliterate() {
    return this.pronunciations;
  }
}

export function makeIndependentVowel({
  code,
  pronunciations,
}: IndependentVowelOptions) {
  return class extends IndependentVowel {
    static readonly Code = code;
    static readonly Pronunciations = pronunciations;
  };
}
