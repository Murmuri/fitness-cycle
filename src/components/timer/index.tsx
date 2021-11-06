import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default class Timer extends React.Component {

    public timerIsStart:boolean = false;
    public maxTime: number = 5;

    state = {
        timer: this.maxTime,
        loop: 1,
        maxLoop: 4
    }

    startTimer() {
        this.timerIsStart = true;
        this.timer();
    }

    resetTimer() {
        this.timerIsStart = false;
        this.setState({ timer: this.maxTime });
    }

    timer = () => {
        let { timer } = this.state;

        const timerId = setInterval(() => {
            if ( timer > 0 && this.timerIsStart ) {
                timer -= 1;
                this.setState({ timer });
            } else if ( timer <= 0 && this.timerIsStart ) {
                const { 
                    loop,
                    maxLoop
                } = this.state;
                
                if ( loop >= maxLoop ) {
                    this.setState({ loop: maxLoop});
                } else {
                    this.setState({ loop: loop + 1});
                }

                this.resetTimer();
                clearInterval(timerId);
            } else if ( timer <= 0 || !this.timerIsStart ){
                this.resetTimer();
                clearInterval(timerId);
            }

        },1000 * 1);
    }
    
    timerFormatter() {
        const { timer } = this.state;

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

    setMaxTime(operand: number) {
        this.maxTime += operand;

        if ( this.maxTime < 0 ) { 
            this.maxTime = 0;
        }

        this.setState({
            timer: this.maxTime
        });
    }

    setMaxLoop(operand: number) {
        let { maxLoop, loop } = this.state;

        maxLoop += operand;

        if ( maxLoop < 1 ) { 
            maxLoop = 1;
        }

        if ( maxLoop < loop ) {
            maxLoop = loop;
        }

        this.setState({ maxLoop });
    }

    render() {
        const { 
            loop, 
            maxLoop 
        } = this.state;
        
        const {
            minutes,
            seconds
        } = this.timerFormatter();

        return (
            <View style={ styles.container }>
                <View style={ styles.item }>
                    <Button 
                        onPress={() => {
                            this.setMaxTime(-1);
                        }} 
                        title='-' 
                        color='deepskyblue' 
                        accessibilityLabel='-' 
                        disabled={ this.timerIsStart }
                    />
                    <Text 
                        style={ styles.text }
                    >
                        {`00:${minutes}:${seconds}`}
                    </Text>
                    <Button 
                        onPress={() => {
                            this.setMaxTime(1);
                        }} 
                        title='+' 
                        color='mediumseagreen' 
                        accessibilityLabel='+' 
                        disabled={ this.timerIsStart }
                    />
                </View>
                <View style={styles.item}>
                    <Button 
                        onPress={() => {
                            this.setMaxLoop(-1);
                        }}
                        title='-' 
                        color='deepskyblue' 
                        accessibilityLabel='-' 
                        disabled={ this.timerIsStart }
                    />
                    <Text 
                        style={ styles.text }
                    >
                        {`${loop}/${maxLoop}`}
                    </Text>
                    <Button 
                        onPress={() => {
                            this.setMaxLoop(1);
                        }} 
                        title='+' 
                        color='mediumseagreen' 
                        accessibilityLabel='+' 
                        disabled={ this.timerIsStart }
                    />
                </View>
                <View style={ styles.item }>
                    <View style={ styles.button }>
                        <Button 
                            onPress={() => {
                                this.startTimer();
                            }} 
                            title='Start' 
                            color='#841584' 
                            accessibilityLabel='Start timer'
                        />
                    </View>
                    <Button 
                        onPress={() => {
                            this.resetTimer();
                            this.setState({ loop: 1});
                        }} 
                        title='Reset' 
                        color='orangered' 
                        accessibilityLabel='Reset timer'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '10px'
    },
    text: {
        fontSize: 30,
        marginRight: '15px',
        marginLeft: '15px'
    },
    button: {
        marginRight: '15px'
    }
});
