import { Character } from './data';

const CHARACTER_MAP = new Map(
  Object.values(Character).map((cls) => [cls.Code, cls]),
);

function getLetterByCode(code: number) {
  return CHARACTER_MAP.get(code);
}

export default function transliterate(phrase: string) {
  const characters = phrase.split('');
  const classes = characters.map(
    (ch) => getLetterByCode(ch.codePointAt(0)).Code === Character.Coeng.Code,
  );
  console.log(classes);
  console.log(characters);
}
