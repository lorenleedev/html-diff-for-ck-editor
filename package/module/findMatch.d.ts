declare class Match {
    startInBefore: number;
    startInAfter: number;
    length: number;
    endInBefore: number;
    endInAfter: number;
    constructor(startInBefore: number, startInAfter: number, length: number);
}
/**
 * 두 배열(beforeTokens와 afterTokens)에서 최대 길이의 매칭 블록을 찾아내는 기능
 * 결과로 Match 객체를 반환하거나 매칭이 없을 경우 undefined를 반환
 * @param beforeTokens
 * @param afterTokens
 * @param indexOfBeforeLocationsInAfterTokens
 * @param startInBefore
 * @param endInBefore
 * @param startInAfter
 * @param endInAfter
 */
declare function findMatch(beforeTokens: string[], afterTokens: string[], indexOfBeforeLocationsInAfterTokens: Record<string, number[]>, startInBefore: number, endInBefore: number, startInAfter: number, endInAfter: number): Match | undefined;
export { findMatch, Match };
