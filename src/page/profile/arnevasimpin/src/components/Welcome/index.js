import React, { Component } from 'react';
import { Container, Button } from 'native-base';
import { Text, TouchableOpacity, AsyncStorage } from 'react-native';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {  }

        AsyncStorage.getItem('ingat', (err, respons) =>{
            console.log('respons: '+respons)
            if(respons === 'Y'){
                props.navigation.navigate('home')
            }else{
                props.navigation.navigate('login')
            }
        })
    }
    render() { 
        return (  
            <Container>
                <Text>
                    Hello Arneva  sa
                </Text>
            </Container>
        );
    }
}
 
export default Welcome;