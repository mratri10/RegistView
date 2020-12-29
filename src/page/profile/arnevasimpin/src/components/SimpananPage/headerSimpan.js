import React, { Component } from 'react';
import { View, FlatList, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Icon } from 'native-base';
import ColorSimpin from '../../theme/ColorSimpin';


class HeaderSimpan extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            headerName : [
                {
                    name: 'Total',
                    code: 'total'
                },
                {
                    name: 'Wajib',
                    code: 'wajib'
                },
                {
                    name: 'Pokok',
                    code: 'pokok'
                },
                {
                    name: 'Sukarela',
                    code: 'sukarela'
                }
            ],
            pilihCode: 'total'
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
        if(code === "total"){
            dataFilter = this.props.data
        }else{
            dataFilter = this.props.data.filter((item) =>{
                return item.jenis.match(code)
            })
        }
        var jumlah = 0 
        for(var i = 0; i < dataFilter.length; i++){
            if(dataFilter[i].transaksi ==="setoran"){
                jumlah = parseInt(dataFilter[i].jumlah)+jumlah
            }else{
                jumlah = jumlah-parseInt(dataFilter[i].jumlah)
            }
        }
        console.log("total: "+jumlah) 
        return "Rp "+jumlah.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
}

 
export default HeaderSimpan;