class Car {

    @DeprecatedMethod
    startTheEngine(){
        console.log('Engine started.')
    };
};

function DeprecatedMethod<T, A extends any [], R>(originalMethod: (...args: A) => R , context: ClassMethodDecoratorContext) {

    if (context.kind !== 'method') throw new Error('Method-only decorator');

    function replacementMethod(this: T, ...args: A) {
        console.log(`${String(context.name)} is deprecated`);
        console.log("The name of new method: turnOnEngine")
        return originalMethod.apply(this, args);
    }
    return replacementMethod;
};


class Email {

    email = 'example@gmail.com';

    @MinLength
    @MaxLength
    set setEmail(value: string) {
        this.email = value;
    };
}

function MinLength<T>(originalMethod: (value: string) => void, context: ClassSetterDecoratorContext<T, string>) {

    if (context.kind !== 'setter') throw new Error('Setter-only decorator');

    function replacementMethod(this: T, value: string) {
        if (value.length < 12) {
            throw new Error('Email must contain at least 12 symbols.')
        }
        return originalMethod.apply(this, value);
    }
    return replacementMethod;
}

function MaxLength<T>(originalMethod: (value: string) => void, context: ClassSetterDecoratorContext<T, string>) {

    if (context.kind !== 'setter') throw new Error('Setter-only decorator');

    function replacementMethod(this: T, value: string) {
        if (value.length > 25) {
            throw new Error('Email must contain not more than 25 symbols.')
        }
        return originalMethod.apply(this, value);
    }
    return replacementMethod;
}

// Old version:

// function MinLength<T>(originalMethod: (value: string) => void) {
//     function replacementMethod(this: T, value: string) {
//         if (value.length < 12) {
//             throw new Error('Email must contain at least 12 symbols.')
//         }
//         return originalMethod.apply(this, value);
//     }
//     return replacementMethod;
// }

// function MaxLength<T>(originalMethod: (value: string) => void) {
//     function replacementMethod(this: T, value: string) {
//         if (value.length > 25) {
//             throw new Error('Email must contain not more than 25 symbols.')
//         }
//         return originalMethod.apply(this, value);
//     }
//     return replacementMethod;
// }


