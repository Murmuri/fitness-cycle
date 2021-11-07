import React from 'react';
import { View, TouchableOpacity, Button, TextInput, Text  } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { VscGrabber } from 'react-icons/vsc';


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
        
        return (
            <TouchableOpacity
                style={{
                    height: 75,
                    backgroundColor: isActive ? '#d3c2f8' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: '10px'
                }}
                onLongPress={ drag }
            >
                <VscGrabber 
                    style={{
                        height: '25px' , 
                        width: '25px', 
                        marginRight: '20px'
                    }}/>
                <TextInput
                    style={{
                        width: '50%',
                        fontSize: 20,
                        marginRight: '10px'
                    }}
                    onChangeText={(text) => {
                        this.setData(text, 'name', index as number );
                    }}
                    value={ item.name }
                    placeholder='Exercise name'
                />
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
                <Text
                    style={{
                        fontSize: 20,
                        marginRight: '15px',
                        marginLeft: '15px'
                    }}
                >
                    { item.count }
                </Text>
                <Button 
                    onPress={() => {
                        let count = Number(item.count) + 1;

                        this.setData(String(count), 'count', index as number );
                    }} 
                    title='+' 
                    color='#61d284' 
                    accessibilityLabel='+' 
                />
            </TouchableOpacity>
        );
    } 

    renderDraggableList() {
        const { data } = this.state;
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
