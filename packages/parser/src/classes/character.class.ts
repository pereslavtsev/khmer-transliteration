import type { Cluster } from './cluster.class';

export type CharacterOptions = {
  code: typeof Character.Code;
};

interface CharacterContext {
  readonly cluster: Cluster;
  readonly position: number;
}

export abstract class Character {
  static readonly Code: number;

  constructor(protected readonly context: CharacterContext) {}

  abstract transliterate();
}
