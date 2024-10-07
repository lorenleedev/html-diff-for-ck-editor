import htmlToTokens from "./module/htmlToTokens";
import calculateOperations from "./module/calculateOperations";
import {renderOperations} from "./module/wrap";

function diff(before: string, after: string): string {
  if (before === after) return before;

  // HTML을 비교할 수 있도록 작은 단위로 분리
  const beforeTokens = htmlToTokens(before);
  const afterTokens = htmlToTokens(after);

  // 두 개의 토큰 배열을 비교하고, 어떤 차이(추가, 삭제, 수정 등)가 있는지 연산
  const operations = calculateOperations(beforeTokens, afterTokens);

  // 두 HTML 문자열의 차이점을 토대로 실제 변경 사항을 시각적으로 표현 ex) 삭제선, 배경 컬러
  // TODO: 삭제선 여부, 배경 컬러를 옵션으로 보낼 수 있어야함.
  return renderOperations(beforeTokens, afterTokens, operations);
}

export default diff;