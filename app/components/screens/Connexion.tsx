import {StyleSheet, View, Text, Image} from "react-native";
import { Colors } from "@/app/constants/colors";
import {MyButton,ButtonText } from "../widgets/Button";
import { Input,SecureInput } from "../widgets/Cards";
import { TopTab } from "../widgets/Tobtab";
import { useNavigation } from '@react-navigation/native';


export function Connexion({ navigation: { navigate } }:any) {
    const goHome = ()=>{
      navigate('Home')
    }
    const onChange = ()=>{}
    return (
        <>
            <View style={styles.container}>
                <Text style={[styles.text,{marginBottom:25,marginTop:50}]}>CONNEXION</Text>
                <Image style={{marginBottom:50}} source={require("@/assets/images/man.png")}/>

                <Input color={Colors.main.white} text={'N° CMU'} />
                <SecureInput  color={Colors.main.white} text={'Password'}/>

                <ButtonText text={"Mot de passe oublié?"} textColor={Colors.main.green} onChange={onChange}/>

                <MyButton 
                    textColor={Colors.main.white} 
                    text={"SE CONNECTER"}
                    color={Colors.main.blue} 
                    onChange={goHome}/> 

                <ButtonText text={"INSCRIPTION"} textColor={Colors.main.orange} onChange={onChange}/>

            </View>
        </>
    );
}

export  function Inscription() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        <Text>EN DEVELOPPEMENT</Text>
  
  
      </View>
  
  
  
    );
  }

const styles = StyleSheet.create({
    card: {

        fontWeight: 'bold',

    },
    container: {
         justifyContent: 'center',
         alignItems: 'center',
    },
    text: {
        color: Colors.main.dark,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center'
    },
    form:{
        marginTop:250,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    

});


export function Login(){
  return(
    <TopTab
    top={50}
    firstTitle={"CONNEXION"}
    secondTitle={"INSCRIPTION"}
    firstComponent={Connexion}
    secondComponent={Inscription}
    />
  )
}