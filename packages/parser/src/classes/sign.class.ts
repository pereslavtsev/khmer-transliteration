import { Character, CharacterOptions } from './character.class';

type SignOptions = CharacterOptions;

export abstract class Sign extends Character {
  transliterate() {
    return null;
  }
}

export function makeSign({ code }: SignOptions) {
  return class extends Sign {
    static readonly Code = code;
  };
}
