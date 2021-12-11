import React, { useState } from 'react';
import { useKeepAwake } from 'expo-keep-awake';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import TrainingEditButton from './src/components/training-edit-button';
import Timer from './src/components/timer';
import Exercises from './src/components/exercises';
//@ts-ignore
import { vh } from 'react-native-expo-viewport-units';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initData = {
	maxTime: 60,
	maxLoop: 4,
	exercises: [
		{
			name: 'Pull ups',
			count: '1'
		},
		{
			name: 'Squats',
			count: '1'
		},
		{
			name: 'Push ups',
			count: '1'
		},
		{
			name: 'Lunges',
			count: '1'
		}
	]
};

export default function App() {
	useKeepAwake();
  
  	const [edit, setEdit] = useState(false);
	const [data, setData] = useState(undefined as any);

	async function saveData() {
		await AsyncStorage.setItem('@data_app', JSON.stringify(data));
	}

	async function getStorageData() {
		let storageData:any = await AsyncStorage.getItem('@data_app');
		
		if ( storageData != null  ) {
			storageData = JSON.parse(storageData);
		} else {
			storageData = initData;
		}
		
		setData(storageData);
	}


	if ( !data ) {
		getStorageData();
	}

	return (
		data
			? (
				<View style={styles.container}>
					<StatusBar style='auto' />
					<View style={styles.button}>
						<TrainingEditButton 
							onPress={() => { 

								if ( edit ) {
									saveData();
								}

								setEdit(!edit); 
							}} 
							edit={edit}
						/>
					</View>
					<View>
						<Timer 
							edit={edit} 
							initData={data}
							onSetData={(item: string, value: any) => { data[item] = value }}
						/>
					</View>
					<ScrollView style={styles.exercises}>
						<Exercises 
							edit={edit} 
							initData={data}
							onSetData={(item: string, value: any) => { data[item] = value }}
						/>
					</ScrollView>
				</View>
			)
			: null
		
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		height: vh(100)
	},
	button: {
		marginTop: 100,
		marginLeft: 30,
		flexDirection: 'row-reverse',
		width: '100%'
	},
	exercises: {
		width: '100%'
	}
});
