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
    new InvokeChainItem(({next, stop, params}: {next: Function, stop: Function, params: any}) => {
      //code
      next(); // invoke next. It means that will invoked next function. It not stopped current function
    }),
    
    new InvokeChainItem(({next, stop, params, previousResult}: {next: Function, stop: Function, params: any, previousResult: any}) => {
      //code
      stop(); // stop chain. It means that will invoked next function. It not stopped current function
    }),
    
    //will not invoked because previos function invoked stop() or not invoked next()
    new InvokeChainItem(({next, stop, params}: {next: Function}) => {
      //code
      next(); // invoke next. It means that will invoked next function. It not stopped current function
    }),
]);
```

If you not invoked next() - next function in chain will not invoked!

## License
ISC
**Free Software!**