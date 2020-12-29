import React, { Component } from 'react';
import { Container, Content, Card, Row, Icon, Button, Spinner } from 'native-base';
import HeaderArneva from '../Layout/Header';
import FooterArneva from '../Layout/Footer';
import { FlatList, Text, Dimensions, View, TouchableOpacity, AsyncStorage, Modal } from 'react-native';
import ColorSimpin from '../../theme/ColorSimpin';

const FULLWIDTH = Dimensions.get('window').width
class Pinjaman extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            dataFrame : [
                {   title: 'Data Pengajuan',
                    icon: 'file-tray-full-outline',
                    descripsi:'Lihat data riwayat pengajuan pinjaman anda',
                    navigasi:'datapinjaman'
                },{
                    title: 'Bayar Pinjaman',
                    icon: 'reader-outline',
                    descripsi:'Lakukan pembayaran pinjaman Anda',
                    navigasi:'bayarpinjaman'
                },{
                    title: 'Pengajuan Pinjaman',
                    icon: 'cash-outline',
                    descripsi:'Lakukan pengajuan pinjaman Anda',
                    navigasi:'ajuanpinjaman'
                }
            ],
            dataPinjam: props.data,
            alerttext: false
        }
    }
    statusTransaksi(num){
        switch (num) {
            case 0:
                return {
                    status: 'menunggu',
                    sta_color: ColorSimpin.secondary
                }
            case 1:
                return {
                    status: 'setuju',
                    sta_color: ColorSimpin.green
                }
            case 2:
                return {
                    status: 'ditolak',
                    sta_color: ColorSimpin.crimson
                }
        
            default:
                return {
                    status: 'lainnya',
                    sta_color: ColorSimpin.purple
                }
        }
    }
    jatuhTempo(tgl){
        var tahun = tgl.toString().substring(0,4)
        var bulan = ""
        var tanggal =tgl.toString().substring(8,10)
        switch (tgl.toString().substring(5,7)) {
            case "01":
                bulan = "February"
                break;
            case "02":
                bulan = "Maret"
                break;
            case "03":
                bulan = "April"
                break;
            case "04":
                bulan = "Mei"
                break;
            case "05":
                bulan = "Juni"
                break;
            case "06":
                bulan = "Juli"
                break;
            case "07":
                bulan = "Agustus"
                break;
            case "08":
                bulan = "September"
                break;
            case "09":
                bulan = "Oktober"
                break;
            case "10":
                bulan = "November"
                break;
            case "11":
                bulan = "Desember"
                break;
            case "12":
                bulan = "Januari"
                break;
            default:
                bulan = "Madu"
                break;
        }
        return tanggal+" "+bulan+" "+tahun
    }
    dataFilter(){
        if(this.props.code === "7"){
            return this.state.dataPinjam
        }else{
            var data = this.state.dataPinjam.filter((item) =>{
                return item.status.match(this.props.code)
            })
            return data
        }
    }
    render() { 
        var nav = this.props.navigation
        return (  
                <FlatList 
                    nestedScrollEnabled={false}
                    style={{marginHorizontal:10, marginTop:10, marginBottom:60}}
                    data = {this.dataFilter()}
                    keyExtractor = {item => item.title}
                    renderItem = {({item}) =>{
                        return(
                            <TouchableOpacity onPress={() => this.toAngsuran(item)}>
                                <Card>
                                    <Row style={{alignItems:'center', backgroundColor:ColorSimpin.primary, padding:10, justifyContent:'flex-end'}}>
                                        <Text style={{marginHorizontal:10, color:'white', fontWeight:'bold'}}>{item.no_ajuan}</Text>
                                        <Text style={{fontWeight:'bold', color:'white', paddingHorizontal:5, borderRadius:3,
                                                backgroundColor: this.statusTransaksi(parseInt(item.status)).sta_color}}>
                                                {this.statusTransaksi(parseInt(item.status)).status}</Text>
                                    </Row>
                                    <Row style={{justifyContent:'space-between', marginHorizontal:20, marginVertical:15, alignItems:'center'}}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style={{color:'grey'}}>Tenor</Text>
                                            <Text style={{color:ColorSimpin.primary}}>
                                                {item.lama_ags} bulan</Text>
                                        </View>
                                        <View style={{alignItems:'center'}}>
                                            <Text style={{color:'grey'}}>Tagihan</Text>
                                            <Text style={{color:ColorSimpin.primary}}>
                                                Rp {this.nilaiAngsuran(item)}, -</Text>
                                        </View>
                                        <View style={{alignItems:'center'}}>
                                            <Text style={{color:'grey'}}>Jatuh Tempo</Text>
                                            <Text style={{color:'orange'}}>{this.jatuhTempo(item.tgl_input)}</Text>
                                        </View>
                                    </Row>
                                </Card>
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
                            </TouchableOpacity>
                        )
                    }}/>
        );
    }
    nilaiAngsuran(item){
        var bunga = parseInt(item.nominal)*0.0215
        var bulan = parseInt(item.nominal)/item.lama_ags

        return (parseInt(bunga+bulan)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    toAngsuran(item){
        if(parseInt(item.status) === 0){
            this.setState({
                alerttext:true,
                texterror:"Pengajuan Anda Belum Disetujui Admin.",
            })
        }else{
            this.props.navigation.navigate('angsuran', {data: item})
        }
    }
}
 
export default Pinjaman;