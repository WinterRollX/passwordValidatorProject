import * as React from "react";
import { Subject, Observer } from '../types/observerPatternTypes';
import { Button, Segment, Header, List } from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';

interface Props {

}

interface WeatherObserverProps {
    register: Function;
    unRegister: Function;
}

// subtypes definition

interface WeatherObserverList {
    [propName: string]: WeatherObserver;
}

interface WeatherData {
    temperature: number | null;
    humidity: number | null;
    pressure: number | null;
}

// implements observer pattern interface
interface IWeatherObserverState {
    isSubscribed: boolean;
    weatherData: WeatherData;
    lastUpdatedTime: Date;
}

class WeatherObserver extends React.Component<WeatherObserverProps, {}> implements Observer {
    // default implementation of observer implementation
    id: string;
    type: string = 'Default type';
    state: IWeatherObserverState;
    // extended class can append function for update function
    onWeatherUpdate: Function = (newData: WeatherData) => {

    };
    update = (newData: WeatherData) => {
        this.setState((prevState: IWeatherObserverState)=>{
            let result = _.cloneDeep(prevState);
            result.weatherData = _.cloneDeep(newData);
            result.lastUpdatedTime = new Date();
            return result;
        },()=>{
            this.onWeatherUpdate(newData,this.state);
        });
    };
    register (newObserver: WeatherObserver){
        if(this.state.isSubscribed){
            this.setState({
                isSubscribed: false,
            },()=>{
                this.props.unRegister(newObserver);
            });
        }else {
            this.setState({
                isSubscribed: true,
            },()=>{
                this.props.register(newObserver);
            });
        }
    }
    constructor(props: WeatherObserverProps, id: string) {
        super(props);
        this.id = id;
        this.state = {
            isSubscribed: false,
            weatherData: {
                temperature: null,
                humidity: null,
                pressure: null,
            },
            lastUpdatedTime: new Date(),
        };
        this.render = () => {
            return (<Segment color='olive'>
                <Header as='h4'>Weather Displayer</Header>
        <div><Button onClick = {()=>{ this.register(this); }}>{this.state.isSubscribed ? 'UnSubscribe' : 'Subscribe'}</Button></div>
                <List style={{ textAlign: 'left' }}>
                    <List.Item>
                        <List.Icon name='favorite' />
                        <List.Content>{`Type = ${this.type}`}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='thermometer half' />
                        <List.Content>{`Tempure ${this.state.weatherData.temperature}`}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='rain' />
                        <List.Content>{`Humidity = ${this.state.weatherData.humidity}`}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='tachometer alternate' />
                        <List.Content>{`Pressure = ${this.state.weatherData.pressure}`}</List.Content>
                    </List.Item>
                </List>
            </Segment>);
        }
    };
}

class WeatherSubject implements Subject {
    observerList: WeatherObserverList = {};
    registerObserver = (newObserver: WeatherObserver) => {
        this.observerList[newObserver.id] = newObserver;
        console.log(`${newObserver.id} registered`);
    };
    removeObserver = (observerId: string) => {
        // find this observer and remove it from list
        delete this.observerList[observerId];
        console.log(`${observerId} unregistered`);
    };
    notifyObserver = (newData: any) => {
        for (let observerId in this.observerList) {
            this.observerList[observerId].update(newData);
        }
    }

}



class WeatherDisplayerTypeA extends WeatherObserver {
    type: string = 'Type A';
    id = 'weather displayer No. 1';
    componentDidMount = () => {
        console.log('type A mounted');
    }
    // using default render
}

interface IWeatherDisplayerTypeBState extends IWeatherObserverState {
    updateCount: number;
}

class WeatherDisplayerTypeB extends WeatherObserver {
    type: string = 'Type B';
    id = 'weather displayer No. 2';
    state: IWeatherDisplayerTypeBState = {
        isSubscribed: false,
        weatherData: {
            temperature: null,
            humidity: null,
            pressure: null,
        },
        lastUpdatedTime: new Date(),
        updateCount: 0,
    };
    componentDidMount = () => {
        console.log('type B mounted');
    }
    onWeatherUpdate = (newData: WeatherData) => {
        this.setState((prevState: IWeatherDisplayerTypeBState) => {
            return {
                ...prevState,
                updateCount: prevState.updateCount + 1,
            };
        });
    }
    // overwrite render
    render = () => {
        return (<Segment color='teal'>
            <Header as='h4'>Weather Update Counter</Header>
            <div><Button onClick={() => { this.register(this); }}>{this.state.isSubscribed ? 'UnSubscribe' : 'Subscribe'}</Button></div>
            <p>
                {`Weather data been updated for ${this.state.updateCount}`}
            </p>
            <p>
                {`Last updated at ${moment(this.state.lastUpdatedTime).format('MMMM Do YYYY, h:mm:ss a') }`}
            </p>
        </Segment>);
    }
}

interface IWeatherDisplayerTypeCState extends IWeatherObserverState {
    futureWeather: string;
}

class WeatherDisplayerTypeC extends WeatherObserver {
    type: string = 'Type C';
    id = 'weather displayer No. 3';
    componentDidMount = () => {
        console.log('type C mounted');
    }
    state: IWeatherDisplayerTypeCState = {
        isSubscribed: false,
        weatherData: {
            temperature: null,
            humidity: null,
            pressure: null,
        },
        lastUpdatedTime: new Date(),
        futureWeather: 'No data at the moment',
    };
    getFutureWather(newData: WeatherData) {
        let result: string = 'Weather looks good!';
        if (newData.temperature != null && newData.temperature >= 70) {
            result = 'It will be a bit hot!';
        }
        if (newData.temperature != null && newData.temperature <= 40) {
            result = 'It will be a bit cold!';
        }
        if (newData.temperature != null && newData.temperature > 40 && newData.temperature < 70) {
            result = 'It will be Nice!';
        }
        return result;
    }
    onWeatherUpdate = (newData: WeatherData) => {
        this.setState((prevState: IWeatherDisplayerTypeCState) => {
            return {
                ...prevState,
                futureWeather: this.getFutureWather(newData),
            };
        });
    }
    
    render = () => {
        return (
            <Segment color='violet'>
                <Header as='h4'>Weather Situation</Header>
                <div><Button onClick={() => { this.register(this); }}>{this.state.isSubscribed ? 'UnSubscribe' : 'Subscribe'}</Button></div>
                <p>
                    {`Future Weather Will be: ${this.state.futureWeather}`}
                </p>
            </Segment>
        );
    }
}

// react components

const ObserverTester: React.FC<Props> =
    () => {

        const [myWeatherSubject, setMyWeatherSubject] = React.useState<WeatherSubject>(new WeatherSubject());
        const [updateTrigger, setUpdateTrigger] = React.useState<number>(0);
        function register(newObserver: WeatherObserver) {
            myWeatherSubject.registerObserver(newObserver);
            setUpdateTrigger(updateTrigger + 1);
        }
        function unRegister(observer: WeatherObserver) {
            myWeatherSubject.removeObserver(observer.id);
            setUpdateTrigger(updateTrigger + 1);
        }

        return (
            <div className='observer-tester-container'>
                <div className='observer-tester-subject-container'>
                    <Segment raised style={{ minWidth: '500px', minHeight: '150px' }}>
                        <Header as='h3'>Weather Subject Registered List</Header>
                        <List>
                            {
                                Object.keys(myWeatherSubject.observerList).length > 0 &&
                                (
                                    Object.keys(myWeatherSubject.observerList).map((key, index) => {
                                        return (
                                            <List.Item key={index}>
                                                <List.Icon name='certificate' />
                                                <List.Content >{myWeatherSubject.observerList[key].id}</List.Content>
                                            </List.Item>
                                        )
                                    })
                                )
                            }
                            {
                                Object.keys(myWeatherSubject.observerList).length === 0 &&
                                <List.Item key={2}>No Weather Observer registered</List.Item>
                            }
                        </List>
                    </Segment>
                </div>
                <div className='observer-tester-observers-container'>
                    <WeatherDisplayerTypeA register={(newObserver: WeatherObserver) => { register(newObserver) }} 
                        unRegister={(newObserver: WeatherObserver) => { unRegister(newObserver) }}
                    />
                    <WeatherDisplayerTypeB register={(newObserver: WeatherObserver) => { register(newObserver) }} 
                        unRegister={(newObserver: WeatherObserver) => { unRegister(newObserver) }}
                    />
                    <WeatherDisplayerTypeC register={(newObserver: WeatherObserver) => { register(newObserver) }} 
                        unRegister={(newObserver: WeatherObserver) => { unRegister(newObserver) }}
                    />
                </div>
                <div className='observer-tester-actions-container'><Button onClick={() => {
                    let newWeatherData: WeatherData = {
                        temperature: Math.floor(Math.random() * 100),
                        pressure: Math.floor(Math.random() * 100),
                        humidity: Math.floor(Math.random() * 100),
                    };
                    myWeatherSubject.notifyObserver(newWeatherData);
                    setUpdateTrigger(updateTrigger + 1);
                }}>Update Weather Data</Button></div>
            </div>
        );
    }
export { ObserverTester };