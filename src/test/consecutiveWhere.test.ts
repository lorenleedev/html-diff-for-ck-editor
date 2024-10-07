import consecutiveWhere from "../package/module/consecutiveWhere";

describe('consecutiveWhere 함수 테스트', () => {
  const sampleContent = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];

  test('시작 인덱스에서 조건을 만족하는 연속 요소 찾기', () => {
    const result = consecutiveWhere(0, sampleContent, (token) => token.length > 4);
    expect(result).toEqual(["apple", "banana", "cherry"]);
  });

  test('조건을 만족하지 않는 경우', () => {
    const result = consecutiveWhere(3, sampleContent, (token) => token.length > 4);
    expect(result).toEqual([]);
  });

  test('조건을 모두 만족하지 않는 경우', () => {
    const result = consecutiveWhere(3, sampleContent, (token) => token.length > 15);
    expect(result).toEqual([]); // "date"부터 조건을 만족하는 요소 없음
  });

  test('인덱스가 범위를 초과한 경우', () => {
    const result = consecutiveWhere(7, sampleContent, (token) => token.length > 0);
    expect(result).toEqual([]); // 범위를 초과하므로 빈 배열
  });

  test('빈 배열을 전달한 경우', () => {
    const result = consecutiveWhere(0, [], (token) => token.length > 0);
    expect(result).toEqual([]); // 빈 배열이므로 결과도 빈 배열
  });
});
