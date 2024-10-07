import { Match } from './findMatch';
/**
 * 문자열 배열(beforeTokens와 afterTokens) 간의 차이를 계산하여 수정 작업(삽입, 삭제, 교체 등)을 나타내는 Operation 객체의 배열을 생성
 * 재귀적으로 호출되며, 각 호출에서 가장 긴 매칭 블록을 찾고 이를 기반으로 이전 및 이후의 토큰 범위를 분할
 * @param beforeTokens
 * @param afterTokens
 * @param indexOfBeforeLocationsInAfterTokens 수정 전 배열의 각 요소가 수정 후 배열의 어디에 위치하는지를 기록한 객체
 * @param startInBefore
 * @param endInBefore
 * @param startInAfter
 * @param endInAfter
 * @param matchingBlocks
 */
declare function recursivelyFindMatchingBlocks(beforeTokens: string[], afterTokens: string[], indexOfBeforeLocationsInAfterTokens: Record<string, number[]>, startInBefore: number, endInBefore: number, startInAfter: number, endInAfter: number, matchingBlocks: Match[]): Match[];
export default recursivelyFindMatchingBlocks;
