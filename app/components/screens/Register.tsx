import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView,
  TextInput as RNTextInput, TouchableOpacity, KeyboardAvoidingView, Platform
} from "react-native";
import { Colors } from "@/app/constants/colors";
import { HeaderWithText } from "../widgets/Header";
import { MyButton } from "../widgets/Button";
import Svg, { Circle, Path } from "react-native-svg";

// ── Icône succès ─────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <Svg width={90} height={90} viewBox="0 0 90 90">
      <Circle cx={45} cy={45} r={45} fill={Colors.main.green} />
      <Path
        d="M25 45 L38 58 L65 32"
        stroke={Colors.main.white}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

// ── Indicateur d'étapes ───────────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <View style={si.row}>
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <View style={[si.dot, i < current ? si.dotDone : i === current ? si.dotActive : si.dotIdle]}>
            {i < current ? (
              <Text style={si.dotCheck}>✓</Text>
            ) : (
              <Text style={[si.dotNum, i === current && { color: Colors.main.white }]}>{i + 1}</Text>
            )}
          </View>
          {i < total - 1 && (
            <View style={[si.line, i < current && si.lineDone]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

const si = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 24 },
  dot: { width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  dotIdle: { backgroundColor: Colors.main.CloudGrey },
  dotActive: { backgroundColor: Colors.main.blue },
  dotDone: { backgroundColor: Colors.main.green },
  dotNum: { fontSize: 13, fontWeight: "600", color: Colors.main.lightGrey },
  dotCheck: { fontSize: 13, fontWeight: "700", color: Colors.main.white },
  line: { flex: 1, height: 2, backgroundColor: Colors.main.CloudGrey, marginHorizontal: 4 },
  lineDone: { backgroundColor: Colors.main.green },
});

// ── Composants champ ──────────────────────────────────────────────────────────
function Field({ label, placeholder, value, onChangeText, keyboardType, secureTextEntry, maxLength }: any) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.main.lightGrey}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? "default"}
        secureTextEntry={secureTextEntry ?? false}
        maxLength={maxLength}
        autoCapitalize="none"
      />
    </View>
  );
}

// ── Écran principal ───────────────────────────────────────────────────────────
export function Register({ navigation }: any) {
  const [step, setStep] = useState(0);

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [cmu, setCmu] = useState("");
  const [dob, setDob] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const TOTAL_STEPS = 3;

  const isStep0Valid = prenom.trim().length > 0 && nom.trim().length > 0 && cmu.trim().length >= 6 && dob.length === 10;
  const isStep1Valid = phone.trim().length >= 8 && email.includes("@");
  const isStep2Valid = password.length >= 6 && password === confirm;

  const stepValid = [isStep0Valid, isStep1Valid, isStep2Valid];

  const formatDob = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 8);
    if (clean.length > 4) return `${clean.slice(0, 2)}/${clean.slice(2, 4)}/${clean.slice(4)}`;
    if (clean.length > 2) return `${clean.slice(0, 2)}/${clean.slice(2)}`;
    return clean;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else setStep(TOTAL_STEPS);
  };

  const handleBack = () => {
    if (step === 0) navigation.goBack();
    else setStep(step - 1);
  };

  if (step === TOTAL_STEPS) {
    return (
      <View style={styles.successContainer}>
        <CheckIcon />
        <Text style={styles.successTitle}>Inscription réussie !</Text>
        <Text style={styles.successSub}>
          Bienvenue {prenom} {nom}.{"\n"}Votre compte CMU a été créé avec succès.
        </Text>
        <View style={styles.receiptCard}>
          <ReceiptRow label="N° CMU" value={cmu} />
          <ReceiptRow label="Nom complet" value={`${prenom} ${nom}`} />
          <ReceiptRow label="Téléphone" value={phone} />
          <ReceiptRow label="Email" value={email} last />
        </View>
        <MyButton
          textColor={Colors.main.white}
          text={"Se connecter"}
          color={Colors.main.blue}
          size={320}
          onChange={() => navigation.reset({ index: 0, routes: [{ name: "Login" }] })}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <HeaderWithText
          title={"Inscription"}
          icon={"bell-badge"}
          onChange={handleBack}
        />

        <View style={styles.content}>
          <StepIndicator current={step} total={TOTAL_STEPS} />

          {step === 0 && (
            <View>
              <Text style={styles.stepTitle}>Informations personnelles</Text>
              <Text style={styles.stepSub}>Renseignez vos informations d'identité</Text>

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Field label="Prénom *" placeholder="Ex: Marc" value={prenom} onChangeText={setPrenom} />
                </View>
                <View style={{ flex: 1 }}>
                  <Field label="Nom *" placeholder="Ex: Koffi" value={nom} onChangeText={setNom} />
                </View>
              </View>

              <Field
                label="N° CMU *"
                placeholder="Ex: 3843414942439"
                value={cmu}
                onChangeText={(v: string) => setCmu(v.replace(/\D/g, ""))}
                keyboardType="number-pad"
                maxLength={13}
              />
              <Field
                label="Date de naissance *"
                placeholder="JJ/MM/AAAA"
                value={dob}
                onChangeText={(v: string) => setDob(formatDob(v))}
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>
          )}

          {step === 1 && (
            <View>
              <Text style={styles.stepTitle}>Coordonnées</Text>
              <Text style={styles.stepSub}>Comment vous contacter</Text>

              <Field
                label="Numéro de téléphone *"
                placeholder="Ex: 07 00 00 00 00"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={14}
              />
              <Field
                label="Adresse email *"
                placeholder="Ex: marc.koffi@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.stepTitle}>Sécurité</Text>
              <Text style={styles.stepSub}>Créez un mot de passe sécurisé (min. 6 caractères)</Text>

              <Field
                label="Mot de passe *"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Field
                label="Confirmer le mot de passe *"
                placeholder="••••••••"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry
              />

              {confirm.length > 0 && password !== confirm && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>Les mots de passe ne correspondent pas</Text>
                </View>
              )}

              {password.length > 0 && password.length < 6 && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>Le mot de passe doit contenir au moins 6 caractères</Text>
                </View>
              )}

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Votre mot de passe doit contenir au moins 6 caractères. Il sera utilisé pour vous connecter à votre compte.
                </Text>
              </View>
            </View>
          )}

          <View style={styles.navButtons}>
            <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
              <Text style={styles.backBtnText}>‹ Retour</Text>
            </TouchableOpacity>

            <MyButton
              textColor={Colors.main.white}
              text={step === TOTAL_STEPS - 1 ? "S'inscrire" : "Suivant ›"}
              color={stepValid[step] ? Colors.main.blue : Colors.main.lightGrey}
              size={180}
              onChange={stepValid[step] ? handleNext : undefined}
            />
          </View>

          <View style={styles.loginLink}>
            <Text style={styles.loginLinkText}>Déjà un compte ? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.loginLinkText, { color: Colors.main.blue, fontWeight: "600" }]}>
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ReceiptRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.receiptRow, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.receiptLabel}>{label}</Text>
      <Text style={styles.receiptValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.main.white },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  stepTitle: { fontSize: 18, fontWeight: "700", color: Colors.main.dark, marginBottom: 6 },
  stepSub: { fontSize: 13, color: Colors.main.lightGrey, marginBottom: 24 },
  row: { flexDirection: "row" },
  fieldGroup: { marginBottom: 18 },
  fieldLabel: { fontSize: 12, color: Colors.main.lightGrey, marginBottom: 6 },
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
  errorBox: {
    backgroundColor: "#FFEAEA",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  errorText: { fontSize: 12, color: Colors.main.red },
  infoBox: {
    backgroundColor: Colors.main.lightBlue,
    borderRadius: 8,
    padding: 14,
    marginTop: 8,
  },
  infoText: { fontSize: 12, color: Colors.main.lightGrey, lineHeight: 18 },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
  },
  backBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backBtnText: {
    fontSize: 15,
    color: Colors.main.lightGrey,
    fontWeight: "500",
  },
  loginLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginLinkText: { fontSize: 13, color: Colors.main.lightGrey },
  successContainer: {
    flex: 1,
    backgroundColor: Colors.main.white,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
    gap: 16,
  },
  successTitle: { fontSize: 24, fontWeight: "bold", color: Colors.main.dark },
  successSub: { fontSize: 14, color: Colors.main.lightGrey, textAlign: "center", lineHeight: 22 },
  receiptCard: {
    width: "100%",
    backgroundColor: Colors.main.CloudGrey,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.main.skyBlue,
  },
  receiptLabel: { fontSize: 13, color: Colors.main.lightGrey },
  receiptValue: { fontSize: 13, fontWeight: "500", color: Colors.main.dark },
});