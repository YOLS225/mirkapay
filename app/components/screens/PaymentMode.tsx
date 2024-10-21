import { View } from "react-native";
import { HeaderWithText } from "../widgets/Header";
import { CardMethod } from "../widgets/Cards";
import { Colors } from "@/app/constants/colors";
import { ButtonText } from "../widgets/Button";
import { useNavigation } from '@react-navigation/native';



export function PaymentMode({ navigation: { navigate } }:any){
    const navigation = useNavigation();
    const goBack= ()=>{
        navigate('PaymentDetail')
    }
    const onChange= ()=>{}
    return(
        <>
            <HeaderWithText 
            title={"Paiement"} 
            icon={"bell-badge"} 
            onChange={goBack}
            />

            <View>
                <CardMethod
                top={50}
                title={"Orange Money"}
                sub={"Mobile money"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/orange.png")}
                icon={"arrow-right-drop-circle-outline"}
                />
                <CardMethod
                title={"Moov money"}
                sub={"Mobile money"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/moov.png")}
                icon={"arrow-right-drop-circle-outline"}
                />
                <CardMethod
                title={"MTN MoMo"}
                sub={"Mobile money"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/mtn.png")}
                icon={"arrow-right-drop-circle-outline"}
                />
                <CardMethod
                title={"Wave"}
                sub={"Mobile money"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/wave.png")}
                icon={"arrow-right-drop-circle-outline"}
                />
                <CardMethod
                title={"Visa"}
                sub={"Carte"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/visa.png")}
                icon={"arrow-right-drop-circle-outline"}
                />
                <CardMethod
                title={"Master Card"}
                sub={"Carte"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/visa.png")}
                icon={"arrow-right-drop-circle-outline"}
                />

            <View style={{justifyContent: 'center',alignItems:'center',marginTop:45}}>
                <ButtonText  text={"Annuler"} textColor={Colors.main.red}/>
            </View>
                
            </View>
        </>
    )
}