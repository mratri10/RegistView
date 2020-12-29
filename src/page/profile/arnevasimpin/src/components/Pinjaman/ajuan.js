import React, { Component } from 'react';
import { Container, Header, Icon, Content, Card, Input, Row, Picker, Label, Button, Col, DatePicker } from 'native-base';
import { TouchableOpacity, Text, View, StyleSheet, AsyncStorage, ToastAndroid } from 'react-native';
import ColorSimpin from '../../theme/ColorSimpin';
import {postPinjam} from '../../actions'
import { connect } from 'react-redux';
import { setBaseURL, API_URL2 } from '../../apis';

class AjuanPinjaman extends Component {
    constructor(props) {
        setBaseURL(API_URL2)
        super(props);
        this.state = {  
            nominal:'',
            jenisPinjam:[
                {name: 'Pilih Jenis Pinjaman', id:0},
                {name: 'Konsumtif', id:1},
                {name: 'Produktif', id:2},
                {name: 'Darurat', id:3},
            ],
            lamaAngsuran:[
                {name: 'Pilih Lama Angsuran', value:0},
                {name: '3 Bulan', value:3},
                {name: '6 Bulan', value:6},
                {name: '12 Bulan', value:12},
                {name: '24 Bulan', value:24},
            ],
            pinjam_name:'Pilih Jenis Pinjaman',
            lama_value: 0,
            keterangan: '',
            idUser:0,
            idKop:0,
            check: false
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
        if(this.props.dataPinjam !== newProps.dataPinjam){
            if(newProps.dataPinjam.post_pinjam){
                ToastAndroid.show(newProps.dataPinjam.post_pinjam.message, 3000)
                this.setState({
                    lama_value: 0,
                    keterangan: '',
                    nominal:'',
                    pinjam_name:'Pilih Jenis Pinjaman'
                })
            }
        }
    }
    render() { 
        return (  
            <Container>
                <Header style={{justifyContent:'flex-start', alignItems:'center', backgroundColor:ColorSimpin.primary}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('transaksi')}>
                        <Icon name="arrow-back-circle-outline" style={{color:'white', padding:5}}/>
                    </TouchableOpacity>
                    <Text style={{color:'white'}}>Pengajuan Pinjaman</Text>
                </Header>

                <Content>
                    <View style={{margin:20}}>
                    <Card style={{padding:20, alignItems:'center', borderRadius:5}}>
                        <Text>Jumlah Pinjaman (Rp)</Text>
                        <Row>
                            <Input style={[{backgroundColor:'#d3d3d3', borderRadius:20, textAlign:'center', marginTop:10},
                                this.state.lbh10jt ? {borderWidth: 1, borderColor:'red'}: {}]} placeholderTextColor="white" 
                                value={this.state.nominal.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                                onChangeText={(text) => this.pinjamanNominal(text)} placeholder="Masukan Jumlah Pinjaman"/> 
                        </Row>
                        <Row style={{marginTop:5}}>
                            <TouchableOpacity style={[style.pilihNominal, {backgroundColor:this.state.nominal === '500000' ?ColorSimpin.primary : 'white',
                                borderColor: this.state.nominal === '500000' ?ColorSimpin.primary : 'grey'
                            }]} onPress={() => this.setState({nominal: '500000'})}>
                                <Text style={{color:this.state.nominal === '500000' ?'white' : 'black'}}>Rp 500.000,-</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={[style.pilihNominal, {backgroundColor:this.state.nominal === '1000000' ?ColorSimpin.primary : 'white',
                                borderColor: this.state.nominal === '1000000' ?ColorSimpin.primary : 'grey'
                            }]} onPress={() => this.setState({nominal: '1000000'})}>
                                <Text style={{color:this.state.nominal === '1000000' ?'white' : 'black'}}>Rp 1.000.000,-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.pilihNominal, {backgroundColor:this.state.nominal === '3000000' ?ColorSimpin.primary : 'white',
                                borderColor: this.state.nominal === '3000000' ?ColorSimpin.primary : 'grey'
                            }]} onPress={() => this.setState({nominal: '3000000'})}>
                                <Text style={{color:this.state.nominal === '3000000' ?'white' : 'black'}}>Rp 3.000.000,-</Text>
                            </TouchableOpacity>
                        </Row>
                        <Row style={{marginTop:5}}>
                        <TouchableOpacity onPress={() => this.setState({nominal: '5000000'})} style={[style.pilihNominal, {backgroundColor:this.state.nominal === '5000000' ?ColorSimpin.primary : 'white',
                                borderColor: this.state.nominal === '5000000' ?ColorSimpin.primary : 'grey'
                            }]}>
                                <Text style={{color:this.state.nominal === '5000000' ?'white' : 'black'}}>Rp 5.000.000,-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.pilihNominal, { backgroundColor:this.state.nominal === '10000000' ?ColorSimpin.primary : 'white',
                                borderColor: this.state.nominal === '10000000' ?ColorSimpin.primary : 'grey'
                            }]} onPress={() => this.setState({nominal: '10000000'})}>
                                <Text style={{color:this.state.nominal === '10000000' ?'white' : 'black'}}>Rp 10.000.000,-</Text>
                            </TouchableOpacity>
                        </Row>
                    </Card>
                    {this.state.nominal === ''? this.state.check ?
                        <Text style={{color:ColorSimpin.crimson}}>* Jumlah Pinjaman Belum Diisi</Text>:null:null}
                    <Card>
                        <Picker
                            style={{flex:1}}
                            mode="dropdown"
                            selectedValue={this.state.pinjam_name}
                            onValueChange = {(items) => this.setState({pinjam_name: items})}>
                                {
                                    (this.state.jenisPinjam).map((items) =>{
                                            return(
                                                <Picker.Item label={items.name} value={items.name} key={items.name}/>  
                                            )
                                    })
                                }
                        </Picker>
                    </Card>
                    {this.state.pinjam_name === 'Pilih Jenis Pinjaman'? this.state.check ?
                        <Text style={{color:ColorSimpin.crimson}}>* Jenis Pinjaman Belum Dipilih</Text>:null:null}
                    <Card>
                        <Picker
                            style={{flex:1}}
                            mode="dropdown"
                            selectedValue={this.state.lama_value}
                            onValueChange = {(items) => this.setState({lama_value:items})}>
                                {
                                    (this.state.lamaAngsuran).map((items) =>{
                                            return(
                                                <Picker.Item label={items.name} value={items.value} key={items.value}/>  
                                            )
                                    })
                                }
                        </Picker>
                    </Card>
                    {this.state.lama_value === 0? this.state.check ?
                        <Text style={{color:ColorSimpin.crimson}}>* Lama Angsuran Belum Dipilih</Text>:null:null}
                    <Card style={{padding:10}}>
                        <Label>Keterangan</Label>
                        <Input multiline={true} value={this.state.keterangan} onChangeText={(text) => this.setState({keterangan: text})} placeholder="Alasan Pinjam"
                            style={{height:120, backgroundColor:'#d3d3d3', borderRadius:10, textAlignVertical:'top'}}  placeholderTextColor="white"/>
                    </Card>
                    {this.state.keterangan === ''? this.state.check ?
                        <Text style={{color:ColorSimpin.crimson}}>* Keterangan Belum Diisi</Text>:null:null}
                    </View>
                </Content>
                <View style={{flexDirection:'row', marginHorizontal:20, paddingVertical:30}}>
                    <Button style={{flex:1, backgroundColor:ColorSimpin.secondary, marginRight:10, borderRadius:10, justifyContent:'center'}}>
                        <Text style={{color:ColorSimpin.primary, fontWeight:'bold'}}>Lihat Simulasi</Text>
                    </Button>
                    <Button style={{flex:1, backgroundColor:ColorSimpin.primary, marginLeft:10, borderRadius:10, justifyContent:'center'}}
                        onPress={() => this.sendAjuan()}>
                        <Text style={{color:ColorSimpin.secondary, fontWeight:'bold'}}>Kirim Pengajuan</Text>
                    </Button>
                    </View>
            </Container>
        );
    }
    validate(){
        if(this.state.nominal === ""){
            return false
        }
        if(this.state.pinjam_name ==='Pilih Jenis Pinjaman'){
            return false
        }
        if(this.state.lama_value === 0){
            return false
        }
        return true
    }
    getPilihPinjam(item){
        // console.log(item.name)
        this.setState({
            pinjam_name: item
        })
    }

    pinjamanNominal(text){
        this.setState({
            nominal: text.replace(/[,]/g, ''),
        })
        
    }

    sendAjuan(){
        var tgl = new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString()
        var tgl1 = new Date().getFullYear().toString()+(new Date().getMonth()+1).toString()+new Date().getDate().toString()
        var data={
            anggota_id:this.state.idUser,
            nominal:this.state.nominal,
            jenis:this.state.pinjam_name,
            lama_ags:this.state.lama_value,
            keterangan:this.state.keterangan,
            no_ajuan:parseInt(tgl1+this.state.idUser+this.state.idKop),
            tgl_input:tgl,
            koperasi_id:this.state.idKop
        }
        console.log(JSON.stringify(data))
        if(this.validate()){
            this.props.postPinjam(data)
        }else{
            this.setState({check: true})
        }
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

const mapStateToProps = ({ pinjam }) => {
    const dataPinjam = pinjam
    return { dataPinjam }
}
 
export default connect(
    mapStateToProps, {postPinjam}
)(AjuanPinjaman);