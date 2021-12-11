import React from 'react';
import { Button } from 'react-native';
import  ITrainingEditButton from './interface';

export default function TrainingEditButton({
    onPress,
    edit
}:ITrainingEditButton) {
    let buttonTitle = 'Edit';
    let buttonColor = '#1b434d';
  
    if ( edit ) {
        buttonTitle = 'Save';
        buttonColor = '#61d284';
    }

    return (
        <Button 
            onPress={ onPress } 
            title={ buttonTitle } 
            color={ buttonColor }
            accessibilityLabel={ buttonTitle }
        />
    );
}