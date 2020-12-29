import React, { Component } from 'react';
import { Container, Header, Icon } from 'native-base';
import { TouchableOpacity, Text } from 'react-native';
import ColorSimpin from '../../theme/ColorSimpin';

class BayarPinjaman extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <Container>
                <Header style={{justifyContent:'flex-start', alignItems:'center', backgroundColor:ColorSimpin.primary}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('transaksi')}>
                        <Icon name="arrow-back-circle-outline" style={{color:'white', padding:5}}/>
                    </TouchableOpacity>
                    <Text style={{color:'white'}}>Bayar Pinjaman</Text>
                </Header>
            </Container>
        );
    }
}
 
export default BayarPinjaman;