import { Token, TokenFactory, ComparableToken } from '../token';

export class StringToken extends Token implements ComparableToken {
  static prim = 'string';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public Execute(val): { [key: string]: any } {
    return val.string;
  }

  public ExtractSchema() {
    return StringToken.prim;
  }

  public ToKey({ string }) {
    return string;
  }

  public ToBigMapKey(val: string) {
    return {
      key: { string: val },
      type: { prim: StringToken.prim }
    };
  }
}
