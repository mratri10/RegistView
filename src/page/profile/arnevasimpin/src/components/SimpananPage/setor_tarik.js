import React, { Component } from 'react';
import { Container, Content, Row, Input, Card, Picker, Button, Label, Spinner } from 'native-base';
import HeaderArneva from '../Layout/Header';
import { TouchableOpacity, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import ColorSimpin from '../../theme/ColorSimpin';
import { connect } from 'react-redux';
import {postSimpan} from "../../actions"

class SetorTarik extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            setoran: true,
            check:false,
            jenisTabungan:[
                {name: 'Pilih Jenis Tabungan', id:0},
                {name: 'Wajib', id:1},
                {name: 'Pokok', id:2},
                {name: 'Sukarela', id:3},
            ],
            idUser: '',
            idKop:'',
            nominal:'',
            jenis:'Pilih Jenis Tabungan',
            keterangan:'',
            code:0,
            load: false
        }
        AsyncStorage.getItem('idUser', (err, respons) =>{
            return(
                this.setState({idUser: respons})
            )
        })
        AsyncStorage.getItem('idKop', (err, respons) =>{
            return(
                this.setState({idKop: respons})
            )
        })
    }
    componentWillReceiveProps(newProps){
        if(this.props.dataSimpan !== newProps.dataSimpan){
            console.log(JSON.stringify(newProps.dataSimpan))
            if(newProps.dataSimpan.post){
                this.setState({
                    code: newProps.dataSimpan.post.code,
                    load: false,
                    nominal:'',
                    jenis:'Pilih Jenis Tabungan',
                    keterangan:'',
                })
            }
        }
    }
    render() { 
        return (  
            <Container>
                <HeaderArneva title="Setoran/Tarikan" left={true} navleft={() => this.props.navigation.navigate('transaksi', {trans:false})}/>
                <Content style={{marginHorizontal:20}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => this.setState({setoran:true})}
                            style={[{flex:1, borderRadius:10, alignItems:'center', padding:10, margin:5},
                            this.state.setoran ? {backgroundColor:ColorSimpin.primary}:{backgroundColor:ColorSimpin.grey}]}>
                            <Text style={{color:this.state.setoran ? ColorSimpin.secondary:'white'}}>Setoran</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({setoran:false})}
                            style={[{flex:1, borderRadius:10, alignItems:'center', padding:10, margin:5},
                            !this.state.setoran ? {backgroundColor:ColorSimpin.primary}:{backgroundColor:ColorSimpin.grey}]}>
                            <Text style={{color:!this.state.setoran ? ColorSimpin.secondary:'white'}}>Tarikan</Text></TouchableOpacity>
                    </View>
                    <Card style={{padding:20, alignItems:'center', borderRadius:5}}>
                        <Text>Jumlah {this.state.setoran ? "Setoran":"Tarikan"} (Rp)</Text>
                        <Row>
                            <Input style={{backgroundColor:'#d3d3d3', borderRadius:20, textAlign:'center', marginTop:10}} placeholderTextColor="white" 
                                value={this.state.nominal.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                                onChangeText={(text) => this.setState({nominal: text.replace(/,/g, '')})} placeholder={this.state.setoran ? "Masukan Jumlah Setoran" : "Masukan Jumlah Tarikan"}/> 
                        </Row>
                        <Row style={{marginTop:5}}>
                            <TouchableOpacity style={[style.pilihNominal, {backgroundColor:this.state.nominal === '500000' ?ColorSimpin.primary : 'white',
                                borderColor: this.state.nominal === '500000' ?ColorSimpin.primary : 'grey'
                            }]} onPress={() => this.setState({nominal: '500000'})}>
                                <Text style={{color:this.state.nominal === '500000' ?'white' : 'black'}}>500.000</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={[style.pilihNominal, {backgroundColor:this.state.nominal === '1000000' ?ColorSimpin.primary : 'white',
                                borderColor: this.state.nominal === '1000000' ?ColorSimpin.primary : 'grey'
                            }]} onPress={() => this.setState({nominal: '1000000'})}>
                                <Text style={{color:this.state.nominal === '1000000' ?'white' : 'black'}}>1.000.000</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.pilihNominal, {backgroundColor:this.state.nominal === '3000000' ?ColorSimpin.primary : 'white',
                                borderColor: this.state.nominal === '3000000' ?ColorSimpin.primary : 'grey'
                            }]} onPress={() => this.setState({nominal: '3000000'})}>
                                <Text style={{color:this.state.nominal === '3000000' ?'white' : 'black'}}>3.000.000</Text>
                            </TouchableOpacity>
                        </Row>
                        <Row style={{marginTop:5}}>
                        <TouchableOpacity onPress={() => this.setState({nominal: '5000000'})} style={[style.pilihNominal, {backgroundColor:this.state.nominal === '5000000' ?ColorSimpin.primary : 'white',
                                borderColor: this.state.nominal === '5000000' ?ColorSimpin.primary : 'grey'
                            }]}>
                                <Text style={{color:this.state.nominal === '5000000' ?'white' : 'black'}}>5.000.000</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.pilihNominal, { backgroundColor:this.state.nominal === '10000000' ?ColorSimpin.primary : 'white',
                                borderColor: this.state.nominal === '10000000' ?ColorSimpin.primary : 'grey'
                            }]} onPress={() => this.setState({nominal: '10000000'})}>
                                <Text style={{color:this.state.nominal === '10000000' ?'white' : 'black'}}>10.000.000</Text>
                            </TouchableOpacity>
                        </Row>
                    </Card>
                    {this.state.nominal === ''? this.state.check ?
                        <Text style={{color:ColorSimpin.crimson}}>* Jumlah Pinjaman Belum Diisi</Text>:null:null}
                    
                    <Card>
                        <Picker
                            style={{flex:1}}
                            mode="dropdown"
                            selectedValue={this.state.jenis}
                            onValueChange = {(items) => this.setState({jenis: items})}>
                                {
                                    (this.state.jenisTabungan).map((items) =>{
                                            return(
                                                <Picker.Item label={items.name} value={items.name} key={items.name}/>  
                                            )
                                    })
                                }
                        </Picker>
                    </Card>
                    {this.state.jenis === 'Pilih Jenis Tabungan'? this.state.check ?
                        <Text style={{color:ColorSimpin.crimson}}>* Jenis Tabungan Belum Dipilih</Text>:null:null}
                    
                    
                    <Card style={{padding:10}}>
                        <Label>Keterangan</Label>
                        <Input multiline={true} value={this.state.keterangan} onChangeText={(text) => this.setState({keterangan: text})} placeholder={this.state.setoran ? "Masukan Keterangan Setoran":"Masukan Keterangan Tarikan"} 
                            style={{height:120, backgroundColor:'#d3d3d3', borderRadius:10, textAlignVertical:'top'}}  placeholderTextColor="white"/>
                    </Card>
                    
                </Content>
                <View style={{flexDirection:'row', margin:10}}>
                    <Button disabled={this.state.load} onPress={() => this.setoranTarik()}
                        style={{flex:1, borderRadius:10, marginHorizontal:10, justifyContent:'center', backgroundColor:ColorSimpin.primary}}>
                        {this.state.load ? <Spinner color={ColorSimpin.secondary}/>:
                            <Text style={{color:'white'}}>{this.state.setoran ? "Setoran": "Tarikan"}</Text>}
                    </Button>
                </View>
            </Container>
        );
    }

    setoranTarik(){
        if(this.validate()){
            var tgl = new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString()
            var tgl1 = new Date().getFullYear().toString()+(new Date().getMonth()+1).toString()+new Date().getDate().toString()
            var waktu = new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()
            var data = {
                anggota_id:this.state.idUser+"_"+this.state.idKop,
                code: tgl1+"--"+waktu,
                tgl_transaksi:tgl,
                anggota_id:this.state.idUser+"_"+this.state.idKop,
                jumlah:this.state.nominal,
                transaksi:this.state.setoran ? "setoran":"tarikan",
                jenis:this.state.jenis,
                keterangan:this.state.keterangan
            }
            this.props.postSimpan(data)
            this.setState({load: true})
        }else{
            this.setState({check: true})
        }

        console.log(JSON.stringify(data))
    }

    validate(){
        if(this.state.nominal === ''){
            return false
        }
        if(this.state.jenis === 'Pilih Jenis Tabungan'){
            return false
        }
        return true
    }
}

const style = StyleSheet.create({
    pilihNominal:{
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:5,
        marginHorizontal:3
    }
})
const mapStateToProps = ({ simpan }) => {
    const dataSimpan = simpan
    return { dataSimpan }
}
export default connect(
    mapStateToProps, {postSimpan}
)(SetorTarik);