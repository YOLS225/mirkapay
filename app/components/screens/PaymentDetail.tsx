import { View } from "react-native";
import { Header, HeaderWithText } from "../widgets/Header";
import { CardDetail,CardGeneral } from "../widgets/Cards";
import { Account } from "../widgets/Account";
import { Colors } from "@/app/constants/colors";
import {ButtonText, MyButton} from "../widgets/Button";
import { useNavigation } from '@react-navigation/native';
import { BottomTab } from "../widgets/BottomTab";

export function PaymentDetail({ navigation: { navigate } }:any){
    const goBack= ()=>{
        navigate('Home')
    }
    const goTotalPay= ()=>{
        navigate('PaymentMode')
    }
    const goPartialPay= ()=>{
        
    }
    return(
        <View>
            <HeaderWithText 
            title={"Paiement"} 
            icon={"bell-badge"} 
            onChange={goBack}
            />
            <CardDetail
            top={40} 
            title={"MARC KOFFI"} 
            sub={"N°: 3843414942439"} 
            icon={Account}
            color={Colors.main.CloudGrey}
            amount={"4000 FCFA"}
            month={"4 Mois"}
            />

            <CardDetail 
                title={"ROMEO KOFFI"} 
                sub={"N°: 3843414942440"} 
                icon={Account}
                color={Colors.main.CloudGrey}
                amount={"4000 FCFA"}
                month={"4 Mois"}
            />
            <CardDetail 
                title={"MARIE KOFFI"} 
                sub={"N°: 3843414942441"} 
                icon={Account}
                color={Colors.main.CloudGrey}
                amount={"4000 FCFA"}
                month={"4 Mois"}
            />

            <CardGeneral/>

            <View style={{display:'flex',flexDirection:'row',justifyContent: 'space-around',marginTop:25}}>
            <MyButton
            style={{fontWeight: 'bold'}}
            textColor={Colors.main.red}
            text={"Annuler"}
            color={Colors.main.white}
            size={200}
            onChange={goBack}/>

            <MyButton
            style={{fontWeight: 'bold'}}
            textColor={Colors.main.white}
            text={"Payer la totalité"}
            color={Colors.main.blue}
            size={200}
            onChange={goTotalPay}/>
            </View>

            <View style={{justifyContent: 'center',alignItems:'center'}}>
                <ButtonText  text={"Effectuer un paiement partiel"} textColor={Colors.main.orange} onChange={goPartialPay}/>
            </View>

        </View>
    )
}