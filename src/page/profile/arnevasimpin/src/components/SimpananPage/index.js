import React, { Component } from 'react';
import { Container, Content, Spinner, Card, Icon, Row } from 'native-base';
import { connect } from 'react-redux';
import {getSimpan} from '../../actions'
import { AsyncStorage, FlatList, Text, View, StyleSheet } from 'react-native';
import ColorSimpin from '../../theme/ColorSimpin';
import { NavigationEvents } from 'react-navigation';

class Simpananpage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSimpan: props.data.sort(function(a,b){
                return b.id - a.id 
            }),
        }
        
    }
    dataFilter(){
        if(this.props.code === "total"){
            return this.state.dataSimpan
        }else{
            var data = this.state.dataSimpan.filter((item) =>{
                return item.jenis.match(this.props.code)
            })
            return data
        }
    }
    render() { 
        return (  
            <Container style={{marginBottom:70}}>
                <FlatList 
                    style={{marginHorizontal:20, paddingBottom:70}}
                    nestedScrollEnabled={false}
                    data = {this.dataFilter()}
                    keyExtractor = {item => item.id}
                    renderItem = {({item}) => {
                        return(
                            <Card style={{padding:10}}>
                                <Row>
                                    <Text style={{flex:1}}>{item.tgl_transaksi.toString().substring(0,10)}</Text>
                                    <Text style={styleSimpan[item.jenis]}>{item.jenis}</Text>
                                </Row>
                                <Row>
                                    <Text style={{flex:1}}>Rp {item.jumlah.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text>
                                    <Icon style={{color: item.transaksi === "setoran"? ColorSimpin.green:ColorSimpin.crimson}} 
                                        name={item.transaksi === "setoran"? "trending-up":"trending-down"}/>
                                </Row>
                            </Card>
                        )
                    }}/>
            </Container>
        );
    }
}
const styleSimpan = StyleSheet.create({
    wajib:{
        backgroundColor:ColorSimpin.purple,
        paddingHorizontal: 5,
        borderRadius:4,
        color:'white'
    },
    sukarela:{
        backgroundColor:'orange',
        paddingHorizontal: 5,
        borderRadius:4,
        color:'white'
    },
    pokok:{
        backgroundColor:'teal',
        paddingHorizontal: 5,
        borderRadius:4,
        color:'white'
    }
})
const mapStateToProps = ({ simpan }) => {
    const dataSimpan = simpan
    return { dataSimpan }
}
export default connect(
    mapStateToProps, {getSimpan}
)(Simpananpage);