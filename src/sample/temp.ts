type Operation = {
  action: string;
  start_in_before: number;
  end_in_before?: number;
  start_in_after: number;
  end_in_after?: number;
};

class Match {
  start_in_before: number;
  start_in_after: number;
  length: number;
  end_in_before: number;
  end_in_after: number;

  constructor(start_in_before: number, start_in_after: number, length: number) {
    this.start_in_before = start_in_before;
    this.start_in_after = start_in_after;
    this.length = length;
    this.end_in_before = start_in_before + length - 1;
    this.end_in_after = start_in_after + length - 1;
  }
}

const is_end_of_tag = (char: string): boolean => char === '>';
const is_start_of_tag = (char: string): boolean => char === '<';
const is_whitespace = (char: string): boolean => /^\s+$/.test(char);
const is_img_tag = (token: string): boolean => /^\s*<img\b/.test(token);
const is_tag = (token: string): boolean => /^\s*<[^>]+>\s*$/.test(token);
const isnt_tag = (token: string): boolean => !is_tag(token);

const is_img_tag_or_isnt_tag = (token: string): boolean => is_img_tag(token)|| isnt_tag(token);
const isnt_img_tag_and_is_tag = (token: string): boolean => !is_img_tag(token) && is_tag(token);

function html_to_tokens(html: string): string[] {
  let mode: 'char' | 'tag' | 'whitespace' = 'char';
  let current_word = '';
  const words: string[] = [];

  for (const char of html) {
    switch (mode) {
      case 'tag':
        if (is_end_of_tag(char)) {
          current_word += '>';
          words.push(current_word);
          current_word = '';
          if (is_whitespace(char)) {
            mode = 'whitespace';
          } else {
            mode = 'char';
          }
        } else {
          current_word += char;
        }
        break;
      case 'char':
        if (is_start_of_tag(char)) {
          if (current_word) words.push(current_word);
          current_word = '<';
          mode = 'tag';
        } else if (/\s/.test(char)) {
          if (current_word) words.push(current_word);
          current_word = char;
          mode = 'whitespace';
        } else if (/[\w\#@]+/i.test(char)) {
          current_word += char;
        } else {
          if (current_word) words.push(current_word);
          current_word = char;
        }
        break;
      case 'whitespace':
        if (is_start_of_tag(char)) {
          if (current_word) words.push(current_word);
          current_word = '<';
          mode = 'tag';
        } else if (is_whitespace(char)) {
          current_word += char;
        } else {
          if (current_word) words.push(current_word);
          current_word = char;
          mode = 'char';
        }
        break;
      default:
        throw new Error(`Unknown mode ${mode}`);
    }
  }

  if (current_word) words.push(current_word);
  return words;
}

function find_match(
  before_tokens: string[],
  after_tokens: string[],
  index_of_before_locations_in_after_tokens: Record<string, number[]>,
  start_in_before: number,
  end_in_before: number,
  start_in_after: number,
  end_in_after: number
): Match | undefined {
  let best_match_in_before = start_in_before;
  let best_match_in_after = start_in_after;
  let best_match_length = 0;

  let match_length_at: Record<number, number> = {};

  for (let index_in_before = start_in_before; index_in_before < end_in_before; index_in_before++) {
    const new_match_length_at: Record<number, number> = {};
    const looking_for = before_tokens[index_in_before];
    const locations_in_after = index_of_before_locations_in_after_tokens[looking_for] || [];

    for (const index_in_after of locations_in_after) {
      if (index_in_after < start_in_after) continue;
      if (index_in_after >= end_in_after) break;

      if (!match_length_at[index_in_after - 1]) {
        match_length_at[index_in_after - 1] = 0;
      }
      const new_match_length = match_length_at[index_in_after - 1] + 1;
      new_match_length_at[index_in_after] = new_match_length;

      if (new_match_length > best_match_length) {
        best_match_in_before = index_in_before - new_match_length + 1;
        best_match_in_after = index_in_after - new_match_length + 1;
        best_match_length = new_match_length;
      }
    }
    match_length_at = new_match_length_at;
  }

  if (best_match_length !== 0) {
    return new Match(best_match_in_before, best_match_in_after, best_match_length);
  }

  return undefined;
}

function recursively_find_matching_blocks(
  before_tokens: string[],
  after_tokens: string[],
  index_of_before_locations_in_after_tokens: Record<string, number[]>,
  start_in_before: number,
  end_in_before: number,
  start_in_after: number,
  end_in_after: number,
  matching_blocks: Match[]
): Match[] {
  const match = find_match(
    before_tokens,
    after_tokens,
    index_of_before_locations_in_after_tokens,
    start_in_before,
    end_in_before,
    start_in_after,
    end_in_after
  );

  if (match) {
    if (start_in_before < match.start_in_before && start_in_after < match.start_in_after) {
      recursively_find_matching_blocks(
        before_tokens,
        after_tokens,
        index_of_before_locations_in_after_tokens,
        start_in_before,
        match.start_in_before,
        start_in_after,
        match.start_in_after,
        matching_blocks
      );
    }

    matching_blocks.push(match);

    if (match.end_in_before <= end_in_before && match.end_in_after <= end_in_after) {
      recursively_find_matching_blocks(
        before_tokens,
        after_tokens,
        index_of_before_locations_in_after_tokens,
        match.end_in_before + 1,
        end_in_before,
        match.end_in_after + 1,
        end_in_after,
        matching_blocks
      );
    }
  }

  return matching_blocks;
}

function create_index(params: { find_these: string[]; in_these: string[] }): Record<string, number[]> {
  if (!params.find_these) throw new Error('params must have find_these key');
  if (!params.in_these) throw new Error('params must have in_these key');

  const index: Record<string, number[]> = {};
  for (const token of params.find_these) {
    index[token] = [];
    let idx = params.in_these.indexOf(token);
    while (idx !== -1) {
      index[token].push(idx);
      idx = params.in_these.indexOf(token, idx + 1);
    }
  }

  return index;
}

function find_matching_blocks(before_tokens: string[], after_tokens: string[]): Match[] {
  const matching_blocks: Match[] = [];
  const index_of_before_locations_in_after_tokens = create_index({
    find_these: before_tokens,
    in_these: after_tokens,
  });

  return recursively_find_matching_blocks(
    before_tokens,
    after_tokens,
    index_of_before_locations_in_after_tokens,
    0,
    before_tokens.length,
    0,
    after_tokens.length,
    matching_blocks
  );
}

function calculate_operations(before_tokens: string[], after_tokens: string[]): Operation[] {
  if (!before_tokens) throw new Error('before_tokens?');
  if (!after_tokens) throw new Error('after_tokens?');

  let position_in_before = 0;
  let position_in_after = 0;
  const operations: Operation[] = [];
  const action_map: Record<string, string> = {
    'false,false': 'replace',
    'true,false': 'insert',
    'false,true': 'delete',
    'true,true': 'none',
  };

  const matches = find_matching_blocks(before_tokens, after_tokens);
  matches.push(new Match(before_tokens.length, after_tokens.length, 0));

  for (const match of matches) {
    const match_starts_at_current_position_in_before = position_in_before === match.start_in_before;
    const match_starts_at_current_position_in_after = position_in_after === match.start_in_after;

    const action_up_to_match_positions = action_map[
      [match_starts_at_current_position_in_before, match_starts_at_current_position_in_after].toString()
      ];

    if (action_up_to_match_positions !== 'none') {
      operations.push({
        action: action_up_to_match_positions,
        start_in_before: position_in_before,
        end_in_before:
          action_up_to_match_positions === 'insert' ? undefined : match.start_in_before - 1,
        start_in_after: position_in_after,
        end_in_after:
          action_up_to_match_positions === 'delete' ? undefined : match.start_in_after - 1,
      });
    }

    if (match.length !== 0) {
      operations.push({
        action: 'equal',
        start_in_before: match.start_in_before,
        end_in_before: match.end_in_before,
        start_in_after: match.start_in_after,
        end_in_after: match.end_in_after,
      });
    }

    position_in_before = match.end_in_before + 1;
    position_in_after = match.end_in_after + 1;
  }

  const post_processed: Operation[] = [];
  let last_op: Operation = { action: 'none', start_in_before: 0, start_in_after: 0 };

  const is_single_whitespace = (op: Operation): boolean => {
    if (op.action !== 'equal') return false;
    if (op.end_in_before! - op.start_in_before !== 0) return false;
    return /^\s$/.test(before_tokens[op.start_in_before]);
  };

  for (const op of operations) {
    if (
      (is_single_whitespace(op) && last_op.action === 'replace') ||
      (op.action === 'replace' && last_op.action === 'replace')
    ) {
      last_op.end_in_before = op.end_in_before;
      last_op.end_in_after = op.end_in_after;
    } else {
      post_processed.push(op);
      last_op = op;
    }
  }

  return post_processed;
}

function consecutive_where(
  start: number,
  content: string[],
  predicate: (token: string) => boolean
): string[] {
  content = content.slice(start);
  let last_matching_index: number | undefined = undefined;

  for (const [index, token] of content.entries()) {
    const answer = predicate(token);
    if (answer) last_matching_index = index;
    if (!answer) break;
  }

  return last_matching_index !== undefined ? content.slice(0, last_matching_index + 1) : [];
}

function wrap(tag: string, content: string[], type: 'insert' | 'delete'): string {
  let rendering = '';
  let position = 0;
  const length = content.length;

  while (position < length) {
    const non_tags = consecutive_where(position, content, is_img_tag_or_isnt_tag);
    position += non_tags.length;
    if (non_tags.length !== 0) {
      if (non_tags.some(item => item.includes('<img'))) {
        rendering += non_tags.join('').replace('<img', `<img class="Diff-Editor-Image-${type==='insert' ? 'Insert' : 'Delete'}" `);
      } else {
        rendering += `<${tag} style="background-color: ${type === 'insert' ? 'rgba(102, 229, 119, .35)' : 'rgba(229, 102, 134,.35)'}; ${type==='delete' ? 'text-decoration: line-through':'font-weight: bold' }">${non_tags.join('')}</${tag}>`;
      }
    }

    if (position >= length) break;

    const tags = consecutive_where(position, content, isnt_img_tag_and_is_tag);
    position += tags.length;
    rendering += tags.join('');
  }

  return rendering;
}

const op_map = {
  equal: (op: Operation, before_tokens: string[], after_tokens: string[]): string => {
    return before_tokens.slice(op.start_in_before, op.end_in_before! + 1).join('');
  },

  insert: (op: Operation, before_tokens: string[], after_tokens: string[]): string => {
    const val = after_tokens.slice(op.start_in_after, op.end_in_after! + 1);
    return wrap('span', val, 'insert');
  },

  delete: (op: Operation, before_tokens: string[], after_tokens: string[]): string => {
    const val = before_tokens.slice(op.start_in_before, op.end_in_before! + 1);
    return wrap('span', val, 'delete');
  },

  replace(op: Operation, before_tokens: string[], after_tokens: string[]): string {
    const delete_op = op_map.delete(op, before_tokens, after_tokens);
    const insert_op = op_map.insert(op, before_tokens, after_tokens);
    // 이미지가 연속으로 나오는 경우, figure로 각각 묶어줌
    if (delete_op.startsWith('<img') && insert_op.startsWith('<img')) {
      return `${delete_op}</figure><figure class="image">${insert_op}`;
    } else {
      return delete_op + insert_op;
    }
  },
};

function render_operations(before_tokens: string[], after_tokens: string[], operations: Operation[]): string {
  let rendering = '';
  for (const op of operations) {
    rendering += op_map[op.action](op, before_tokens, after_tokens);
  }

  return rendering;
}

function diff(before: string, after: string): string {
  if (before === after) return before;

  const before_tokens = html_to_tokens(before);
  const after_tokens = html_to_tokens(after);

  const ops = calculate_operations(before_tokens, after_tokens);

  return render_operations(before_tokens, after_tokens, ops);
}

// diff.html_to_tokens = html_to_tokens;
// diff.find_matching_blocks = find_matching_blocks;
// find_matching_blocks.find_match = find_match;
// find_matching_blocks.create_index = create_index;
// diff.calculate_operations = calculate_operations;
// diff.render_operations = render_operations;

export default diff;