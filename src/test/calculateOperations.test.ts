import calculateOperations from '../package/module/calculateOperations';
import {DELETE, EQUAL, INSERT, REPLACE} from "../package/const";

describe('calculateOperations', () => {
  test('beforeTokens와 afterTokens가 동일한 경우', () => {
    const beforeTokens = ['Hello', 'World'];
    const afterTokens = ['Hello', 'World'];
    const operations = calculateOperations(beforeTokens, afterTokens);

    expect(operations).toEqual([{
      action: "equal",
      endInAfter: 1,
      endInBefore: 1,
      startInAfter: 0,
      startInBefore: 0
    }]);
  });

  test('afterTokens에 단어가 추가된 경우', () => {
    const beforeTokens = ['Hello', 'World'];
    const afterTokens = ['Hello', 'Beautiful', 'World'];
    const operations = calculateOperations(beforeTokens, afterTokens);

    expect(operations).toEqual([
      {
        action: EQUAL,
        startInBefore: 0,
        endInBefore: 0,
        startInAfter: 0,
        endInAfter: 0,
      },
      {
        action: INSERT,
        startInBefore: 1,
        endInBefore: undefined,
        startInAfter: 1,
        endInAfter: 1,
      },
      {
        action: EQUAL,
        startInBefore: 1,
        endInBefore: 1,
        startInAfter: 2,
        endInAfter: 2,
      },
    ]);
  });

  test('beforeTokens에 단어가 삭제된 경우', () => {
    const beforeTokens = ['Hello', 'World'];
    const afterTokens = ['Hello'];
    const operations = calculateOperations(beforeTokens, afterTokens);

    expect(operations).toEqual([
      {
        action: EQUAL,
        startInBefore: 0,
        endInBefore: 0,
        startInAfter: 0,
        endInAfter: 0,
      },
      {
        action: DELETE,
        startInBefore: 1,
        endInBefore: 1,
        startInAfter: 1,
        endInAfter: undefined,
      },
    ]);
  });

  test('beforeTokens와 afterTokens에 모두 변경이 있는 경우', () => {
    const beforeTokens = ['Hello', 'World'];
    const afterTokens = ['Goodbye', 'World'];
    const operations = calculateOperations(beforeTokens, afterTokens);

    expect(operations).toEqual([
      {
        action: REPLACE,
        startInBefore: 0,
        endInBefore: 0,
        startInAfter: 0,
        endInAfter: 0,
      },
      {
        action: EQUAL,
        startInBefore: 1,
        endInBefore: 1,
        startInAfter: 1,
        endInAfter: 1,
      },
    ]);
  });

  test('빈 배열인 경우', () => {
    const beforeTokens: string[] = [];
    const afterTokens: string[] = [];
    const operations = calculateOperations(beforeTokens, afterTokens);

    expect(operations).toEqual([]); // 빈 배열인 경우 반환값은 빈 배열이어야 함
  });
});
