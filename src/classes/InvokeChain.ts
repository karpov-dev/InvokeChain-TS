import {InvokeChainItem} from "./InvokeChainItem";

export class InvokeChain {

  _chain: Array<InvokeChainItem> = [];

  _isNext: boolean = false;

  _isStop: boolean = false;

  constructor(chain: Array<InvokeChainItem> = []) {
    this._chain = chain;
    return this;
  }

  get getChain(): Array<InvokeChainItem> { return this._chain; }

  add(chainItem: InvokeChainItem): InvokeChain {
    this._chain.push(chainItem);
    return this;
  }

  addAll(chainItems: Array<InvokeChainItem>): InvokeChain {
    this._chain.push(...chainItems);
    return this;
  }

  remove(id: string): InvokeChain {
    const itemIndex = this._chain.findIndex((chainItem: InvokeChainItem) => chainItem.getId === id);

    itemIndex !== -1 ? this._chain.splice(itemIndex, 1) : null;

    return this;
  }

  async invoke(): Promise<any> {
    let previousFunctionResult = null;

    for (let chainItem of this.getChain) {
      this._resetNextAndStop();

      try {
        previousFunctionResult = await chainItem.invoke(() => this._next, () => this._stop, previousFunctionResult);
      } catch (e) {
        console.error(e)
      }

      if (this._isNext) continue;
      if (this._isStop) break;
    }

    return previousFunctionResult;
  }

  _next() {
    this._isNext = true;
  }

  _stop() {
    this._isStop = true
  }

  _resetNextAndStop() {
    this._isStop = false;
    this._isNext = false;
  }
}