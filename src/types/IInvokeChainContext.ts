export interface IInvokeChainContext {
  next: Function,
  stop: Function,
  params: any,
  previousFunctionResult: any
}