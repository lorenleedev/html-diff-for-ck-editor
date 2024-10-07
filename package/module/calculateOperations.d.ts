import { Operation } from '../type';
/**
 * 두 개의 문자열 배열(beforeTokens와 afterTokens) 사이의 차이를 분석하여 수정 작업을 나타내는 Operation 객체의 배열을 생성
 * @param beforeTokens
 * @param afterTokens
 */
declare function calculateOperations(beforeTokens: string[], afterTokens: string[]): Operation[];
export default calculateOperations;
