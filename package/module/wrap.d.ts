import { Operation } from '../type';
declare function wrap(tag: string, content: string[], type: 'insert' | 'delete'): string;
declare function renderOperations(beforeTokens: string[], afterTokens: string[], operations: Operation[]): string;
export { wrap, renderOperations };
