export type TokenFactory = (val, idx: number) => Token;

export abstract class Token {
  constructor(
    protected val: { prim: string; args: any[]; annots: any[] },
    protected idx: number,
    protected fac: TokenFactory
  ) {}

  get annot() {
    return (Array.isArray(this.val.annots)
      ? this.val.annots[0]
      : String(this.idx)
    ).replace(/(%|\:)(_Liq_entry_)?/, '');
  }

  public createToken = this.fac;

  public abstract ExtractSchema(): any;

  public abstract Execute(val): any;
}
