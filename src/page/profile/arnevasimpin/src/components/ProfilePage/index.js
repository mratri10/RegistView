import {Container, Content, Header, Grid, Col, Row, Button} from 'native-base';
import HeaderArneva from '../Layout/Header';
import FooterArneva from '../Layout/Footer';
import Color from '../../theme/ColorSimpin';
import {Text, Image, AsyncStorage, View} from 'react-native';
import React, { Component } from 'react';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: 'Nama User',
            gender: '',
            // indentitas: '',
            nik: '',
            hp: '',
            email: '',
            tgl_join: '',

            loading: true,
            status: false,
            connection: true,
            role:'member'
         };

         AsyncStorage.getItem('userRole', (err, respons) =>{
            this.setState({role: respons})
        })
    }
    render() { 
        var nav = this.props.navigation
        return (  
            <Container>
                <HeaderArneva title = "Profil"/>
                <Content>
                    <Grid
                    style={{marginHorizontal: 20, marginTop: 40, marginBottom: 20}}>
                    <Image
                        source={require('../../assets/arneva.png')}
                        style={{
                        resizeMode: 'contain',
                        borderRadius: 100,
                        height: 100,
                        width: 100,
                        }}
                    />
                    <Col style={{alignSelf: 'center', marginLeft: 20}}>
                        <Text style={{fontWeight: 'bold'}}>{this.state.nama}</Text>
                        <Text style={{fontWeight: 'bold'}}>
                        {this.state.gender === 'P' ? 'Perempuan' : 'Laki-laki'}
                        </Text>
                    </Col>
                    </Grid>
                    <Row
                    style={{
                        backgroundColor: Color.grey2,
                        marginHorizontal: 20,
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}>
                    <Col>
                        <Text>Nomor Anggota</Text>
                        <Text style={{fontWeight: 'bold', marginTop:10, fontSize: 15}}>13151114</Text>
                        <Text style={{fontWeight: 'bold'}}>{this.state.identitas}</Text>
                    </Col>
                    </Row>
                    <Row
                    style={{
                        backgroundColor: Color.grey2,
                        marginHorizontal: 20,
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}>
                    <Col>
                        <Text>Nomor Handphone</Text>
                        <Text style={{fontWeight: 'bold', marginTop:10, fontSize: 15}}>081380095455</Text>
                        <Text style={{fontWeight: 'bold'}}>{this.state.hp}</Text>
                    </Col>
                    </Row>
                    <Row
                    style={{
                        backgroundColor: Color.grey2,
                        marginHorizontal: 20,
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}>
                    <Col>
                        <Text>Email</Text>
                        <Text style={{fontWeight: 'bold', marginTop:10, fontSize: 15}}>nama@user.co.id</Text>
                        <Text style={{fontWeight: 'bold'}}>{this.state.email}</Text>
                    </Col>
                    </Row>
                    <Row
                    style={{
                        backgroundColor: Color.grey2,
                        marginHorizontal: 20,
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}>
                    <Col>
                        <Text>Tanggal Bergabung</Text>
                        <Text style={{fontWeight: 'bold', marginTop:10, fontSize: 15}}>16 Desember 2019</Text>
                        <Text style={{fontWeight: 'bold'}}>
                        {/* {TanggalFormat('string', this.state.tgl_join)} */}
                        </Text>
                    </Col>
                    </Row>
                    <Row>
                    <Button
                        onPress={() => this.props.navigation.navigate('pengaturan')}
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            marginHorizontal: 20,
                            justifyContent: "center",
                            borderRadius: 10,
                            backgroundColor: Color.primary,
                            marginTop: 50,
                            marginBottom: 30,
                        }}>
                        <Text style={{color: 'white'}}>Pengaturan</Text>
                        </Button>
                    </Row>
                </Content>
                <FooterArneva foot="profil" navigation = {nav} role={this.state.role}/>
            </Container>
        );
    }
}
 
export default ProfilePage;