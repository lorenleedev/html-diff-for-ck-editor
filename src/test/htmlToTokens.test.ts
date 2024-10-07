import htmlToTokens from '../package/module/htmlToTokens';
describe('htmlToTokens', () => {
  it('빈 문자열에 대해 빈 배열을 반환해야 합니다.', () => {
    const result = htmlToTokens('');
    expect(result).toEqual([]);
  });

  it('간단한 HTML 태그를 올바르게 토큰화해야 합니다.', () => {
    const result = htmlToTokens('<div></div>');
    expect(result).toEqual(['<div>', '</div>']);
  });

  it('텍스트와 HTML 태그가 혼합된 경우 올바르게 토큰화해야 합니다.', () => {
    const result = htmlToTokens('Hello <b>world</b>');
    expect(result).toEqual(['Hello', ' ', '<b>', 'world', '</b>']);
  });

  it('중첩된 HTML 태그를 올바르게 토큰화해야 합니다.', () => {
    const result = htmlToTokens('<div><span>Text</span></div>');
    expect(result).toEqual(['<div>', '<span>', 'Text', '</span>', '</div>']);
  });

  it('태그 사이의 공백을 올바르게 처리해야 합니다.', () => {
    const result = htmlToTokens('<div>   <span>Text</span> </div>');
    expect(result).toEqual(['<div>', '   ', '<span>', 'Text', '</span>', ' ', '</div>']);
  });

  it('자체 닫힘 태그를 올바르게 토큰화해야 합니다.', () => {
    const result = htmlToTokens('<img src="image.jpg" />');
    expect(result).toEqual(['<img src="image.jpg" />']);
  });

  it('특수 문자를 포함한 텍스트를 올바르게 처리해야 합니다.', () => {
    const result = htmlToTokens('Hello #world@');
    expect(result).toEqual(['Hello', ' ', '#world@']);
  });

  it('여러 개의 공백을 올바르게 처리해야 합니다.', () => {
    const result = htmlToTokens('Hello   world');
    expect(result).toEqual(['Hello', '   ', 'world']);
  });

  it('속성이 있는 HTML 태그를 올바르게 토큰화해야 합니다.', () => {
    const result = htmlToTokens('<a href="https://example.com">Link</a>');
    expect(result).toEqual(['<a href="https://example.com">', 'Link', '</a>']);
  });
});