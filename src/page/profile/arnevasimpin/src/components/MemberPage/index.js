import React, { Component } from 'react';
import { Container, Content, Spinner, Card } from 'native-base';
import HeaderArneva from '../Layout/Header';
import FooterArneva from '../Layout/Footer';
import { AsyncStorage, FlatList, Text } from 'react-native';
import { setBaseURL, API_URL } from '../../apis';
import { connect } from 'react-redux';
import {getMember} from '../../actions'
import ColorSimpin from '../../theme/ColorSimpin';
import { NavigationEvents } from 'react-navigation';

class Memberpage extends Component {
    constructor(props) {
        setBaseURL(API_URL)
        super(props);
        this.state = {  
            role:'member',
            dataMember:[],
            load:true
        }

        AsyncStorage.getItem('userRole', (err, respons) =>{
            this.setState({role: respons})
        })

        this.initState = this.initState.bind(this)
    }

    componentDidMount(){
        this.initState()
    }
    componentWillReceiveProps(newProps){
        if(this.props.dataMember !== newProps.dataMember){
            console.log(JSON.stringify(newProps.dataMember))
            if(newProps.dataMember.list){
                this.setState({
                    dataMember:newProps.dataMember.list.data,
                    load: false
                })
            }
        }
    }

    initState(){
        AsyncStorage.getItem('userToken', (err, respons) =>{
            this.props.getMember({token: respons})
        })
    }
    render() { 
        var nav = this.props.navigation
        return (  
            <Container>
                <HeaderArneva title = "Member"/>
                <NavigationEvents 
                onDidFocus = {() => this.initState()}/>
                {this.state.load ? <Content><Spinner color={ColorSimpin.primary}/></Content>:
                <FlatList 
                    data = {this.state.dataMember}
                    keyExtractor={item => item.id}
                    renderItem={({item}) =>{
                        return(
                            <Card>
                                <Text>{item.name}</Text>
                            </Card>
                        )
                    }}/>}
                <FooterArneva foot="member" navigation = {nav} role={this.state.role}/>
            </Container>
        );
    }
}
const mapStateToProps = ({ member }) => {
    const dataMember = member
    return { dataMember }
}
export default connect(mapStateToProps, {getMember})(Memberpage);