import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { Colors } from "@/app/constants/colors";
import { MyButton } from "../widgets/Button";

const IMAGES: Record<string, any> = {
  "Orange Money": require("@/assets/images/orange.png"),
  "Moov money": require("@/assets/images/moov.png"),
  "MTN MoMo": require("@/assets/images/mtn.png"),
  "Wave": require("@/assets/images/wave.png"),
  "Visa": require("@/assets/images/visa.png"),
  "Master Card": require("@/assets/images/visa.png"),
};

function CheckIcon() {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80">
      <Circle cx={40} cy={40} r={40} fill={Colors.main.green} />
      <Path
        d="M22 40 L34 52 L58 28"
        stroke={Colors.main.white}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function PaymentSuccess({ navigation, route }: any) {
  const { method, amount } = route.params;
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const ref = `MKP${Date.now().toString().slice(-8)}`;

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <CheckIcon />
        <Text style={styles.title}>Paiement réussi !</Text>
        <Text style={styles.subtitle}>Votre paiement a été effectué avec succès.</Text>
      </View>

      <View style={styles.receiptCard}>
        <Text style={styles.receiptTitle}>Récapitulatif</Text>

        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Montant</Text>
          <Text style={[styles.receiptValue, { color: Colors.main.blue, fontWeight: "bold" }]}>{amount}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Méthode</Text>
          <View style={styles.methodRow}>
            <Image source={IMAGES[method]} style={styles.methodImg} />
            <Text style={styles.receiptValue}>{method}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Date</Text>
          <Text style={styles.receiptValue}>{dateStr}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Heure</Text>
          <Text style={styles.receiptValue}>{timeStr}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Référence</Text>
          <Text style={[styles.receiptValue, { color: Colors.main.lightGrey, fontSize: 12 }]}>{ref}</Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>✓ Confirmé</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <MyButton
          textColor={Colors.main.white}
          text={"Retour à l'accueil"}
          color={Colors.main.blue}
          size={320}
          onChange={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.white,
    paddingHorizontal: 20,
  },
  topSection: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.main.dark,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.main.lightGrey,
    textAlign: "center",
  },
  receiptCard: {
    backgroundColor: Colors.main.CloudGrey,
    borderRadius: 14,
    padding: 20,
  },
  receiptTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.main.dark,
    marginBottom: 16,
    textAlign: "center",
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  receiptLabel: {
    fontSize: 13,
    color: Colors.main.lightGrey,
  },
  receiptValue: {
    fontSize: 13,
    color: Colors.main.dark,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.main.skyBlue,
    opacity: 0.4,
  },
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  methodImg: {
    width: 24,
    height: 24,
    borderRadius: 4,
    resizeMode: "contain",
  },
  statusBadge: {
    marginTop: 16,
    backgroundColor: "#EAF7E6",
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: "center",
  },
  statusText: {
    color: Colors.main.green,
    fontWeight: "700",
    fontSize: 14,
  },
  buttons: {
    alignItems: "center",
    marginTop: 30,
  },
});