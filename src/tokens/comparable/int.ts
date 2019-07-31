import { Token, TokenFactory, ComparableToken } from '../token';

export class IntToken extends Token implements ComparableToken {
  static prim = 'int';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public Execute(val): { [key: string]: any } {
    return val.int;
  }

  public ExtractSchema() {
    return IntToken.prim;
  }

  public ToBigMapKey(val: string) {
    return {
      key: { int: val },
      type: { prim: IntToken.prim }
    };
  }
}
