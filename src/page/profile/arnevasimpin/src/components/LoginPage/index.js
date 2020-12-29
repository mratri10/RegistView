import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, CheckBox, AsyncStorage, Modal } from 'react-native';
import ColorSimpin from '../../theme/ColorSimpin';
import { connect } from 'react-redux';
import {postLogin} from '../../actions'
import { Spinner, Row, Icon, Container, Card } from 'native-base';
import { setBaseURL, API_URL } from '../../apis';

class LoginPage extends Component {
    constructor(props) {
      setBaseURL(API_URL)
        super(props);
        this.state = {  
            email:"",
            password:"",
            load:false,
            ingatsaya:false,
            message:"",
            modalMessage: false
        }
    }
    componentWillReceiveProps(newProps){

      if(this.props.dataAuth !== newProps.dataAuth){
        if(newProps.dataAuth.login){ 
          if(newProps.dataAuth.login.code === 200){
            if(this.state.ingatsaya){
              AsyncStorage.setItem('ingat', 'Y')
            }     
            this.props.navigation.navigate('home')
          }
        }
        if(newProps.dataAuth.message){
          if(newProps.dataAuth.message.error.email){
            var message = ""
            for(var i = 0; i < newProps.dataAuth.message.error.email.length; i++){
              message = newProps.dataAuth.message.error.email[i]+ "\n" + message
            }
            this.setState({
              email:"",
              password:"",
              load:false,
              ingatsaya:false,
              message:message,
              modalMessage: true
            })
          }else{
            if(newProps.dataAuth.message.error.password){
              var message = ""
              for(var i = 0; i < newProps.dataAuth.message.error.password.length; i++){
                message = newProps.dataAuth.message.error.password[i]+ "\n" + message
              }
              this.setState({
                email:"",
                password:"",
                load:false,
                ingatsaya:false,
                message: message,
                modalMessage: true
              })
            }else{
              this.setState({
                email:"",
                password:"",
                load:false,
                ingatsaya:false,
                message: newProps.dataAuth.message.error,
                modalMessage: true
              })
            }
          }
        }
      }
    }
    render(){
        return (
          <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/arneva_white_complete2.png')} />
            {/* <Text style={styles.txt}>Login</Text> */}
            {/* <Text style={styles.txtEmail}>Email</Text> */}
            <View style={styles.inputView} >
              <TextInput 
                value={this.state.email} 
                keyboardType="email-address"
                style={styles.inputText}
                placeholder="Email..." 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({email:text})}/>
            </View>
            {/* <Text style={styles.txtPassword}>Kata Sandi</Text> */}
            <View style={styles.inputView} >
              <TextInput  
                value={this.state.password}
                secureTextEntry
                style={styles.inputText}
                placeholder="Password..." 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({password:text})}/>
            </View>
            <View style={{flexDirection:'row', marginHorizontal:50, alignItems:'center'}}>
              <Text style={{color:'white', marginRight:5}}>Ingat Saya</Text>
              <TouchableOpacity onPress={() => this.setState({ingatsaya: !this.state.ingatsaya})} 
                style={
                  {
                    width:24, height:24,
                    borderWidth:1,
                    borderColor:this.state.ingatsaya ? ColorSimpin.secondary:'white' ,
                    backgroundColor:this.state.ingatsaya? ColorSimpin.secondary:ColorSimpin.primary ,
                    borderRadius:12,
                    justifyContent:'center', alignItems:'center'
                  }}>
                <Icon name= {this.state.ingatsaya? "checkmark-outline":"close-outline"} style={{fontSize:16, color:this.state.ingatsaya? ColorSimpin.primary: 'white'}}/>
              </TouchableOpacity>
              <View style={{flex: 1}}/>
              <TouchableOpacity>
                <Text style={[styles.forgot]}>Lupa Kata Sandi?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginBtn} disabled={this.state.load} onPress={() => this.loginApps()}>
              {this.state.load ? <Spinner color={ColorSimpin.primary}/>:
                <Text style={styles.loginText}>Masuk</Text>}
              
            </TouchableOpacity>

            <Modal visible={this.state.modalMessage} transparent={true}>
              <Container style={{backgroundColor: "rgba(0,0,0, 0.5)", alignItems:'center', justifyContent:'center'}}>
                <Card style={{padding:20}}>
                  <Text style={{color: ColorSimpin.crimson}}>error: </Text>
                  <Text>{this.state.message}</Text>
                </Card>
                <TouchableOpacity onPress={() => this.setState({modalMessage: false})}
                  style={{width: 40, height:40, borderRadius:20, justifyContent:'center', alignItems:'center', backgroundColor:ColorSimpin.crimson}}>
                  <Icon name="close" style={{color:'white'}}/>
                </TouchableOpacity>
              </Container>
            </Modal>
          </View>
        );
      }

      loginApps(){
        this.setState({load: true})
        var data ={
          email: this.state.email,
          password: this.state.password
        }
        this.props.postLogin(data)
      }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          // backgroundColor: '#26524a',
          backgroundColor: ColorSimpin.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        txt:{
          fontWeight:"bold",
          fontSize:20,
          color:"black",
          marginTop:40,
          marginBottom:20
        },
        inputView:{
          width:"80%",
          backgroundColor:"#f2f2f2",
          borderRadius:25,
          height:50,
          marginBottom:30,
          justifyContent:"center",
          padding:20
        },
        inputText:{
          height:50,
          color:"black"
        },
        forgot:{
          color:"white",
          fontSize:11,
        },
        loginBtn:{
          width:"80%",
          backgroundColor:ColorSimpin.secondary,
          borderRadius:25,
          height:50,
          alignItems:"center",
          justifyContent:"center",
          marginTop:10,
          // marginBottom:10
        },
        loginText:{
          color:ColorSimpin.primary,
          fontWeight:'bold'
        },
        image:{
          width:150,
          height:150,
          resizeMode:'contain'
        }
      
      }); 
const mapStateToProps = ({auth}) =>{
  const dataAuth = auth
  return {dataAuth}
}
 
export default connect(
  mapStateToProps, {postLogin}
)(LoginPage);