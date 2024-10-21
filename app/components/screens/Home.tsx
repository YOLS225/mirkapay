import { View,Image,Text, StyleSheet } from "react-native";
import { Header } from "../widgets/Header";
import { TopTab } from "../widgets/Tobtab";
import { CardInfo,PayCard } from "../widgets/Cards";
import { Colors } from "@/app/constants/colors";
import { PaymentLogo } from "../widgets/PaymentLogo";
import { useNavigation } from '@react-navigation/native';



export function Home (){
    
return(
    <>
    <View>
        <Header img={require("@/assets/images/manHeader.png")} secondIcon={"bell-badge"}/>
        <Image 
        style={{marginBottom:50,alignContent:'center',justifyContent:"center",marginLeft:35,marginTop:30}} 
        source={require("@/assets/images/gohou.png")}/>
    </View>
                <TopTab 
                    top={1}
                    firstTitle="PAIEMENT"
                    secondTitle="HISTORIQUE"
                    firstComponent={Paiement}
                    secondComponent={Historique}
                    /> 
 </>
)
}



export function Paiement ({ navigation: { navigate } }:any){
    const goPay = ()=>{
    navigate('PaymentDetail')
      }
    const text = "Nous vous informons que vous avez paiement d’un montant de 12 000 FCFA qui est actuellement en attente de paiement. Voir les détails de paiement en cliquant sur voir les détails"
    return(
        <View style={{flex:1,alignContent:'center',justifyContent:"center",alignItems:'center',flexDirection:'column',columnGap:10,gap:40}}>
            <CardInfo 
            //top={}
            content={text} 
            color={Colors.main.lightPink}/>

            <PayCard 
                    title={"Paiement en attente"} 
                    titleColor={Colors.main.orange}
                    content={"12000 FCFA"} 
                    buttonText={"Payer"}
                    color={Colors.main.blue}
                    textColor={Colors.main.white}
                    buttonSize={100}
                    //top={20}
                    onChange={goPay}
                    icon={PaymentLogo}
                    />
        </View>
    )
}


export function Historique (){
    return(
        <View>
            <Text>EN DEVELOPPEMENT</Text>
        </View>
    )
}


const style=StyleSheet.create({

})