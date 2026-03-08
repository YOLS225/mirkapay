import { View, ScrollView } from "react-native";
import { HeaderWithText } from "../widgets/Header";
import { CardDetail, CardGeneral } from "../widgets/Cards";
import { Account } from "../widgets/Account";
import { Colors } from "@/app/constants/colors";
import { ButtonText, MyButton } from "../widgets/Button";

export function PaymentDetail({ navigation }: any) {
    const goBack = () => {
        navigation.goBack()
    }
    const goTotalPay = () => {
        navigation.navigate('PaymentMode')
    }
    const goPartialPay = () => {

    }
    return(
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 25}}>
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

            <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 30}}>
                <ButtonText text={"Effectuer un paiement partiel"} textColor={Colors.main.orange} onChange={goPartialPay}/>
            </View>

        </ScrollView>
    )
}