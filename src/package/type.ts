export type Operation = {
  action: string;
  startInBefore: number;
  endInBefore?: number;
  startInAfter: number;
  endInAfter?: number;
};

export type Mode = 'char' | 'tag' | 'whitespace';