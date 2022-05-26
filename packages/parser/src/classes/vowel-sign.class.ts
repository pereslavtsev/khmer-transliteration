import { Character, CharacterOptions } from './character.class';
import type { TransliterationSystem } from './consonant.class';
import type { ConsonantSeries } from '../enums/consonant-series.enum';

type VowelSignOptions = CharacterOptions & {
  code: typeof VowelSign.Code;
  pronunciations: typeof VowelSign.Pronunciations;
};

type VowelSignPronunciation = Partial<
  Record<TransliterationSystem, Record<ConsonantSeries, string> | string>
>;

abstract class VowelSign extends Character {
  static readonly Pronunciations: VowelSignPronunciation;
}

export function makeVowelSign({ code, pronunciations }: VowelSignOptions) {
  return class extends VowelSign {
    static readonly Code = code;
    static readonly Pronunciations = pronunciations;
  };
}
