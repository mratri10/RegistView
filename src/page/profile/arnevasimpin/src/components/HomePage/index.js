import React, { Component } from 'react';
import { Container, Content, Card, Row, CardItem, Spinner } from 'native-base';
import HeaderArneva from '../Layout/Header';
import FooterArneva from '../Layout/Footer';
import { connect } from 'react-redux';
import { getProfile } from '../../actions'
import { AsyncStorage, Text, View, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { setBaseURL, API_URL } from '../../apis';
import ColorSimpin from '../../theme/ColorSimpin';


class HomePage extends Component {
    constructor(props) {
        super(props);
        setBaseURL(API_URL)
        this.state = {
            banner: [
                "https://www.protradeunited.com.au/wp-content/uploads/2018/10/TA-Banner-Design-1.png"
            ],
            role:'member',
            dataProfil:{},
            load: true
        }
        this.initState = this.initState.bind(this)
        AsyncStorage.getItem('userRole', (err, respons) =>{
            this.setState({role: respons})
        })
    }
    componentDidMount() {
        this.initState()
    }
    componentWillReceiveProps(newProps) {
        if (this.props.dataAuth !== newProps.dataAuth) {
            if(newProps.dataAuth.profil){
                this.setState({
                    load: false,
                    dataProfil: newProps.dataAuth.profil.data.profile
                })
            }
        }
    }
    initState() {
        AsyncStorage.getItem('userToken', (err, respons) => {
            var data = { token: respons }
            this.props.getProfile(data)
        })
    }
    render() {
        var nav = this.props.navigation
        return (
            <Container >
                <HeaderArneva title="Beranda" />
                <NavigationEvents
                    onDidFocus={() => this.initState()} />
                {/* <Text>{this.state.da}</Text> */}
                {this.state.load ? <Content><Spinner color={ColorSimpin.primary}/></Content>:
                    <Content style={{margin:20}}>
                        <Row>
                            <View style={{flex:1}}>
                                <Text style={{color:'grey'}}>{this.waktuDini()}</Text>
                                <Text style={{fontSize:18, fontWeight:'bold'}}>{this.state.dataProfil.name}</Text>    
                            </View>
                            <Image source={{uri: "https://www.mekarsai.org/po-content/po-upload/koperasiindonesia-854878-polibrary.jpg"}}
                                style={{width:70, height:70, resizeMode:'contain'}}/>
                        </Row>
                        <Card>
                            <CardItem>
                                <Text>Alamat</Text>
                                <Text style={{flex:1, textAlign:'right'}}>{this.state.dataProfil.address}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{marginRight:5}}>Desa</Text>
                                <Text style={{flex:1, textAlign:'right'}}>{this.state.dataProfil.village.name}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{marginRight:5}}>Kecamatan</Text>
                                <Text style={{flex:1, textAlign:'right'}}>{this.state.dataProfil.district.name}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{marginRight:5}}>Kabupaten/Kota</Text>
                                <Text style={{flex:1, textAlign:'right'}}>{this.state.dataProfil.city.name}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{marginRight:5}}>Provinsi</Text>
                                <Text style={{flex:1, textAlign:'right'}}>{this.state.dataProfil.province.name}</Text>
                            </CardItem>
                        </Card>
                    </Content>}
                <FooterArneva foot="home" navigation = {nav} role={this.state.role} />
            </Container>
        );
    }
    waktuDini(){
        var jam = new Date().getHours();
        if(jam > 12 && jam < 15){
            return "Selamat Siang"
        }
        if(jam >= 15 && jam < 18){
            return "Selamat Sore"
        }
        if(jam > 18 || jam < 4){
            return "Selamat Malam"
        }
        if(jam > 4){
            return "Selamat Pagi"
        }
        return "Halo"
    }
}

const mapStateToProps = ({ auth }) => {
    const dataAuth = auth
    return { dataAuth }
}
export default connect(mapStateToProps, { getProfile })(HomePage);