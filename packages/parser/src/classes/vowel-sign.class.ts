import { Character, CharacterOptions } from './character.class';
import type { TransliterationSystem } from '../enums';
import type { ConsonantSeries } from '../enums';
import { Consonant } from './consonant.class';

type VowelSignOptions = CharacterOptions & {
  pronunciations: typeof VowelSign.Pronunciations;
};

type VowelSignPronunciation = Partial<
  Record<TransliterationSystem, Record<ConsonantSeries, string> | string>
>;

export abstract class VowelSign extends Character {
  static readonly Pronunciations: VowelSignPronunciation;

  get series(): ConsonantSeries {
    const { cluster, position } = this.context;
    const consonant = cluster.characters
      .slice(0, position)
      .reverse()
      .find((ch) => ch instanceof Consonant && !ch.isSubscript) as Consonant;
    return consonant.series;
  }

  transliterate() {
    const pronunciations: VowelSignPronunciation =
      this['constructor']['Pronunciations'];
    return Object.fromEntries(
      Object.entries(pronunciations).map(([system, pronunciation]) => [
        system,
        pronunciation[this.series],
      ]),
    );
  }
}

export function makeVowelSign({ code, pronunciations }: VowelSignOptions) {
  return class extends VowelSign {
    static readonly Code = code;
    static readonly Pronunciations = pronunciations;
  };
}
