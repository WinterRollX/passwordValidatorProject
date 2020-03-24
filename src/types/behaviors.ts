export interface FlyBehavior {
    fly: Function;
    tag: string;
    hostAction?: Function;
}

export interface QuackBehavior {
    quack: Function;
    tag: string;
    hostAction?: Function;
}

export interface SwimBehavior {
    swim: Function;
    hostAction?: Function;
}
