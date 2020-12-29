import React, { Component } from 'react';
import { Header, Row, Icon } from 'native-base';
import ColorSimpin from '../../theme/ColorSimpin';
import { Text, View } from 'react-native';

class HeaderArneva extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    render() { 
        return (  
            <Header 
                style={{backgroundColor:ColorSimpin.primary, justifyContent:'center', alignItems:'flex-end', paddingBottom:10}}>
                <Row>
                    
                    <View style={{flex:1}}>
                        {this.props.left?
                            <Icon name="arrow-back" style={{color:'white'}} 
                            onPress={() => this.props.navleft()}/>:null}
                    </View>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'white', textAlign:'center', flex:2}}>
                        {this.props.title}
                    </Text>
                    <View style={{flex:1}}>

                    </View>
                </Row>
            </Header>
        );
    }
}
 
export default HeaderArneva;