import { Token, TokenFactory, ComparableToken } from '../token';

export class BytesToken extends Token implements ComparableToken {
  static prim = 'bytes';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public ToBigMapKey(val: string) {
    return {
      key: { bytes: val },
      type: { prim: BytesToken.prim }
    };
  }

  public Execute(val): { [key: string]: any } {
    return val.bytes;
  }

  public ExtractSchema() {
    return BytesToken.prim;
  }

  public ToKey({ bytes, string }) {
    if (string) {
      return string;
    }

    return bytes;
  }
}
