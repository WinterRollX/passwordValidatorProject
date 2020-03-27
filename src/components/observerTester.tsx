import * as React from "react";

interface Props {

}

interface Subject {
    registerObserver: Function;
    removeObserver: Function;
    notifyObserver: Function;
}

interface Observer {
    update: Function;
}

interface WeaterObserverList {
    [propName: string]: WeatherObserver;
}

class WeatherObserver implements Observer{
    id: string;
    update = (newData:any)=>{};
    constructor(id:string) {
        this.id = id;
    };
}

class WeatherSubject implements Subject {
    observerList: WeaterObserverList = {};
    registerObserver = (newObserver: WeatherObserver)=>{
        this.observerList[newObserver.id] = newObserver;
    };
    removeObserver = (observerId:string)=>{
        // find this observer and remove it from list
        delete this.observerList[observerId];
    };
    notifyObserver = (newData: any)=>{
        for(let observerId in this.observerList){
            this.observerList[observerId].update(newData);
        }
    }

}

const ObserverTester: React.FC<Props> = 
(  )=>{
    return (
        <div>
            Observer tester content here
        </div>
    );
}

export { ObserverTester };