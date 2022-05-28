import { ConsonantSeries } from '../enums';
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

export abstract class Consonant extends Character {
  static readonly Series:
    | ConsonantSeries
    | ConsonantSeries[keyof ConsonantSeries];

  static readonly Voiced: Transliteration;
  static readonly Voiceless: Transliteration;

  hasSubscripts() {
    return this.context.cluster.length > 1;
  }

  get series() {
    return this['constructor']['Series'];
  }

  get voiced(): Transliteration {
    return this['constructor']['Voiced'];
  }

  get voiceless(): Transliteration {
    return this['constructor']['Voiceless'];
  }

  transliterate() {
    return !this.hasSubscripts() && !this.context.cluster.isLast
      ? this.voiced
      : this.voiceless;
  }

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
  };
}
