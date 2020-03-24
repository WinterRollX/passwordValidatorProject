import React,{ useRef, useEffect, useState } from "react";
import { Icon, Input } from 'semantic-ui-react';

interface Props {
    title: string;
}

const PasswordInput: React.FC<Props> =
    ( { title } ) => {
    let testString: string = title + '';
    let myInputRef: any = useRef(null);
    let exampleArray: number[] = [111,222,333,221];
    const printExperiment = (target: number[])=>{
        let index: number = 0;
        for(let item of target){
            console.log(`item ${index++} is ${item.toString()}`);
        }
    }
    
    useEffect(() => {
        if(myInputRef.current != null){
            console.log(myInputRef.current.inputRef.current);
            // experimental for manipulate value through ref
            //myInputRef.current.inputRef.current.value = 'aaa'
        }
        printExperiment(exampleArray);
        
    }, [exampleArray]);

    

    return (<div>
        <div>
            <Input ref={myInputRef} id='password_input' type='password' onChange={(event)=>{
                console.log(event.target.value);
            }}/>
        </div>
        <div>
            {testString}
        </div>
        <div className='validat-item valid'>
            <span><Icon name='checkmark' fitted/>{'Use Between 8 and 20 characters'}</span>
        </div>
        <div className='validat-item not-valid'>
        <Icon name='times' fitted color='red'/>{'Include at least one letter'}
        </div>
        <div className='validat-item  valid'>
            {'Does not contain blank space characters or the following special characters: < > " \\ . ,'}
        </div>
        <div className='validat-item  valid'>
            {'Password match'}
        </div>
        </div>)
    }

export { PasswordInput };