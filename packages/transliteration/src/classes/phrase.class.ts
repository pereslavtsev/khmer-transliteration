import { Cluster } from './cluster.class';
import {
  isConsonant,
  isDependentVowel,
  isDiacritics,
  isIndependentVowel,
} from '../helpers';
import { Diacritics } from '../data';
import { TransliterationSystem } from '../enums';

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
