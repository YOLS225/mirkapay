import { View, ScrollView } from "react-native";
import { HeaderWithText } from "../widgets/Header";
import { CardMethod } from "../widgets/Cards";
import { Colors } from "@/app/constants/colors";
import { ButtonText } from "../widgets/Button";

const AMOUNT = "12 000 FCFA";

export function PaymentMode({ navigation }: any) {
    const goBack = () => {
        navigation.goBack()
    }
    const goForm = (method: string) => {
        navigation.navigate('PaymentForm', { method, amount: AMOUNT })
    }
    return(
        <>
            <HeaderWithText
            title={"Paiement"}
            icon={"bell-badge"}
            onChange={goBack}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingBottom: 30 }}>
                <CardMethod
                top={20}
                title={"Orange Money"}
                sub={"Mobile money"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/orange.png")}
                icon={"arrow-right-drop-circle-outline"}
                onChange={() => goForm("Orange Money")}
                />
                <CardMethod
                title={"Moov money"}
                sub={"Mobile money"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/moov.png")}
                icon={"arrow-right-drop-circle-outline"}
                onChange={() => goForm("Moov money")}
                />
                <CardMethod
                title={"MTN MoMo"}
                sub={"Mobile money"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/mtn.png")}
                icon={"arrow-right-drop-circle-outline"}
                onChange={() => goForm("MTN MoMo")}
                />
                <CardMethod
                title={"Wave"}
                sub={"Mobile money"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/wave.png")}
                icon={"arrow-right-drop-circle-outline"}
                onChange={() => goForm("Wave")}
                />
                <CardMethod
                title={"Visa"}
                sub={"Carte"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/visa.png")}
                icon={"arrow-right-drop-circle-outline"}
                onChange={() => goForm("Visa")}
                />
                <CardMethod
                title={"Master Card"}
                sub={"Carte"}
                color={Colors.main.CloudGrey}
                img={require("@/assets/images/visa.png")}
                icon={"arrow-right-drop-circle-outline"}
                onChange={() => goForm("Master Card")}
                />

            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                <ButtonText text={"Annuler"} textColor={Colors.main.red} onChange={goBack}/>
            </View>

            </View>
            </ScrollView>
        </>
    )
}