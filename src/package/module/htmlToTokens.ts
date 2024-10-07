import {isEndOfTag, isStartOfTag, isWhitespace} from "./htmlTokenValidator";
import {Mode} from "../type";

// HTML을 태그, 공백, 일반 텍스트로 나눠서 배열로 반환
function htmlToTokens(html: string): string[] {
  let mode: Mode = 'char';
  let currentWord = '';
  const words: string[] = [];

  for (const char of html) {
    switch (mode) {
      case 'tag':
        if (isEndOfTag(char)) {
          currentWord += '>';
          words.push(currentWord);
          currentWord = '';
          if (isWhitespace(char)) {
            mode = 'whitespace';
          } else {
            mode = 'char';
          }
        } else {
          currentWord += char;
        }
        break;
      case 'char':
        if (isStartOfTag(char)) {
          if (currentWord) words.push(currentWord);
          currentWord = '<';
          mode = 'tag';
        } else if (/\s/.test(char)) {
          if (currentWord) words.push(currentWord);
          currentWord = char;
          mode = 'whitespace';
        } else if (/[\w\#@]+/i.test(char)) {
          currentWord += char;
        } else {
          if (currentWord) words.push(currentWord);
          currentWord = char;
        }
        break;
      case 'whitespace':
        if (isStartOfTag(char)) {
          if (currentWord) words.push(currentWord);
          currentWord = '<';
          mode = 'tag';
        } else if (isWhitespace(char)) {
          currentWord += char;
        } else {
          if (currentWord) words.push(currentWord);
          currentWord = char;
          mode = 'char';
        }
        break;
      default:
        throw new Error(`Unknown mode ${mode}`);
    }
  }

  if (currentWord) words.push(currentWord);
  return words;
}

export default htmlToTokens;