import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Timer from './src/components/timer';
import Exercises from './src/components/exercises';

export default class App extends React.Component<any, any> {
    
	state = {
		edit: false,
		data: undefined
	}

	renderButton() {
		const { edit } = this.state;
		let title = 'Edit';
		let color = '#1b434d';
		let onPress = () => {
			this.setState({ edit: !edit });
		}

		if ( edit ) {
			title = 'Save';
			color = '#61d284';
		}

		return (
			<Button 
				onPress={ onPress } 
				title={ title } 
				color={ color }
				accessibilityLabel={ title }
			/>
		);
	}

	setData() {
	}

	render() {
		const { edit, data } = this.state;

		return (
			<View style={styles.container}>
				<StatusBar style='auto' />
				<View style={styles.button}>
					{ this.renderButton() }
				</View>
				<Timer 
					edit={ edit }
					data={ data }
					setData={ this.setData }
				/>
				<Exercises 
					edit={ edit }
					data={ data }
					setData={ this.setData }
				/>
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
	button: {
		marginBottom: '15px',
		marginTop: '15px',
		marginRight: '15px',
		flexDirection: 'row-reverse',
		width: '100%'
	}
});
