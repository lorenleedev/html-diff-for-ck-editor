import { findMatch, Match } from '../package/module/findMatch';

describe('findMatch', () => {
  it('토큰이 매칭될 때 Match 객체를 반환해야 한다', () => {
    const beforeTokens = ['a', 'b', 'c', 'd', 'e'];
    const afterTokens = ['x', 'b', 'c', 'y'];
    const indexOfBeforeLocationsInAfterTokens = {
      'a': [],
      'b': [1],
      'c': [2],
      'd': [],
      'e': []
    };

    const result = findMatch(beforeTokens, afterTokens, indexOfBeforeLocationsInAfterTokens, 0, beforeTokens.length, 0, afterTokens.length);

    expect(result).toEqual(new Match(1, 1, 2)); // 'b'와 'c'가 매칭됨
  });

  it('매칭되지 않는 토큰에 대해 undefined를 반환해야 한다', () => {
    const beforeTokens = ['a', 'b', 'c'];
    const afterTokens = ['x', 'y', 'z'];
    const indexOfBeforeLocationsInAfterTokens = {
      'a': [],
      'b': [],
      'c': []
    };

    const result = findMatch(beforeTokens, afterTokens, indexOfBeforeLocationsInAfterTokens, 0, beforeTokens.length, 0, afterTokens.length);

    expect(result).toBeUndefined(); // 매칭 없음
  });

  it('단일 토큰이 매칭될 때 Match 객체를 반환해야 한다', () => {
    const beforeTokens = ['hello', 'world'];
    const afterTokens = ['hi', 'world', 'everyone'];
    const indexOfBeforeLocationsInAfterTokens = {
      'hello': [],
      'world': [1],
    };

    const result = findMatch(beforeTokens, afterTokens, indexOfBeforeLocationsInAfterTokens, 0, beforeTokens.length, 0, afterTokens.length);

    expect(result).toEqual(new Match(1, 1, 1)); // 'world'가 매칭됨
  });

  it('겹치는 매칭이 있을 때 Match 객체를 반환해야 한다', () => {
    const beforeTokens = ['a', 'b', 'c', 'b', 'd'];
    const afterTokens = ['x', 'b', 'c', 'b', 'y'];
    const indexOfBeforeLocationsInAfterTokens = {
      'a': [],
      'b': [1, 3],
      'c': [2],
      'd': [],
    };

    const result = findMatch(beforeTokens, afterTokens, indexOfBeforeLocationsInAfterTokens, 0, beforeTokens.length, 0, afterTokens.length);

    expect(result).toEqual(new Match(1, 1, 3)); // 'b', 'c', 'b'가 매칭됨
  });

  it('전체 범위가 매칭될 때 Match 객체를 반환해야 한다', () => {
    const beforeTokens = ['1', '2', '3'];
    const afterTokens = ['1', '2', '3'];
    const indexOfBeforeLocationsInAfterTokens = {
      '1': [0],
      '2': [1],
      '3': [2],
    };

    const result = findMatch(beforeTokens, afterTokens, indexOfBeforeLocationsInAfterTokens, 0, beforeTokens.length, 0, afterTokens.length);

    expect(result).toEqual(new Match(0, 0, 3)); // 전체가 매칭됨
  });
});
