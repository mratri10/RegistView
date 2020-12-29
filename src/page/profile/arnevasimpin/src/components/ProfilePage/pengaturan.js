import { TouchableHighlight, Text, View } from 'react-native';
import React, { Component } from 'react';
import { Content, Header, Icon, Container, Grid, Col, Button } from 'native-base';
import HeaderArneva from '../Layout/Header';
import FooterArneva from '../Layout/Footer';
import { AsyncStorage } from 'react-native';
import Color from '../../theme/ColorSimpin';


class Pengaturan extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <Container>
                <Header style={{justifyContent:'flex-start', alignItems:'center', backgroundColor:Color.primary}}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('profil')} style={{paddingHorizontal:10}}>
                        <Icon name='arrow-back' style={{fontSize:24, color:'white'}}/>
                    </TouchableHighlight>
                    <Text style={{color:'white', fontWeight:'bold'}}>Pengaturan</Text>
                </Header>
                <Content>
                    <Grid style={{margin:10,alignItems:'center'}}>
                        <Text style={{fontWeight:'bold', flex:1}}>Edit Akun</Text>
                        <TouchableHighlight style={{paddingHorizontal:10}} underlayColor='white' onPress={() => this.props.navigation.navigate('editakun')}>
                            <Icon name='ios-arrow-forward' style={{color: "white", backgroundColor:Color.primary}}/>
                        </TouchableHighlight>
                    </Grid>
                    <View style={{height:1, backgroundColor:Color.primary}}/>
                    <Grid style={{margin:10,alignItems:'center'}}>
                        <Text style={{fontWeight:'bold', flex:1}}>Hubungi Kami</Text>
                        <TouchableHighlight style={{paddingHorizontal:10}} underlayColor='white'>
                            <Icon name='ios-arrow-forward' style={{color: "white", backgroundColor:Color.primary}}/>
                        </TouchableHighlight>
                    </Grid>
                    <View style={{height:1, backgroundColor:Color.primary}}/>
                    <Grid style={{margin:10,alignItems:'center'}}>
                        <Text style={{fontWeight:'bold', flex:1}}>Syarat & Ketentuan</Text>
                        <TouchableHighlight style={{paddingHorizontal:10}} underlayColor='white'>
                            <Icon name='ios-arrow-forward' style={{color: "white", backgroundColor:Color.primary}}/>
                        </TouchableHighlight>
                    </Grid>
                    <View style={{height:1, backgroundColor:Color.primary}}/>
                    <Grid style={{margin:10,alignItems:'center'}}>
                        <Text style={{fontWeight:'bold', flex:1}}>Tentang Aplikasi</Text>
                        <Text style={{color:Color.grey3}}>v1.0</Text>
                        <TouchableHighlight style={{paddingHorizontal:10}} underlayColor='white'>
                            <Icon name='ios-arrow-forward' style={{color: "white", backgroundColor:Color.primary}}/>
                        </TouchableHighlight>
                    </Grid>
                    <View style={{height:1, backgroundColor:Color.primary}}/>
                    
                </Content>
                    <Button 
                        onPress={() => this.keluar()}
                        style={{
                            // flex: 1,
                            flexDirection: "row",
                            // marginHorizontal: 20,
                            // justifyContent: "center",
                            alignSelf: "center",
                            // marginStart: 10,
                            borderRadius: 10,
                            backgroundColor: Color.red1,
                            marginTop: 50,
                            marginBottom: 30,
                            padding: 10
                        }}>
                        <Icon name="ios-exit" style={{color:'white'}}/>
                        <Text style={{color:'white'}}>Keluar</Text>
                    </Button>
            </Container>
        );
    }
    
    keluar(){
        this.props.navigation.navigate('login');
        AsyncStorage.clear()
    }
}
 
export default Pengaturan;