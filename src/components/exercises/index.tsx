import React from 'react';
import { View, TouchableOpacity, Button, TextInput, Text  } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { VscGrabber } from 'react-icons/vsc';
import { SwipeRow } from 'react-native-swipe-list-view'


type Item = {
    key: string;
    name: string;
    count: string;
};

export class Exercises extends React.Component<any, any>{

    state = {
        data: [
            {
                name: '',
                count: '1',
                key: 'item-0'
            }
        ]
    }

    setData(value: string, column: 'key'|'name'|'count', index: number) {
        const { data } = this.state;
        data[index][column] = value;
       
        this.setState({ data });
    }
 
    renderItem = ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
        const { data } = this.state;
        const { edit } = this.props;

        return (
            <SwipeRow rightOpenValue={-100}>
                <View
                    style={{
                        height: 75,
                        backgroundColor: '#d3c2f8',
                        flexDirection: 'row-reverse',
                        padding: '10px',
                        width: '100%'
                    }}
                >
                     <Button 
                        onPress={() => {
                            data.splice(index as number, 1);
                            this.setState({ data });
                        }} 
                        title='Delete' 
                        color='red' 
                        accessibilityLabel='Delete'
                        disabled={ !edit }
                    />
                </View>
                
                <TouchableOpacity
                    style={{
                        height: 75,
                        backgroundColor: isActive ? '#d3c2f8' : 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: '10px',
                        width: '100%'
                    }}
                    onLongPress={ drag }
                >
                    <VscGrabber 
                        style={{
                            height: '25px' , 
                            width: '25px', 
                            marginRight: '20px'
                        }}
                    />
                    <TextInput
                        style={
                            edit 
                                ? {
                                    width: '200px',
                                    fontSize: 20,
                                    marginRight: '10px'
                                }
                                : { display: 'none' }
                        }
                        onChangeText={(text) => {
                            this.setData(text, 'name', index as number );
                        }}
                        value={ item.name }
                        placeholder='Exercise name'
                    />
                    <Text
                        style={
                            edit 
                                ? { display: 'none' }
                                : {
                                    width: '200px',
                                    fontSize: 20,
                                    marginRight: '10px'
                                }
                                
                        }
                    >{ item.name }</Text>
                    <View style={ edit ? {} : { display: "none" } }>
                        <Button 
                            onPress={() => {
                                let count = Number(item.count) - 1;

                                if ( count < 1 ) {
                                    count = 1;
                                }

                                this.setData(String(count), 'count', index as number );
                            }} 
                            title='-' 
                            color='#c4f54e' 
                            accessibilityLabel='-'
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 20,
                            marginRight: '15px',
                            marginLeft: '15px'
                        }}
                    >
                        { item.count }
                    </Text>
                    <View style={ edit ? {} : { display: "none" } }>
                        <Button 
                            onPress={() => {
                                let count = Number(item.count) + 1;

                                this.setData(String(count), 'count', index as number );
                            }} 
                            title='+' 
                            color='#61d284' 
                            accessibilityLabel='+' 
                        />
                    </View>
                </TouchableOpacity>
            </SwipeRow>
        );
    } 

    renderDraggableList() {
        const { data } = this.state;
        const { edit } = this.props;

        return (
            <View style={{  
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
            }}>
                <DraggableFlatList
                    key={ 'draggable-flat-list' + Math.random() }
                    data={ data }
                    renderItem={ this.renderItem }
                    keyExtractor={(item, index) => `draggable-item-${item.key}`}
                    onDragEnd={({ data }) => this.setState({ data })}
                />
                <View style={{ marginTop: '15px' }}>
                    <Button 
                        onPress={() => {
                            data.push({
                                name: '',
                                count: '1',
                                key: 'item-' + data.length
                            })

                            this.setState({ data });
                        }} 
                        title='Add' 
                        color='#1b434d' 
                        accessibilityLabel='Start timer'
                        disabled={ !edit }
                    />
                </View>
            </View>
        );
    }

    render() {
        const { edit } = this.props;

        return (
            <View>
                { this.renderDraggableList() }
            </View>
        );
    }   
   
}


export default Exercises;
