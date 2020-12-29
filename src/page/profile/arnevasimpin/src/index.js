import React, { Component } from 'react';
import Welcome from './components/Welcome';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Pinjaman from './components/Pinjaman';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import BayarPinjaman from './components/Pinjaman/bayar';
import AjuanPinjaman from './components/Pinjaman/ajuan';
import LoginPage from './components/LoginPage';
import { setCustomHeaders } from './apis';
import Pengaturan from './components/ProfilePage/pengaturan';
import Memberpage from './components/MemberPage';
import AngsuranPage from './components/Pinjaman/angsuran';
import TransaksiPage from './components/TransaksiPage';
import SetorTarik from './components/SimpananPage/setor_tarik';

class ArnevaSimpin extends Component {
    constructor(props) {
        super(props);
        if(props.token){
            setCustomHeaders([
                {
                    name:"Authorization",
                    value: props.token
                }
            ])
        }
        this.state = {  }
    }
    render() { 
        return (  
            <AppNav />
        );
    }
}

const SwitchNav = createSwitchNavigator({
    welcome:{screen:Welcome},
    home:{screen:HomePage},
    profil:{screen:ProfilePage},

    pinjaman:{screen: Pinjaman},
    bayarpinjaman:{screen:BayarPinjaman},
    ajuanpinjaman:{screen:AjuanPinjaman},
    login:{screen:LoginPage},
    pengaturan:{screen: Pengaturan},
    member:{screen:Memberpage},
    angsuran:{screen:AngsuranPage},
    transaksi:{screen:TransaksiPage},
    tariksetor:{screen: SetorTarik} 
})
const AppNav= createAppContainer(SwitchNav)
export default ArnevaSimpin;