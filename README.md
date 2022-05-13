# Invoke-Function-Chain TS
## Features

- Invoking functions as chain
- Pass params between invoked functions
- Pass params for each function
- The ability to stop the chain
- Return last function invoke result
- Can invoke async functions

## Installation

Install the dependencies and devDependencies and start use.

```sh
npm i invoke-chain
or
npm i -D invoke-chain
```

## Use

To use you should import module

```ts
import {InvokeChain, InvokeChainItem} from 'invoke-chain';
```

You should create new instance of InvokeChain

```ts
new InvokeChain()
```

Than need add functions in InvokeChainItem wrapper

```ts
const chain = new InvokeChain();

chain.addAll([
    new InvokeChainItem((context: IInvokeChainContext) => {
      //code
      context.next(); // invoke next. It means that will invoked next function. It not stopped current function
    }),
    
    new InvokeChainItem((context: IInvokeChainContext) => {
      //code
      context.stop(); // stop chain. It means that will invoked next function. It not stopped current function
    }),
    
    //will not invoked because previos function invoked stop() or not invoked next()
    new InvokeChainItem((context: IInvokeChainContext) => {
      //code
      context.next(); // invoke next. It means that will invoked next function. It not stopped current function
    }),
]);
```

If you not invoked next() - next function in chain will not invoked!

## Documentation

#### Class InvokeChain

##### Contructor
---
```ts
new InvokeChain(Array<InvokeChainItem> = []) // Constructor with default []
```

##### Getters
--- 
```ts
public InvokeChain.getChain: Array<InvokeChainItem> // Return chain
```

##### Methods
---
```ts
public InvokeChain.add(InvokeChainItem): InvokeChain  // Add elemnt to chain
public InvokeChain.addAll(Array<InvokeChainItem>): InvokeChain // Add array of elements to chain
public InvokeChain.remove(string): InvokeChain // Remove chain item by InvokeChainItem.Id
public async InvokeChain.invoke(): Promise<any> // Invoke chain. Return last function invoke result. Async
```

#### Class InvokeChainItem

##### Contructor
---
```ts
new InvokeChainItem(Function, any = null) // Function - function which will be invoked. any - params for function
```

##### Getters
---
```ts
public InvokeChainItem.getId: string // Return ChainItem Id. Need to remove from ChainItem
public InvokeChainItem.getFunction // Return function which will be invoked
public InvokeChainItem.getParams // Return params for function
```

##### Methods
--- 
```ts
public async InvokeChain.invoke(Function, Function, any): Promise<any> // Invoke chain Item. First Function - next(), second function - stop(), any - previos function invoke result
```

#### Interface IInvokeChainContext
```ts
interface IInvokeChainContext {
  next: Function,                // Next Function
  stop: Function,                // Stop function
  params: any,                   // Params for function
  previousFunctionResult: any    // Previos function result
}
```

## License
ISC
**Free Software!**