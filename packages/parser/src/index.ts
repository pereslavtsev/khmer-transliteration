import {
  Diacritics,
  Consonants,
  IndependentVowels,
  DependentVowels,
} from './data';
import { Cluster } from './classes';
import { TransliterationSystem } from './enums';

const CHARACTER_MAP = new Map(
  [
    ...Object.values(Consonants),
    ...Object.values(Diacritics),
    ...Object.values(IndependentVowels),
    ...Object.values(DependentVowels),
  ].map((cls) => [cls.Code, cls]),
);

export function getCharacterClass(code: number) {
  return CHARACTER_MAP.get(code);
}

function isConsonant(code: number) {
  return Object.values(Consonants)
    .map((cls) => cls.Code)
    .includes(code);
}

function isIndependentVowel(code: number) {
  return Object.values(IndependentVowels)
    .map((cls) => cls.Code)
    .includes(code);
}

function isDiacritics(code: number) {
  return Object.values(Diacritics)
    .map((cls) => cls.Code)
    .includes(code);
}

function isDependentVowel(code: number) {
  return Object.values(DependentVowels)
    .map((cls) => cls.Code)
    .includes(code);
}

export class Phrase {
  readonly clusters: Cluster[] = [];

  protected makeCluster(): Cluster {
    const position = this.clusters.length;
    return new Cluster({ phrase: this, position });
  }

  constructor(readonly originalPhrase: string) {
    const characters = this.originalPhrase
      .split('')
      .map((ch) => ch.codePointAt(0));
    console.log('characters', this.originalPhrase.split(''));
    for (let i = 0; i < characters.length; i++) {
      if (isIndependentVowel(characters[i]) || isConsonant(characters[i])) {
        const cluster = this.makeCluster();
        cluster.push(characters[i]);
        for (let j = i + 1; j < characters.length; j++) {
          if (
            isDiacritics(characters[j]) ||
            isDependentVowel(characters[j]) ||
            characters[j - 1] === Diacritics.Coeng.Code
          ) {
            cluster.push(characters[j]);
            i = j;
          } else if (
            isIndependentVowel(characters[j]) ||
            isConsonant(characters[j])
          ) {
            break;
          }
        }
        this.clusters.push(cluster);
      }
    }
  }

  transliterate() {
    const transliterations = this.clusters.map((c) => c.transliterate());
    return {
      toString: (options: any = {}) => {
        const { mode = TransliterationSystem.GD } = options;
        const result = transliterations.flat().map((transliteration) => {
          if (!transliteration) {
            return '';
          }
          switch (typeof transliteration) {
            case 'object': {
              return transliteration[mode];
            }
            case 'string':
            default: {
              return transliteration;
            }
          }
        });
        return result.join('');
      },
    };
  }
}

export default function transliterate(phrase: string, options: any = {}) {
  return new Phrase(phrase).transliterate().toString();
}
