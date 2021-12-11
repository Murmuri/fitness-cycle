import React, { useState } from 'react';
import { View, Button, TextInput, Text} from 'react-native';
import IExercises from './interface';
import * as _ from 'lodash';

type Item = {
    key: string;
    name: string;
    count: string;
};

export default function Exercises({
    edit,
    initData,
    onSetData
}:IExercises) {
    const [data, setData] = useState(initData && initData.exercises as Item[] || []);
    
    const setRowData = (value: string, column: 'key'|'name'|'count', index: number) => {
        const newData: Item[] = _.cloneDeep(data);
        newData[index][column] = value;
        setData(newData);
        onSetData('exercises', newData);
    }

    const renderItem = (item: Item , index: number ) => {
        const countText = edit
            ? item.count
            : 'count: ' + item.count;

        return (
            <View
                key={ 'exercises-list' + index }
            >
                <View
                    style={{
                        height: 75,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: 10
                    }}
                >
                    <View 
                        style={
                            edit 
                                ? {} 
                                : { display: 'none' }
                        }
                    >
                        <TextInput
                            style={{
                                width: 200,
                                fontSize: 20
                            }}
                            onChangeText={(text) => {
                                setRowData(text, 'name', index as number );
                            }}
                            value={ item.name }
                            placeholder='Exercise name'
                        />
                    </View>
                    <Text
                        style={
                            edit
                                ? { display: 'none' }
                                : { width: 200, fontSize: 20, marginRight: 15 }
                        }
                    >
                        { item.name }
                    </Text>     
                    <View 
                        style={
                            edit 
                                ? { 
                                    marginLeft: 15,
                                    marginRight: 15
                                } 
                                : { display: 'none' }
                        }
                    >
                        <Button 
                            onPress={() => {
                                let count = Number(item.count) - 1;

                                if ( count < 1 ) {
                                    count = 1;
                                }

                                setRowData(String(count), 'count', index as number );
                            }} 
                            title='-' 
                            color='#c4f54e' 
                            accessibilityLabel='-'
                        />  
                    </View>          
                    <Text
                        style={{ fontSize: 20 }}
                    >
                        { countText }
                    </Text>      
                    <View 
                        style={
                            edit 
                                ? { marginLeft: 15 } 
                                : { display: 'none' }
                        }
                    >
                        <Button 
                            onPress={() => {
                                let count = Number(item.count) + 1;
                                setRowData(String(count), 'count', index as number );
                            }} 
                            title='+' 
                            color='#61d284' 
                            accessibilityLabel='+' 
                        />
                    </View>
                    <View 
                        style={
                            edit 
                                ? { marginLeft: 15 } 
                                : { display: 'none' }
                        }
                    >
                        <Button 
                            onPress={() => {
                                const newData: Item[] = _.cloneDeep(data);
                                newData.splice(index as number, 1);
                                setData(newData);
                                onSetData('exercises', newData);
                            }} 
                            title='Del' 
                            color='red' 
                            accessibilityLabel='Delete'
                            disabled={ !edit }
                        />
                    </View>
                </View>
            </View>   
        );
        
    } 

    return (
        <View>
            { 
                data.map((item: Item, index: number) => {
                    return (
                        renderItem(item, index)
                    )
                })
            }
            <View 
                style={{ 
                    marginTop: 15,
                    marginLeft: 30,
                    marginRight: 30 
                }}>
                <Button 
                    onPress={() => {
                        const newData: Item[] = _.cloneDeep(data);
      
                        newData.push({
                            name: 'Some',
                            count: '1'
                        } as Item)

                        setData(newData);
                        onSetData('exercises', newData);
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