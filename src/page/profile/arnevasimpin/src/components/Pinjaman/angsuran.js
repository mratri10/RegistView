import React, { Component } from 'react';
import { Container, Card, Content, Spinner, Col, Row, CardItem, Button } from 'native-base';
import HeaderArneva from '../Layout/Header';
import { connect } from 'react-redux';
import {getAngsuran}from '../../actions'
import { setBaseURL, API_URL2 } from '../../apis';
import { NavigationEvents } from 'react-navigation';
import ColorSimpin from '../../theme/ColorSimpin';
import { Text, View, FlatList } from 'react-native';

class AngsuranPage extends Component {
    constructor(props) {
        setBaseURL(API_URL2)
        super(props);
        this.state = {  
            dataAjuan: props.navigation.getParam('data'),
            load: true,
            dataAngsuran:{}
        }

        this.initState = this.initState.bind(this)
    }
    componentDidMount(){
        this.initState()
    }
    nilaiAngsuran(item){
        var bunga = parseInt(item.nominal)*0.0215
        var bulan = parseInt(item.nominal)/item.lama_ags

        return (parseInt(bunga+bulan)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    componentWillReceiveProps(newProps){
        if(this.props.dataPinjam !== newProps.dataPinjam){
            console.log(JSON.stringify(newProps.dataPinjam))
            if(newProps.dataPinjam.angsuran){
                this.setState({
                    dataAngsuran:newProps.dataPinjam.angsuran.data,
                    load: false
                })
            }
        }
    }

    initState(){
        console.log(JSON.stringify(this.state.dataAjuan.no_ajuan))
        this.props.getAngsuran({no_ajuan: this.state.dataAjuan.no_ajuan})
    }
    render() { 
        return (  
            <Container>
                <HeaderArneva title="Angsuran" left={true} navleft={() => this.props.navigation.navigate('transaksi')}/>
                
                { this.state.load ? <Content><Spinner color={ColorSimpin.primary}/></Content>:
                    <Content>
                        <Card style={{backgroundColor:ColorSimpin.secondary, flexDirection:'row', paddingVertical:20, marginLeft:10, marginRight:10}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'grey'}}>No Transaksi</Text>
                                <Text style={{color:ColorSimpin.primary, fontWeight:'bold'}}>{this.state.dataAngsuran.no_ajuan}</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'grey'}}>Jumlah Pinjam</Text>
                                <Text style={{color:ColorSimpin.primary, fontWeight:'bold'}}>Rp{this.state.dataAngsuran.nominal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'grey'}}>Lama Angsuran</Text>
                                <Text style={{color:ColorSimpin.primary, fontWeight:'bold'}}>{this.state.dataAngsuran.lama_ags} Bulan</Text>
                            </View>
                        </Card>
                        <Row>
                            <Button onPress={() => this.props.navigation.navigate('bayarpinjaman')}
                                style={{flex:1, marginHorizontal:10, borderRadius:10, justifyContent:'center', backgroundColor:ColorSimpin.primary}}>
                                <Text style={{color:ColorSimpin.secondary}}>Bayar Angsuran</Text>
                            </Button>
                        </Row>
                        <Row style={{marginHorizontal:10, marginTop:20}}>
                            <Text style={{flex:1}}>Tenor</Text>
                            <Text style={{flex:2}}>Angsuran</Text>
                            <Text style={{flex:2}}>Tanggal Bayar</Text>
                        </Row>
                        <Row style={{marginHorizontal:10,height:5, backgroundColor:'grey'}}/>
                        <FlatList 
                            data={this.state.dataAngsuran.detail}
                            keyExtractor={item => item.id}
                            renderItem = {({item}) =>{
                                return(
                                    <Row style={{marginHorizontal:10, marginTop:5}}>
                                        <Text style={{flex:1}}>{item.angsuran_ke}</Text>
                                        <Text style={{flex:2}}>Rp{item.jumlah_bayar.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
                                        <Text style={{flex:2}}>{item.tgl_bayar.toString().substring(0,10)}</Text>
                                    </Row>
                                )
                            }}/>
                    </Content> }

                
            </Container>
        );
    }
}

const mapStateToProps = ({ pinjam }) => {
    const dataPinjam = pinjam
    return { dataPinjam }
}
 
export default connect(
    mapStateToProps, {getAngsuran}
)(AngsuranPage);