import { Character } from './character.class';
import { IndependentVowel } from './independent-vowel.class';
import { Consonant } from './consonant.class';
import type { Phrase } from '../index';
import { getCharacterClass } from '../index';

interface ClusterContext {
  readonly phrase: Phrase;
  readonly position: number;
}

export class Cluster {
  readonly characters: Character[] = [];

  constructor(protected readonly context: ClusterContext) {}

  protected makeCharacter(code: number): Character {
    const position = this.characters.length;
    const cls = getCharacterClass(code);
    return new cls({ cluster: this, position });
  }

  get length() {
    return this.characters.length;
  }

  get isFirst() {
    return this.context.position === 0;
  }

  get isLast() {
    const { position, phrase } = this.context;
    return position === phrase.clusters.length - 1;
  }

  push(...codes: number[]) {
    const characters = codes.map((code) => this.makeCharacter(code));
    return this.characters.push(...characters);
  }

  get main() {
    return this.characters.find((ch) =>
      [IndependentVowel, Consonant].some((cls) => ch instanceof cls),
    );
  }

  transliterate() {
    return this.characters.map((ch) => ch.transliterate());
  }
}
