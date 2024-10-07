/**
 * 문자열 배열에서 다른 문자열이 나타나는 모든 인덱스를 찾아 기록하는 기능
 * @param params
 * findThese: 찾고자 하는 문자열의 배열
 * inThese: 문자열을 검색할 대상이 되는 문자열 배열
 * 반환 값: 각 문자열이 inThese 배열의 어디에 위치하는지를 인덱스로 기록한 객체를 반환,
 * 이 객체는 문자열을 키로 하고, 해당 문자열이 나타나는 인덱스의 배열을 값으로 가짐
 *
 * example
 * const params = {
 *   findThese: ['apple', 'banana', 'orange'],
 *   inThese: ['banana', 'apple', 'orange', 'banana', 'kiwi', 'apple']
 * };
 * 반환 값: {
 *   apple: [1, 5],
 *   banana: [0, 3],
 *   orange: [2]
 * }
 */
declare function createIndex(params: {
    findThese: string[];
    inThese: string[];
}): Record<string, number[]>;
export default createIndex;
