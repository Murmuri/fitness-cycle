import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Button, TextInput, Text  } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { VscGrabber } from 'react-icons/vsc';

const exampleData: Item[] = [...Array(4)].map((d, index) => {
    return {
        key: `item-${index}`,
        label: String(index)
    };
});

type Item = {
    key: string;
    label: string;
};

function Exercises({style}: any) {
    const [data, setData] = useState(exampleData);

    const renderItem = useCallback(
        ({ item, index, drag, isActive }: RenderItemParams<Item>) => {
            return (
                <TouchableOpacity
                    style={{
                        height: 75,
                        backgroundColor: isActive ? 'blue' : 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: '10px'
                    }}
                    onLongPress={drag}
                >
                    <VscGrabber style={{height: '30px' , width: '30px', marginRight: '20px'}}/>
                    <TextInput
                        style={{
                            width: '50%',
                            fontSize: 32,
                            marginRight: '10px'
                        }}
                        onChangeText={() => {}}
                        value={undefined}
                        placeholder='Exercise name'
                    />
                    <Button 
                        onPress={() => {}} 
                        title='-' 
                        color='deepskyblue' 
                        accessibilityLabel='-'
                    />
                    <Text
                        style={{
                            fontSize: 30,
                            marginRight: '15px',
                            marginLeft: '15px'
                        }}
                    >
                        {item.label}
                    </Text>
                    <Button 
                        onPress={() => {}} 
                        title='+' 
                        color='mediumseagreen' 
                        accessibilityLabel='+' 
                    />
                    <View
                        style={{
                            marginLeft: '15px'
                        }}
                    >
                        <Button 
                            onPress={() => {}} 
                            title='Del' 
                            color='red' 
                            accessibilityLabel='del' 
                        />
                    </View>
                </TouchableOpacity>
            );
        },
        []  
    );

    return (
        <View style={{  
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }}>
            <DraggableFlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `draggable-item-${item.key}`}
                onDragEnd={({ data }) => setData(data)}
            />
            <Button 
                onPress={() => {}} 
                title='Add' 
                color='green' 
                accessibilityLabel='Start timer'
            />
        </View>
    );
}


export default Exercises;
