import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { Colors } from "@/app/constants/colors";
import {MyButton } from "../widgets/Button";
import { CNAM, LOGO } from "../widgets/Logo";
import { PaginationIndicator } from "../widgets/Pagination";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


export function FirstScreen({ navigation: { navigate } }:any) {

    const goLogin = ()=>{
        navigate('Login')
    }
    const onChange = ()=>{}
    return (
        <>
            <View style={styles.body}>

                <ImageBackground
                    style={styles.background}
                    source={require("@/assets/images/nurse.png")}
                >
                    <View style={[styles.overlay,{width:'100%'}]} /> 
                    <PaginationIndicator/>
                        <LOGO/>
                    <Text style={[styles.text,{marginTop:270,marginBottom:25}]}>Bienvenue sur MIRKAPAY</Text>
                    <Text style={[styles.sub,{marginBottom:50}]}>
                    Votre APP sécurisée de paiement des cotisations pour le compte de la couverture maladie universelle (CMU)
                    </Text>
                    <MyButton 
                    style={{fontWeight: 'bold'}}
                    textColor={Colors.main.blue} 
                    text={"CONNEXION"}
                    color={Colors.main.white} 
                    size={300}
                    onChange={goLogin}/>

                    <MyButton 
                    textColor={Colors.main.white} 
                    text={"INSCRIPTION"}
                    color={Colors.main.orange}
                    size={300} 
                    onChange={onChange}/>  

                
                 <CNAM/>
                    
                </ImageBackground>
                
                
            </View>
   
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        left:0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 157, 223, 0.5)', 
    },
    text: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign:'center'
    },
    sub:{
        color: 'white',
        fontSize: 14,
        textAlign:'center'
    }
});
