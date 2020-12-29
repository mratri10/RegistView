import React, { Component } from 'react'
import { Container, Content, Button, Icon, Spinner, Card } from 'native-base';
import HeaderArneva from '../Layout/Header';
import FooterArneva from '../Layout/Footer';
import { View, TouchableOpacity, Text, AsyncStorage, Modal, Image } from 'react-native';
import ColorSimpin from '../../theme/ColorSimpin';
import Pinjaman from '../Pinjaman';
import Simpananpage from '../SimpananPage';
import { connect } from 'react-redux';
import {getPinjam, getSimpan} from '../../actions'
import { NavigationEvents } from 'react-navigation';
import { setBaseURL, API_URL2 } from '../../apis';
import HeaderSimpan from '../SimpananPage/headerSimpan';
import HeaderPinjam from '../Pinjaman/headerPinjam';

class TransaksiPage extends Component {
    constructor(props) {
        setBaseURL(API_URL2)
        super(props);
        this.state = {  
            pinjam:props.navigation.getParam('trans', true),
            existPinjam: false,
            loadPinjam: true,
            loadSimpan: true,
            dataPinjam:[],
            dataSimpan:[],
            role: '',
            alerttext:false,
            texterror:'',
            idUser:'',
            idKop:'',
            simpananCode:'total',
            pinjamCode:'7',
            msgSimpan:0,
            msgPinjam:0,
            nodataPinjam:false,
            nodataSimpan:false
        }
        this.initState = this.initState.bind(this)

        AsyncStorage.getItem('idUser', (err, respons) =>{
            this.setState({idUser: respons})
        })

        AsyncStorage.getItem('idKop', (err, respons) =>{
            this.setState({idKop: respons})
        })

        AsyncStorage.getItem('userRole', (err, respons) =>{
            this.setState({role: respons})
        })
    }
    componentDidMount(){
        this.initState()
    }
    componentWillReceiveProps(newProps){
        if(this.props.dataPinjam !== newProps.dataPinjam){
            if(newProps.dataPinjam.pinjam){
                this.setState({
                    dataPinjam : newProps.dataPinjam.pinjam.data,
                    loadPinjam: false
                })
            }
            if(newProps.dataPinjam.message){
                this.setState({
                    msgPinjam: "Anda Belum Melakukan Transaksi Pinjaman",
                    nodataPinjam: true,
                    loadPinjam: false
                })
            }
        }
        if(this.props.dataSimpan !== newProps.dataSimpan){
            if(newProps.dataSimpan.simpan){
                console.log(JSON.stringify(newProps.dataSimpan.simpan))
                this.setState({
                    dataSimpan : newProps.dataSimpan.simpan.data,
                    loadSimpan: false
                })
                if(newProps.dataSimpan.simpan.data.length === 0){
                    this.setState({
                        msgSimpan: "Anda Belum Melakukan Transaksi Simpanan",
                        nodataSimpan: true,
                        loadSimpan: false
                    })
                }
            }
        }
        
    }

    initState(){
        AsyncStorage.getItem('idKop', (err, respons1)=>{
            AsyncStorage.getItem('idUser', (err, respons2)=>{
                this.props.getSimpan({id: respons2+"_"+respons1})
                this.props.getPinjam({id: respons2+"_"+respons1})
            })
        })
    }
    render() { 
        var nav = this.props.navigation
        return (  
            <Container>
                <HeaderArneva title="Transaksi"/>
                <NavigationEvents 
                    onDidFocus={() => this.initState()}/>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => this.pilihTransaksi(true)}
                        style={[{flex:1, backgroundColor:ColorSimpin.primary, padding:15, alignItems:'center'},
                        this.state.pinjam ? {borderBottomWidth:5, borderBottomColor:ColorSimpin.secondary}:{}]}>
                        <Text style={this.state.pinjam ?{color:ColorSimpin.secondary} :{color:'white'}}>Pinjaman</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.pilihTransaksi(false)}
                        style={[{flex:1, backgroundColor:ColorSimpin.primary, padding:15, alignItems:'center'},
                        , !this.state.pinjam ? {borderBottomWidth:5, borderBottomColor:ColorSimpin.secondary}:{}]}>
                        <Text style={!this.state.pinjam ?{color:ColorSimpin.secondary} :{color:'white'}}>Simpanan</Text>
                    </TouchableOpacity>
                </View>
                {this.state.loadSimpan ?null: this.state.pinjam ?null:
                    <HeaderSimpan 
                        data ={this.state.dataSimpan}
                        onCode = {(value) => this.setState({simpananCode: value})}/>}
                {this.state.loadPinjam ?null: this.state.pinjam ?
                    <HeaderPinjam 
                        data ={this.state.dataPinjam}
                        onCode = {(value) => this.setState({pinjamCode: value})}/>:null}
                <Content>
                    {this.state.pinjam ? 
                    this.state.loadPinjam ?  
                    <Spinner color={ColorSimpin.primary}/>:
                    this.state.nodataPinjam ? 
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Image source={require('../../assets/no_data.png')} 
                        style={{resizeMode:'cover', width:200, height:200}}/>
                        <Text>Anda Belum Melakukan Transaksi Pinjaman</Text>
                    </View>:
                        <View> 
                            <Pinjaman 
                                code = {this.state.pinjamCode}
                                navigation = {nav}
                                data = {this.state.dataPinjam}
                                existPinjam = {(exist) => this.setState({existPinjam: exist})}/>
                        </View>:
                    this.state.loadSimpan ? <Spinner color={ColorSimpin.primary}/>:
                        this.state.nodataSimpan ? 
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../../assets/no_data.png')} 
                            style={{resizeMode:'cover', width:200, height:200}}/>
                            <Text>Anda Belum Melakukan Transaksi Simpanan</Text>
                        </View>:
                        <Simpananpage 
                            code = {this.state.simpananCode}
                            data={this.state.dataSimpan}/>}
                </Content>
                <FooterArneva foot="transaksi" navigation = {nav} role={this.state.role}/>

                {this.state.loadPinjam ?null:
                    <Card style={{backgroundColor:ColorSimpin.primary, position:'absolute', justifyContent:'center', width:40, height:40, bottom:70, right:20, borderRadius:20,}}>
                        <TouchableOpacity onPress={() => this.state.pinjam ? this.toPengajuan(): this.toTarikSetor()}>
                            <Icon 
                            name="add-outline" style={{textAlign:'center', fontWeight:'bold', color: ColorSimpin.secondary}}/>
                        </TouchableOpacity>
                    </Card>}

                <Modal visible={this.state.alerttext} transparent={true}>
                    <Container style={{backgroundColor:'rgba(0,0,0,0.2)', justifyContent:'center', alignItems:'center'}}>
                        <Card style={{marginLeft:20, marginRight:20, padding:10, alignItems:'center'}}>
                            <Text style={{textAlign:'center'}}>
                                {this.state.texterror}
                            </Text>
                        </Card>
                        <View style={{justifyContent:'center'}}>
                        <Icon onPress ={() => this.setState({alerttext:false})}
                            style={{textAlign:'center',  backgroundColor:ColorSimpin.crimson, color:'white', borderRadius:15}} name="close"/>
                            
                        </View>
                    </Container>
                </Modal>
            </Container>
        );
    }

    pilihTransaksi(pilih){
        this.setState({
            pinjam: pilih
        })
    }

    toPengajuan(){
        var tgl1 = new Date().getFullYear().toString()+(new Date().getMonth()+1).toString()+new Date().getDate().toString()
        var dataFilter = this.state.dataPinjam.find(item =>item.no_ajuan.toString() === tgl1+this.state.idUser+this.state.idKop)
        if(dataFilter === undefined){
            console.log(JSON.stringify(dataFilter))
            this.props.navigation.navigate('ajuanpinjaman')
        }else{
            this.setState({
                alerttext:true,
                texterror:"Hari ini anda sudah melakukan peminjaman.",
            })
        }
    }
    toTarikSetor(){
        this.props.navigation.navigate('tariksetor')
    }
}
const mapStateToProps = ({ pinjam, simpan }) => {
    const dataPinjam = pinjam
    const dataSimpan = simpan
    return { dataPinjam, dataSimpan }
}
export default connect(
    mapStateToProps, {getPinjam, getSimpan}
)(TransaksiPage);