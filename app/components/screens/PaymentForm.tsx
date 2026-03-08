import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput as RNTextInput } from "react-native";
import { Colors } from "@/app/constants/colors";
import { HeaderWithText } from "../widgets/Header";
import { MyButton } from "../widgets/Button";

const IMAGES: Record<string, any> = {
  "Orange Money": require("@/assets/images/orange.png"),
  "Moov money": require("@/assets/images/moov.png"),
  "MTN MoMo": require("@/assets/images/mtn.png"),
  "Wave": require("@/assets/images/wave.png"),
  "Visa": require("@/assets/images/visa.png"),
  "Master Card": require("@/assets/images/visa.png"),
};

const MOBILE_METHODS = ["Orange Money", "Moov money", "MTN MoMo", "Wave"];

export function PaymentForm({ navigation, route }: any) {
  const { method, amount } = route.params;
  const isMobile = MOBILE_METHODS.includes(method);

  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const isValid = isMobile
    ? phone.length >= 8
    : cardNumber.length >= 16 && expiry.length === 5 && cvv.length === 3;

  const handleConfirm = () => {
    navigation.navigate("PaymentSuccess", { method, amount });
  };

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    return clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <HeaderWithText
        title={"Paiement"}
        icon={"bell-badge"}
        onChange={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <View style={styles.methodCard}>
          <Image source={IMAGES[method]} style={styles.methodImg} />
          <View>
            <Text style={styles.methodName}>{method}</Text>
            <Text style={styles.methodSub}>Méthode de paiement</Text>
          </View>
        </View>

        <View style={styles.amountBox}>
          <Text style={styles.amountLabel}>Montant à payer</Text>
          <Text style={styles.amountValue}>{amount}</Text>
        </View>

        <Text style={styles.sectionTitle}>
          {isMobile ? "Numéro de téléphone" : "Informations de carte"}
        </Text>

        {isMobile ? (
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Numéro {method}</Text>
            <RNTextInput
              style={styles.input}
              placeholder="Ex: 07 00 00 00 00"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={14}
            />
          </View>
        ) : (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Numéro de carte</Text>
              <RNTextInput
                style={styles.input}
                placeholder="0000 0000 0000 0000"
                keyboardType="number-pad"
                value={cardNumber}
                onChangeText={(v) => setCardNumber(formatCard(v))}
                maxLength={19}
              />
            </View>
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.inputLabel}>Date d'expiration</Text>
                <RNTextInput
                  style={styles.input}
                  placeholder="MM/AA"
                  keyboardType="number-pad"
                  value={expiry}
                  onChangeText={(v) => setExpiry(formatExpiry(v))}
                  maxLength={5}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <RNTextInput
                  style={styles.input}
                  placeholder="123"
                  keyboardType="number-pad"
                  secureTextEntry
                  value={cvv}
                  onChangeText={(v) => setCvv(v.replace(/\D/g, "").slice(0, 3))}
                  maxLength={3}
                />
              </View>
            </View>
          </>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {isMobile
              ? `Vous recevrez une notification sur votre ${method} pour confirmer le paiement.`
              : "Vos informations de carte sont sécurisées et chiffrées."}
          </Text>
        </View>

        <View style={styles.buttons}>
          <MyButton
            textColor={Colors.main.red}
            text={"Annuler"}
            color={Colors.main.white}
            size={160}
            onChange={() => navigation.navigate("Home")}
          />
          <MyButton
            textColor={Colors.main.white}
            text={"Confirmer"}
            color={isValid ? Colors.main.blue : Colors.main.lightGrey}
            size={160}
            onChange={isValid ? handleConfirm : undefined}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: Colors.main.CloudGrey,
    borderRadius: 10,
    padding: 16,
    marginTop: 24,
    marginBottom: 20,
  },
  methodImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
    resizeMode: "contain",
  },
  methodName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.main.dark,
  },
  methodSub: {
    fontSize: 12,
    color: Colors.main.lightGrey,
    marginTop: 2,
  },
  amountBox: {
    backgroundColor: Colors.main.lightBlue,
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 12,
    color: Colors.main.lightGrey,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.main.blue,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.main.dark,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: Colors.main.lightGrey,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.main.skyBlue,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.main.dark,
    backgroundColor: Colors.main.white,
  },
  row: {
    flexDirection: "row",
  },
  infoBox: {
    backgroundColor: Colors.main.lightPink,
    borderRadius: 8,
    padding: 14,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 12,
    color: Colors.main.lightGrey,
    textAlign: "center",
    lineHeight: 18,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});