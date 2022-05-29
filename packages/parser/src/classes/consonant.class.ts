import { ConsonantSeries } from '../enums';
import { Character, CharacterOptions } from './character.class';
import { VowelSign } from './vowel-sign.class';
import type { TransliterationSystem } from '../enums';

type ConsonantOptions = CharacterOptions & {
  series: typeof Consonant.Series;
  voiced: typeof Consonant.Voiced;
  voiceless: typeof Consonant.Voiceless;
};

type Transliteration = Partial<Record<TransliterationSystem, string>>;

export abstract class Consonant extends Character {
  static readonly Series:
    | ConsonantSeries
    | ConsonantSeries[keyof ConsonantSeries];

  static readonly Voiced: Transliteration;
  static readonly Voiceless: Transliteration;

  hasSubscripts() {
    return this.next?.['constructor']['Code'] === 0x17d2; // TODO: !
  }

  hasBantoc() {
    return this.next?.['constructor']['Code'] === 0x17cb; // TODO: !
  }

  hasDependentVowels() {
    return this.context.cluster.characters.some(
      (ch) => ch instanceof VowelSign,
    );
  }

  get isSubscript() {
    return this.previous?.['constructor']['Code'] === 0x17d2; // TODO: !
  }

  isSingle() {
    return this.context.cluster.length === 1;
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
    if (this.hasBantoc()) {
      return this.voiceless;
    }
    if (this.hasSubscripts()) {
      return this.voiceless;
    }
    if (this.hasDependentVowels()) {
      return this.voiceless;
    }
    if (!this.hasDependentVowels() && !this.context.cluster.isLast) {
      return this.voiced;
    }
    return !this.hasSubscripts() &&
      !this.isSubscript &&
      !this.context.cluster.isLast
      ? this.voiced
      : this.voiceless;
  }
}

export function makeConsonant({
  code,
  series,
  voiced,
  voiceless,
  obsolete,
}: ConsonantOptions) {
  return class extends Consonant {
    static readonly Series = series;
    static readonly Code = code;
    static readonly Obsolete = obsolete;
    static readonly Voiced: Transliteration = voiced;
    static readonly Voiceless: Transliteration = voiceless;
  };
}
