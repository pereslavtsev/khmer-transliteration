import type { Cluster } from '../../classes';

export type CharacterOptions = {
  code: typeof Character.Code;
  obsolete?: typeof Character.Obsolete;
};

interface CharacterContext {
  readonly cluster: Cluster;
  readonly position: number;
}

export abstract class Character {
  static readonly Code: number;
  static readonly Obsolete: boolean = false;

  constructor(protected readonly context: CharacterContext) {}

  get grapheme(): string {
    return String.fromCodePoint(this['constructor']['Code']);
  }

  get previous(): Character | null {
    const { cluster, position } = this.context;
    return cluster.characters[position - 1] ?? null;
  }

  get next(): Character | null {
    const { cluster, position } = this.context;
    return cluster.characters[position + 1] ?? null;
  }

  abstract transliterate();
}
