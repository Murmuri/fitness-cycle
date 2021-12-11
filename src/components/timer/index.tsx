import React, { useState } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import ITimer from './interface';
import { Audio } from 'expo-av';

export default function Timer({
    edit,
    initData,
    onSetData
}:ITimer) {
    const initMaxTime = initData &&  initData.maxTime || 60;
    const initMaxLoop = initData && initData.maxLoop || 4;

    const [sound, setSound] = React.useState();

    const [maxTime, setMaxTime] = useState(initMaxTime);
    const [timer, setTimer] = useState(maxTime);
    const [loop, setLoop] = useState(1);
    const [maxLoop, setMaxLoop] = useState(initMaxLoop);
    const [timerID, setTimerID] = useState(null as any);
    let timerCount: number = timer;

    function startTimer() {
        const id = timing();
        setTimerID(id);
    }

    function stopTimer() {
        clearInterval(timerID);
        setTimer(maxTime);
        setTimerID(null);
    }

    function resetTimer() {
        
        clearInterval(timerID);
        setTimer(maxTime);
        setTimerID(null);
    }

    const timing = () => {
        
        return setInterval(() => {
            timerCount -= 1;
            setTimer(timerCount);
        },1000 * 1);
    }

    function setMaxTiming(operand: number): void  {
        
        if ( (maxTime + operand) < 0 ) { 
            setMaxTime(1);
            setTimer(1);
            onSetData('maxTime', 1);
            return;
        }
        
        setMaxTime(maxTime + operand);
        setTimer(maxTime + operand);
        onSetData('maxTime', maxTime + operand);
    }

    function setMaxLooping(operand: number): void {

        if ( (maxLoop + operand) < 1 ) { 
            setMaxLoop(1);
            onSetData('maxLoop', 1);
            return;
        }

        if ( (maxLoop + operand) < loop ) {
            setMaxLoop(loop);
            onSetData('maxLoop', loop);
            return;
        }

        setMaxLoop(maxLoop + operand);
        onSetData('maxLoop', maxLoop + operand);
    }

    function timerFormatter() {
        let minutes: string | number = Math.floor(timer / 60);
        let seconds: string | number = timer % 60;

        if ( minutes > 59 ) {
            minutes = '59';
        }

        if ( minutes < 10 ) {
            minutes = '0' + minutes;
        }

        if ( seconds < 10 ) {
            seconds = '0' + seconds;
        }

        return {
            minutes,
            seconds
        };
    }

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
           require('../../../assets/bell.mp3')
        );
        setSound(sound as any);
    
        console.log('Playing Sound');
        await sound.playAsync(); 
    }

    const {
        minutes,
        seconds
    } = timerFormatter();

    if ( timerCount <= 0 && timerID ) {
        playSound();
        timerCount = maxTime;
        
        if ( loop >= maxLoop ) {
            setLoop(maxLoop);
        } else {
            setLoop(loop + 1);
        }
      
        stopTimer();
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.item }>
                <View style={ edit ? {} : styles.button }>
                    <Button 
                        onPress={() => { setMaxTiming(-1);}} 
                        title='-' 
                        color='#c4f54e' 
                        accessibilityLabel='-' 
                        disabled={ Boolean(timerID) }
                    />
                </View>
                <Text 
                    style={ styles.text }
                >
                    {`00:${minutes}:${seconds}`}
                </Text>
                <View style={ edit ? {} : styles.button }>
                    <Button 
                        onPress={() => { setMaxTiming(1); }} 
                        title='+' 
                        color='#61d284' 
                        accessibilityLabel='+' 
                        disabled={ Boolean(timerID) }
                    />
                </View>
            </View>
            <View style={styles.item}>
                <View style={ edit ? {} : styles.button }>
                    <Button 
                        onPress={() => { setMaxLooping(-1); }}
                        title='-' 
                        color='#c4f54e' 
                        accessibilityLabel='-' 
                        disabled={ Boolean(timerID) }
                    />
                </View>
                <Text 
                    style={ styles.text }
                >
                    {`${loop}/${maxLoop}`}
                </Text>
                <View style={ edit ? {} : styles.button }>
                    <Button 
                        onPress={() => { setMaxLooping(1); }} 
                        title='+' 
                        color='#61d284' 
                        accessibilityLabel='+' 
                        disabled={ Boolean(timerID) }
                    />
                </View>
            </View>
            <View style={ styles.item }>
                <View style={ styles.startButton }>
                    <Button 
                        onPress={() => { startTimer(); }} 
                        title='Start' 
                        color='#61d284' 
                        accessibilityLabel='Start timer'
                        disabled={ edit || Boolean(timerID) }
                    />
                </View>
                <Button 
                    onPress={() => {
                        resetTimer();
                        setLoop(1);
                    }} 
                    title='Reset' 
                    color='#1b434d' 
                    accessibilityLabel='Reset timer'
                    disabled={ edit }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
    button: {
        display: 'none'
    },
    text: {
        fontSize: 30,
        marginRight: 15,
        marginLeft: 15
    },
    startButton: {
        marginRight: 15
    }
});