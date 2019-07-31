import { Token, TokenFactory, ComparableToken } from '../token';
import { b58decode, encodePubKey } from '../../encoding';

export class AddressToken extends Token implements ComparableToken {
  static prim = 'address';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  public ToBigMapKey(val: string) {
    const decoded = b58decode(val);
    return {
      key: { bytes: decoded },
      type: { prim: 'bytes' }
    };
  }

  public Execute(val): { [key: string]: any } {
    return val.string;
  }

  public ExtractSchema() {
    return AddressToken.prim;
  }

  public ToKey({ bytes, string }) {
    if (string) {
      return string;
    }

    return encodePubKey(bytes);
  }
}
