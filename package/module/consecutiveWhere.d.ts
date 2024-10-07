/**
 * 문자열 배열(content)에서 특정 조건(predicate)을 만족하는 연속적인 요소를 찾아 반환하는 기능
 * @param start 검색을 시작할 인덱스
 * @param content
 * @param predicate
 */
declare function consecutiveWhere(start: number, content: string[], predicate: (token: string) => boolean): string[];
export default consecutiveWhere;
