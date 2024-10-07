import createIndex from '../package/module/createIndex';

describe('createIndex 함수 테스트', () => {
  it('기본적인 문자열 배열에서 올바르게 인덱스를 생성해야 합니다.', () => {
    const params = {
      findThese: ['apple', 'banana', 'orange'],
      inThese: ['banana', 'apple', 'orange', 'banana', 'kiwi', 'apple']
    };

    const result = createIndex(params);
    expect(result).toEqual({
      apple: [1, 5],
      banana: [0, 3],
      orange: [2],
    });
  });

  it('findThese 또는 inThese가 비어있을 경우 빈 객체를 반환해야 합니다.', () => {
    const params1 = { findThese: [], inThese: ['apple', 'banana'] };
    const params2 = { findThese: ['apple'], inThese: [] };

    const result1 = createIndex(params1);
    const result2 = createIndex(params2);

    expect(result1).toEqual({});
    expect(result2).toEqual({ apple: [] });
  });

  it('findThese에 없는 문자열은 빈 배열을 반환해야 합니다.', () => {
    const params = {
      findThese: ['grape', 'apple'],
      inThese: ['apple', 'banana', 'kiwi']
    };

    const result = createIndex(params);
    expect(result).toEqual({
      grape: [],
      apple: [0],
    });
  });

  it('중복된 문자열도 올바르게 처리해야 합니다.', () => {
    const params = {
      findThese: ['apple', 'banana'],
      inThese: ['apple', 'apple', 'banana', 'banana']
    };

    const result = createIndex(params);
    expect(result).toEqual({
      apple: [0, 1],
      banana: [2, 3],
    });
  });

  it('findThese 또는 inThese 키가 없으면 에러를 발생시켜야 합니다.', () => {
    expect(() => {
      createIndex({ findThese: ['apple'], inThese: undefined as any });
    }).toThrow('params must have inThese key');

    expect(() => {
      createIndex({ findThese: undefined as any, inThese: ['apple'] });
    }).toThrow('params must have findThese key');
  });
});
