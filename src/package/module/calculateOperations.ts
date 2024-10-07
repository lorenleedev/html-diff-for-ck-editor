import {Operation} from "../type";
import {Match} from "./findMatch";
import {DELETE, EQUAL, INSERT, NONE, REPLACE} from "../const";
import findMatchingBlocks from "./findMatchingBlocks";

/**
 * 두 개의 문자열 배열(beforeTokens와 afterTokens) 사이의 차이를 분석하여 수정 작업을 나타내는 Operation 객체의 배열을 생성
 * @param beforeTokens
 * @param afterTokens
 */
function calculateOperations(beforeTokens: string[], afterTokens: string[]): Operation[] {
  if (!beforeTokens) throw new Error('There is no beforeTokens.');
  if (!afterTokens) throw new Error('There is no afterTokens.');

  let positionInBefore = 0;
  let positionInAfter = 0;
  const operations: Operation[] = []; // 수정 작업을 저장할 배열
  const actionMap: Record<string, string> = { // 현재 위치에서의 수정 작업을 정의하기 위한 매핑입니다. false와 true 값의 조합을 통해 삽입, 삭제, 교체, 동일한 작업을 구분
    'false,false': REPLACE,
    'true,false': INSERT,
    'false,true': DELETE,
    'true,true': NONE,
  };

  const matches = findMatchingBlocks(beforeTokens, afterTokens);
  matches.push(new Match(beforeTokens.length, afterTokens.length, 0));

  for (const match of matches) {
    const matchStartsAtCurrentPositionInBefore = positionInBefore === match.startInBefore;
    const matchStartsAtCurrentPositionInAfter = positionInAfter === match.startInAfter;

    const actionUpToMatchPositions = actionMap[
      [matchStartsAtCurrentPositionInBefore, matchStartsAtCurrentPositionInAfter].toString()
      ];

    if (actionUpToMatchPositions !== NONE) {
      operations.push({
        action: actionUpToMatchPositions,
        startInBefore: positionInBefore,
        endInBefore:
          actionUpToMatchPositions === INSERT ? undefined : match.startInBefore - 1,
        startInAfter: positionInAfter,
        endInAfter:
          actionUpToMatchPositions === DELETE ? undefined : match.startInAfter - 1,
      });
    }

    if (match.length !== 0) {
      operations.push({
        action: EQUAL,
        startInBefore: match.startInBefore,
        endInBefore: match.endInBefore,
        startInAfter: match.startInAfter,
        endInAfter: match.endInAfter,
      });
    }

    positionInBefore = match.endInBefore + 1;
    positionInAfter = match.endInAfter + 1;
  }

  const postProcessed: Operation[] = [];
  let lastOp: Operation = { action: NONE, startInBefore: 0, startInAfter: 0 };

  const isSingleWhitespace = (op: Operation): boolean => {
    if (op.action !== EQUAL) return false;
    if (op.endInBefore! - op.startInBefore !== 0) return false;
    return /^\s$/.test(beforeTokens[op.startInBefore]);
  };

  for (const op of operations) {
    if (
      (isSingleWhitespace(op) && lastOp.action === REPLACE) ||
      (op.action === REPLACE && lastOp.action === REPLACE)
    ) {
      lastOp.endInBefore = op.endInBefore;
      lastOp.endInAfter = op.endInAfter;
    } else {
      postProcessed.push(op);
      lastOp = op;
    }
  }

  return postProcessed;
}

export default calculateOperations;