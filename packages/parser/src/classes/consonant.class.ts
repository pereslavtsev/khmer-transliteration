import { ConsonantSeries } from '../enums/consonant-series.enum';
import { Character, CharacterOptions } from './character.class';

type ConsonantOptions = CharacterOptions & {
  series: typeof Consonant.Series;
  voiced: typeof Consonant.Voiced;
  voiceless: typeof Consonant.Voiceless;
};

export enum TransliterationSystem {
  'ALA-LC' = 'ALA-LC',
  GD = 'GD',
  IPA = 'IPA',
  UNGEGN = 'UNGEGN',
}

type Transliteration = Partial<Record<TransliterationSystem, string>>;

abstract class Consonant extends Character {
  static readonly Series:
    | ConsonantSeries
    | ConsonantSeries[keyof ConsonantSeries];

  static readonly Voiced: Transliteration;
  static readonly Voiceless: Transliteration;

  toString() {
    return String.fromCodePoint(Consonant.Code);
  }
}

export function makeConsonant({
  code,
  series,
  voiced,
  voiceless,
}: ConsonantOptions) {
  return class extends Consonant {
    static readonly Series = series;
    static readonly Code = code;
    static readonly Voiced: Transliteration = voiced;
    static readonly Voiceless: Transliteration = voiceless;

    constructor() {
      super();
    }
  };
}
