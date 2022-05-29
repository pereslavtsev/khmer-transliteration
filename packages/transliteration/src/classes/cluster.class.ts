import { Character, IndependentVowel, Consonant } from '../data';
import type { Phrase } from './phrase.class';
import { getCharacterClass } from '../helpers';

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
