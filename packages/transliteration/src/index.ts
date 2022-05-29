import { Phrase } from './classes/phrase.class';

export * from './enums';

export default function transliterate(phrase: string, options: any = {}) {
  return new Phrase(phrase).transliterate().toString();
}
