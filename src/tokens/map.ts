import { Token, TokenFactory } from './token';
import { encodePubKey } from '../encoding';

export class MapToken extends Token {
  static prim = 'map';

  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {
    super(val, idx, fac);
  }

  get ValueSchema() {
    return this.createToken(this.val.args![1], 0);
  }

  get KeySchema(): Token & { ToKey: (any) => string } {
    return this.createToken(this.val.args[0], 0) as any;
  }

  public Execute(val: any[]): { [key: string]: any } {
    return val.reduce((prev, current) => {
      return {
        ...prev,
        [this.KeySchema.ToKey(current.args[0])]: this.ValueSchema.Execute(
          current.args[1]
        )
      };
    }, {});
  }

  public ExtractSchema() {
    return {
      [this.KeySchema.ExtractSchema()]: this.ValueSchema.ExtractSchema()
    };
  }
}
