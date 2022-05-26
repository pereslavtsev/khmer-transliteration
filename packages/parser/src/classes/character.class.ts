export type CharacterOptions = {
  code: typeof Character.Code;
};

export abstract class Character {
  static readonly Code: number;
}

export function makeCharacter({ code }: CharacterOptions) {
  return class extends Character {
    static readonly Code = code;
  };
}
