import { Match } from './findMatch';
/**
 * 두 개의 토큰 배열에서 매칭되는 블록을 찾아 반환
 * @param beforeTokens
 * @param afterTokens
 * 반환값: {
 *   startInBefore: 2, // 수정 전 배열에서 매칭 시작 인덱스
 *   startInAfter: 3, // 수정 후 배열에서 매칭 시작 인덱스
 *   length: 4, // 매칭 블록의 길이
 *   endInBefore: 5,  // (2 + 4 - 1), 수정 전 배열에서 매칭 종료 인덱스
 *   endInAfter: 6    // (3 + 4 - 1), 수정 후 배열에서 매칭 종료 인덱스
 * }
 */
declare function findMatchingBlocks(beforeTokens: string[], afterTokens: string[]): Match[];
export default findMatchingBlocks;