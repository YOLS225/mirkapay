import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Header } from "../widgets/Header";
import { TopTab } from "../widgets/Tobtab";
import { CardInfo, PayCard } from "../widgets/Cards";
import { Colors } from "@/app/constants/colors";
import { PaymentLogo } from "../widgets/PaymentLogo";
import { useNavigation } from '@react-navigation/native';



export function Home() {
    const navigation = useNavigation<any>();

return (
    <View style={{ flex: 1 }}>
        <Header img={require("@/assets/images/manHeader.png")} secondIcon={"bell-badge"} onPressProfile={() => navigation.navigate('Profile')}/>
        <Image
        style={{marginBottom: 16, alignSelf: 'center', marginTop: 16}}
        source={require("@/assets/images/gohou.png")}/>
        <TopTab
                    top={0}
                    firstTitle="PAIEMENT"
                    secondTitle="HISTORIQUE"
                    firstComponent={Paiement}
                    secondComponent={Historique}
                    />
    </View>
)
}



export function Paiement({ navigation: { navigate } }: any) {
    const goPay = () => {
    navigate('PaymentDetail')
      }
    const text = "Nous vous informons que vous avez paiement d'un montant de 12 000 FCFA qui est actuellement en attente de paiement. Voir les détails de paiement en cliquant sur voir les détails"
    return(
        <View style={{flex: 1, alignContent: 'center', justifyContent: "center", alignItems: 'center', flexDirection: 'column', columnGap: 10, gap: 40}}>
            <CardInfo
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
                    onChange={goPay}
                    icon={PaymentLogo}
                    />
        </View>
    )
}


const HISTORIQUE_DATA = [
    { id: "1", label: "Cotisation Mensuelle", date: "15 Fév 2026", montant: "4 000 FCFA", type: "Payé" },
    { id: "2", label: "Amende retard", date: "10 Fév 2026", montant: "2 000 FCFA", type: "Amende" },
    { id: "3", label: "Cotisation Mensuelle", date: "15 Jan 2026", montant: "4 000 FCFA", type: "Payé" },
    { id: "4", label: "Cotisation Spéciale", date: "05 Jan 2026", montant: "8 000 FCFA", type: "Payé" },
    { id: "5", label: "Cotisation Mensuelle", date: "15 Déc 2025", montant: "4 000 FCFA", type: "En attente" },
];

const TYPE_CONFIG: Record<string, { color: string; bg: string }> = {
    Payé: { color: Colors.main.green, bg: "#EAF7E6" },
    "En attente": { color: Colors.main.orange, bg: "#FFF4E0" },
    Amende: { color: Colors.main.red, bg: "#FFEAEA" },
};

export function Historique() {
    const [filtre, setFiltre] = useState("Tous");
    const FILTRES = ["Tous", "Payé", "En attente", "Amende"];

    const filtered = filtre === "Tous" ? HISTORIQUE_DATA : HISTORIQUE_DATA.filter(h => h.type === filtre);

    const totalPaye = HISTORIQUE_DATA
        .filter(h => h.type === "Payé")
        .reduce((sum, h) => sum + parseInt(h.montant.replace(/\D/g, "")), 0);

    return(
        <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
            <View style={style.summaryRow}>
                <View style={[style.summaryCard, { borderLeftColor: Colors.main.blue }]}>
                    <Text style={style.summaryLabel}>Total payé</Text>
                    <Text style={[style.summaryValue, { color: Colors.main.blue }]}>
                        {totalPaye.toLocaleString("fr-FR")} FCFA
                    </Text>
                </View>
                <View style={[style.summaryCard, { borderLeftColor: Colors.main.orange }]}>
                    <Text style={style.summaryLabel}>En attente</Text>
                    <Text style={[style.summaryValue, { color: Colors.main.orange }]}>
                        {HISTORIQUE_DATA.filter(h => h.type === "En attente").length} paiement(s)
                    </Text>
                </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style.filtreRow}>
                {FILTRES.map(f => (
                    <TouchableOpacity
                        key={f}
                        style={[style.filtreBtn, filtre === f && style.filtreBtnActive]}
                        onPress={() => setFiltre(f)}
                    >
                        <Text style={[style.filtreText, filtre === f && style.filtreTextActive]}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {filtered.length === 0 ? (
                <View style={style.empty}>
                    <Text style={style.emptyText}>Aucun résultat</Text>
                </View>
            ) : (
                filtered.map(item => (
                    <View key={item.id} style={style.row}>
                        <View style={[style.iconCircle, { backgroundColor: TYPE_CONFIG[item.type]?.bg }]}>
                            <Text style={{ fontSize: 16 }}>
                                {item.type === "Payé" ? "✓" : item.type === "Amende" ? "!" : "⏳"}
                            </Text>
                        </View>
                        <View style={style.rowInfo}>
                            <Text style={style.rowLabel}>{item.label}</Text>
                            <Text style={style.rowDate}>{item.date}</Text>
                        </View>
                        <View style={style.rowRight}>
                            <Text style={[style.rowMontant, { color: TYPE_CONFIG[item.type]?.color }]}>
                                {item.montant}
                            </Text>
                            <View style={[style.badge, { backgroundColor: TYPE_CONFIG[item.type]?.bg }]}>
                                <Text style={[style.badgeText, { color: TYPE_CONFIG[item.type]?.color }]}>
                                    {item.type}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))
            )}
        </ScrollView>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: Colors.main.white,
    },
    summaryRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 16,
        marginBottom: 16,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: Colors.main.CloudGrey,
        borderRadius: 8,
        padding: 12,
        borderLeftWidth: 4,
    },
    summaryLabel: {
        fontSize: 11,
        color: Colors.main.lightGrey,
        marginBottom: 4,
    },
    summaryValue: {
        fontSize: 13,
        fontWeight: "bold",
    },
    filtreRow: {
        marginBottom: 12,
    },
    filtreBtn: {
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: Colors.main.CloudGrey,
        marginRight: 8,
    },
    filtreBtnActive: {
        backgroundColor: Colors.main.blue,
    },
    filtreText: {
        fontSize: 12,
        color: Colors.main.lightGrey,
    },
    filtreTextActive: {
        color: Colors.main.white,
        fontWeight: "600",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.main.CloudGrey,
        gap: 12,
    },
    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
    },
    rowInfo: {
        flex: 1,
    },
    rowLabel: {
        fontSize: 13,
        fontWeight: "500",
        color: Colors.main.dark,
    },
    rowDate: {
        fontSize: 11,
        color: Colors.main.lightGrey,
        marginTop: 2,
    },
    rowRight: {
        alignItems: "flex-end",
        gap: 4,
    },
    rowMontant: {
        fontSize: 13,
        fontWeight: "bold",
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "600",
    },
    empty: {
        marginTop: 40,
        alignItems: "center",
    },
    emptyText: {
        color: Colors.main.lightGrey,
        fontSize: 14,
    },
});