import React, { Component } from 'react';
import { Container, Card } from 'native-base';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import ColorSimpin from '../../theme/ColorSimpin';

class HeaderPinjam extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            headerName : [
                {
                    name: 'semua',
                    code: '7'
                },
                {
                    name: 'setuju',
                    code: '1'
                },
                {
                    name: 'menunggu',
                    code: '0'
                },
                {
                    name: 'ditolak',
                    code: '2'
                }
            ],
            pilihCode: '7'
        }
    }
    render() { 
        return (  
            <View>
                <FlatList 
                    horizontal={true}
                    data={this.state.headerName}
                    renderItem={({item}) => {
                        return(
                            <TouchableOpacity onPress={() => this.codeDipilih(item)} style={{width:120}}>
                                <Card style={{padding:10, alignItems:'center', 
                                    backgroundColor:this.state.pilihCode === item.code ?ColorSimpin.primary:'white'}}>
                                    <Text style={{color:this.state.pilihCode === item.code ?'white':'black'}}>{item.name}</Text>
                                    <Text style={{color:this.state.pilihCode === item.code ?'white':ColorSimpin.primary}}>{this.total(item.code)}</Text>
                                </Card>
                            </TouchableOpacity>
                        )
                    }}/>
            </View>
        );
    }
    codeDipilih(item){
        this.setState({pilihCode: item.code})
        this.props.onCode(item.code)
    }
    total(code){
        var dataFilter = []
        if(code === "7"){
            dataFilter = this.props.data
        }else{
            dataFilter = this.props.data.filter((item) =>{
                return item.status.match(code)
            })
        }
        var jumlah = 0 
        for(var i = 0; i < dataFilter.length; i++){
            var bunga = parseInt(dataFilter[i].nominal) * 0.0215
            var bulan = parseInt(dataFilter[i].nominal)/parseInt(dataFilter[i].lama_ags)
            jumlah = bunga+bulan+jumlah
        }
        return "Rp "+parseInt(jumlah).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
}
 
export default HeaderPinjam;