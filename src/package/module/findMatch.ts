class Match {
  startInBefore: number; // 수정 전 배열에서 매칭 시작 인덱스
  startInAfter: number;  // 수정 후 배열에서 매칭 시작 인덱스
  length: number;        // 매칭 블록의 길이
  endInBefore: number;   // 수정 전 배열에서 매칭 종료 인덱스
  endInAfter: number;    // 수정 후 배열에서 매칭 종료 인덱스

  constructor(startInBefore: number, startInAfter: number, length: number) {
    this.startInBefore = startInBefore; // 수정 전 배열에서 매칭 시작 인덱스
    this.startInAfter = startInAfter;   // 수정 후 배열에서 매칭 시작 인덱스
    this.length = length;                // 매칭 블록의 길이
    this.endInBefore = startInBefore + length - 1; // 수정 전 배열에서 매칭 종료 인덱스
    this.endInAfter = startInAfter + length - 1;   // 수정 후 배열에서 매칭 종료 인덱스
  }
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
function findMatch(
  beforeTokens: string[],
  afterTokens: string[],
  indexOfBeforeLocationsInAfterTokens: Record<string, number[]>,
  startInBefore: number,
  endInBefore: number,
  startInAfter: number,
  endInAfter: number
): Match | undefined {
  let bestMatchInBefore = startInBefore;
  let bestMatchInAfter = startInAfter;
  let bestMatchLength = 0;

  let matchLengthAt: Record<number, number> = {};

  for (let indexInBefore = startInBefore; indexInBefore < endInBefore; indexInBefore++) {
    const newMatchLengthAt: Record<number, number> = {};
    const lookingFor = beforeTokens[indexInBefore];
    const locationsInAfter = indexOfBeforeLocationsInAfterTokens[lookingFor] || [];

    for (const indexInAfter of locationsInAfter) {
      if (indexInAfter < startInAfter) continue;
      if (indexInAfter >= endInAfter) break;

      if (!matchLengthAt[indexInAfter - 1]) {
        matchLengthAt[indexInAfter - 1] = 0;
      }
      const new_match_length = matchLengthAt[indexInAfter - 1] + 1;
      newMatchLengthAt[indexInAfter] = new_match_length;

      if (new_match_length > bestMatchLength) {
        bestMatchInBefore = indexInBefore - new_match_length + 1;
        bestMatchInAfter = indexInAfter - new_match_length + 1;
        bestMatchLength = new_match_length;
      }
    }
    matchLengthAt = newMatchLengthAt;
  }

  if (bestMatchLength !== 0) {
    return new Match(bestMatchInBefore, bestMatchInAfter, bestMatchLength);
  }

  return undefined;
}

export {
  findMatch,
  Match
} ;