import * as React from "react";
import { Button } from 'semantic-ui-react';
import { FlyBehavior, QuackBehavior } from '../types/behaviors';

interface DuckProps {
    duckType: string;
}

class FlyAsNormalDuck implements FlyBehavior {
    fly() {
        this.hostAction('Flying as a normal duck!');
    };
    tag: string;
    hostAction: Function = (message: string)=>{
        console.log(message);
    };
    constructor(hostAction?: Function, behaviorTag: string = 'FlyAsNormalDuck'){
        if(hostAction != null){
            this.hostAction = hostAction;
        }
        this.tag = behaviorTag;
    }
}

class FlyNotPossible implements FlyBehavior {
    fly() {
        this.hostAction('Can not fly');
    };
    tag: string;
    hostAction: Function = (message: string)=>{
        console.log(message);
    };
    constructor(hostAction?: Function, behaviorTag: string = 'FlyNotPossible'){
        if(hostAction != null){
            this.hostAction = hostAction;
        }
        this.tag = behaviorTag;
    }
}

class QuackAsNormalDuck implements QuackBehavior {
    quack() {
        this.hostAction('Quack like a normal duck: Ga Ga!');
    }
    tag:string ;
    hostAction: Function = (message: string)=>{
        console.log(message);
    };
    constructor(hostAction?: Function, behaviorTag: string = 'QuackAsNormalDuck'){
        if(hostAction != null){
            this.hostAction = hostAction;
        };
        this.tag = behaviorTag;
        console.log('newed a new quack object instance');
    }
}

const DuckTester: React.FC<DuckProps> =
    ({ duckType }) => {
        let testString: string = 'I am a duck of type: ' + duckType;
        // change the behavior on run time, you can!

        const printToScreen: Function = (message:string)=>{setConsoleMessage(message)};
        
        let myFlyBehavior: FlyBehavior = new FlyAsNormalDuck(printToScreen);
        let noFlyBehavior: FlyBehavior = new FlyNotPossible(printToScreen);
        let myQuackBehavior: QuackBehavior = new QuackAsNormalDuck(printToScreen);
        
        const [currentFlyBehavior, setCurrentFlyBehavior] = React.useState<FlyBehavior>(myFlyBehavior);
        const [currentQuackBehavior, setQuackBehavior] = React.useState<QuackBehavior>(myQuackBehavior);
        const [consoleMessage, setConsoleMessage] = React.useState<string>('');

        // ------------------------- render -----------------------------------
        return (<div className='duck-tester'>
            <div>
                {testString}
            </div>
            <div>
                {`Current fly behavior = ${currentFlyBehavior.tag}`}
            </div>
            <div>
                {`Current quack behavior = ${currentQuackBehavior.tag}`}
            </div>
            <div>
                {`Message: ${consoleMessage}`}
            </div>
            <div className='duck_tester-action-buttons'>
                <Button className='action-button wide-button' onClick={() => {
                    if(currentFlyBehavior.tag === 'FlyNotPossible'){
                        setCurrentFlyBehavior(myFlyBehavior);
                    }else {
                        setCurrentFlyBehavior(noFlyBehavior);
                    }

                }} >Toggle FlyBehavior</Button>
                <Button className='action-button' onClick={() => {
                    currentFlyBehavior.fly();
                }} >Fly!</Button>
                <Button className='action-button' onClick={() => {
                    currentQuackBehavior.quack();
                }}>Quack!</Button>
            </div>
            <div>Other Content of duck tester here</div>
        </div>)
    }

export { DuckTester };