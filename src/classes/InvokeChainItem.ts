import {nanoid} from "nanoid";
import {IInvokeChainContext} from "../types";

export class InvokeChainItem {

  _id: string | null = null;

  _function: Function = new Function();

  _params: any = null;

  constructor(functionToChain: Function, params: any = null) {
    this._id = nanoid();
    this._function = functionToChain;
    this._params = params;
  }

  get getId() { return this._id; }

  get getFunction() { return this._function; }

  get getParams() { return this._params; }

  async invoke(next: Function, stop: Function, previousFunctionResult: any): Promise<any> {
    return await this.getFunction?.({next, stop, params: this.getParams, previousFunctionResult} as IInvokeChainContext);
  }
}