import recursivelyFindMatchingBlocks from '../package/module/recursivelyFindMatchingBlocks';
import { Match } from '../package/module/findMatch';

describe("recursivelyFindMatchingBlocks 함수 테스트", () => {
  it("일치하는 블록이 없는 경우", () => {
    const beforeTokens = ["a", "b", "c"];
    const afterTokens = ["x", "y", "z"];
    const indexOfBeforeLocationsInAfterTokens = {
      "a": [],
      "b": [],
      "c": [],
    };
    const matchingBlocks: Match[] = [];

    const result = recursivelyFindMatchingBlocks(
      beforeTokens,
      afterTokens,
      indexOfBeforeLocationsInAfterTokens,
      0,
      beforeTokens.length,
      0,
      afterTokens.length,
      matchingBlocks
    );

    expect(result).toEqual([]);
  });

  it("일부 일치하는 블록이 있는 경우", () => {
    const beforeTokens = ["a", "b", "c"];
    const afterTokens = ["a", "x", "b", "y", "c"];
    const indexOfBeforeLocationsInAfterTokens = {
      "a": [0],
      "b": [2],
      "c": [4],
    };
    const matchingBlocks: Match[] = [];

    const result = recursivelyFindMatchingBlocks(
      beforeTokens,
      afterTokens,
      indexOfBeforeLocationsInAfterTokens,
      0,
      beforeTokens.length,
      0,
      afterTokens.length,
      matchingBlocks
    );

    expect(result).toEqual([
      new Match(0, 0, 1), // "a"
      new Match(1, 2, 1), // "b"
      new Match(2, 4, 1), // "c"
    ]);
  });

  it("전체 일치하는 경우", () => {
    const beforeTokens = ["a", "b", "c"];
    const afterTokens = ["a", "b", "c"];
    const indexOfBeforeLocationsInAfterTokens = {
      "a": [0],
      "b": [1],
      "c": [2],
    };
    const matchingBlocks: Match[] = [];

    const result = recursivelyFindMatchingBlocks(
      beforeTokens,
      afterTokens,
      indexOfBeforeLocationsInAfterTokens,
      0,
      beforeTokens.length,
      0,
      afterTokens.length,
      matchingBlocks
    );

    expect(result).toEqual([
      new Match(0, 0, 3), // "a", "b", "c"
    ]);
  });
});