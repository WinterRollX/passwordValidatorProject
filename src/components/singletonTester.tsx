import * as React from 'react';
import moment from 'moment'
import { Segment, Header, Button } from 'semantic-ui-react';

interface Props {

}

class Singleton {
    /* 
    * keep instance variable private to prevent modification
    */ 
    private static uniqueInstance: Singleton;
    // private constructor prevent using 'new Singleton()' to create another instance
    private constructor() { }
    // instead, using static class method to access the singleton instance
    public static getInstance(): Singleton {
        if (!Singleton.uniqueInstance) {
            Singleton.uniqueInstance = new Singleton();
        }
        return Singleton.uniqueInstance;
    }
    // make some test value here to show that only one instance keep alive
    public getTestValue: Function = ()=>{
        return this.testValue;
    };
    public setTestValue: Function = (newValue:number)=>{
        this.testValue = newValue;
    }
    private testValue: number = 0;
    
}

const SingletonTester: React.FC<Props> =
    () => {
        let myInstanceA = Singleton.getInstance();
        let myInstanceB = Singleton.getInstance();
        const [renderTrigger, setRenderTrigger] = React.useState<number>(0);
        return (<Segment raised className='singleton-tester-top-segment'>
                <Header as='h2'> Singleton Demo </Header>
                <div className='singleton-tester-container'>
                    <Segment className='singleton-tester-instance' color = 'green'>
                        <Header as='h4'>Instance A</Header>
                        <p>Current Test Value: {myInstanceA.getTestValue()}</p>
                        <Button onClick={()=>{
                          myInstanceA.setTestValue(Math.round(Math.random() * 100));  
                          setRenderTrigger(new Date().valueOf());
                        }}>Change Test Value</Button>
                    </Segment>
                    <Segment className='singleton-tester-instance' color = 'violet'>
                        <Header as='h4'>Instance B</Header>
                        <p>Current Test Value: {myInstanceB.getTestValue()}</p>
                        <Button
                            onClick={()=>{
                                myInstanceB.setTestValue(Math.round(Math.random() * 100));  
                                setRenderTrigger(new Date().valueOf());
                              }}
                        >Change Test Value</Button>
                    </Segment>
                </div>
            </Segment>);
    }

export { SingletonTester };