export const isEndOfTag = (char: string): boolean => char === '>';
export const isStartOfTag = (char: string): boolean => char === '<';
export const isWhitespace = (char: string): boolean => /^\s+$/.test(char);
export const isImgTag = (token: string): boolean => /^\s*<img\b/.test(token);
export const isTag = (token: string): boolean => /^\s*<[^>]+>\s*$/.test(token);
export const isntTag = (token: string): boolean => !isTag(token);

export const isImgTagOrIsntTag = (token: string): boolean => isImgTag(token)|| isntTag(token);
export const isntImgTagAndIsTag = (token: string): boolean => !isImgTag(token) && isntTag(token);