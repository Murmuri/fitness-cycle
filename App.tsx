import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Timer from './src/components/timer';
import Exercises from './src/components/exercises';

export default class App extends React.Component {
  
	render() {
		return (
			<View style={styles.container}>
				<StatusBar style='auto' />
				<Button 
					onPress={() => {}} 
					title='Edit' 
					color='yellow' 
					accessibilityLabel='Edit'
				/>
				<Timer />
				<Exercises />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	flexDirection: "column"
  },
});
