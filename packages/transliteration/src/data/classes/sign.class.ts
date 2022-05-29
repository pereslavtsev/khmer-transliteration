import { Character, CharacterOptions } from './character.class';
import type { TransliterationSystem } from '../../enums';

type SignOptions = CharacterOptions & {
  transliterate?: (
    context?: any,
  ) => string | Partial<Record<TransliterationSystem, string>>;
};

export abstract class Sign extends Character {
  transliterate() {
    return null;
  }
}

export function makeSign({ code, transliterate }: SignOptions) {
  return class extends Sign {
    static readonly Code = code;
    transliterate() {
      if (!transliterate) {
        return super.transliterate();
      }
      return transliterate(this.context);
    }
  };
}
