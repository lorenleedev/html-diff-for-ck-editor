import {isImgTagOrIsntTag, isntImgTagAndIsTag} from "./htmlTokenValidator";
import {Operation} from "../type";
import consecutiveWhere from "./consecutiveWhere";

function wrap(tag: string, content: string[], type: 'insert' | 'delete'): string {
  let rendering = '';
  let position = 0;
  const length = content.length;

  while (position < length) {
    const nonTags = consecutiveWhere(position, content, isImgTagOrIsntTag);
    position += nonTags.length;
    if (nonTags.length !== 0) {
      if (nonTags.some(item => item.includes('<img'))) {
        rendering += nonTags.join('').replace('<img', `<img style="${type==='insert' ? 'background: rgba(0, 195, 81, 0.25);padding: 10px;' : 'background: rgba(245, 97, 65, 0.25);padding: 10px;'}" `);
      } else {
        rendering += `<${tag} style="background-color: ${type === 'insert' ? 'rgba(0, 195, 81, 0.25)' : 'rgba(245, 97, 65, 0.25)'}; ${type==='delete' ? 'text-decoration: line-through':'font-weight: bold' }">${nonTags.join('')}</${tag}>`;
      }
    }

    if (position >= length) break;

    const tags = consecutiveWhere(position, content, isntImgTagAndIsTag);
    position += tags.length;
    rendering += tags.join('');
  }

  return rendering;
}

const opMap = {
  equal: (op: Operation, beforeTokens: string[], afterTokens: string[]): string => {
    return beforeTokens.slice(op.startInBefore, op.endInBefore! + 1).join('');
  },

  insert: (op: Operation, beforeTokens: string[], afterTokens: string[]): string => {
    const val = afterTokens.slice(op.startInAfter, op.endInAfter! + 1);
    return wrap('span', val, 'insert');
  },

  delete: (op: Operation, beforeTokens: string[], afterTokens: string[]): string => {
    const val = beforeTokens.slice(op.startInBefore, op.endInBefore! + 1);
    return wrap('span', val, 'delete');
  },

  replace(op: Operation, beforeTokens: string[], afterTokens: string[]): string {
    const deleteOp = opMap.delete(op, beforeTokens, afterTokens);
    const insertOp = opMap.insert(op, beforeTokens, afterTokens);
    // for CK-editor 이미지가 연속으로 나오는 경우, figure로 각각 묶어줌
    if (deleteOp.startsWith('<img') && insertOp.startsWith('<img')) {
      return `${deleteOp}</figure><figure class="image">${insertOp}`;
    } else {
      return deleteOp + insertOp;
    }
  },
};

function renderOperations(beforeTokens: string[], afterTokens: string[], operations: Operation[]): string {
  let rendering = '';
  for (const op of operations) {
    rendering += opMap[op.action](op, beforeTokens, afterTokens);
  }

  return rendering;
}

export {wrap, renderOperations};