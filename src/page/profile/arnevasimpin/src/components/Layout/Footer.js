import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { Text, View } from 'react-native';
import ColorSimpin from '../../theme/ColorSimpin';

class FooterArneva extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Footer >
                <FooterTab style={{ backgroundColor: 'white', justifyContent:'space-evenly' }}>
                    <Button onPress={() => this.props.navigation.navigate('home')}>
                        <View style={{ justifyContent: 'center' }}>
                            <Icon name="home" style={{color: this.props.foot === 'home' ? ColorSimpin.primary : ColorSimpin.grey}}/>
                            <Text style={{color: this.props.foot === 'home' ? ColorSimpin.primary : ColorSimpin.grey}}>Beranda</Text>
                        </View>
                    </Button>
                    {this.props.role !== 'cooperative' ?
                    <Button onPress={() => this.props.navigation.navigate('transaksi')}>
                        <View>
                            <Icon name="save-outline" style={{color: this.props.foot === 'transaksi' ? ColorSimpin.primary : ColorSimpin.grey}}/>
                            <Text style={{color: this.props.foot === 'transaksi' ? ColorSimpin.primary : ColorSimpin.grey}}>Transaksi</Text>
                        </View>
                    </Button>:null}
                    {this.props.role === 'cooperative' ?
                    <Button onPress={() => this.props.navigation.navigate('member')}>
                        <View>
                            <Icon name="people-outline" style={{color: this.props.foot === 'member' ? ColorSimpin.primary : ColorSimpin.grey}}/>
                            <Text style={{color: this.props.foot === 'member' ? ColorSimpin.primary : ColorSimpin.grey}}>Member</Text>
                        </View>
                    </Button>:null}
                    <Button onPress={() => this.props.navigation.navigate('profil')}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Icon name="person" style={{color: this.props.foot === 'profil' ? ColorSimpin.primary : ColorSimpin.grey}}/>
                            <Text style={{color: this.props.foot === 'profil' ? ColorSimpin.primary : ColorSimpin.grey}}>Profile</Text>
                        </View>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

// const Style

export default FooterArneva;