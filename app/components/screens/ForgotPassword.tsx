import React, { useState, useRef } from "react";
import {
    View, Text, StyleSheet, ScrollView,
    TextInput as RNTextInput, TouchableOpacity, KeyboardAvoidingView, Platform
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { Colors } from "@/app/constants/colors";
import { HeaderWithText } from "../widgets/Header";
import { MyButton } from "../widgets/Button";

// ── Icône succès ──────────────────────────────────────────────────────────────
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

// ── Champ texte ───────────────────────────────────────────────────────────────
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

// ── Saisie du code OTP ────────────────────────────────────────────────────────
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const inputs = useRef<(RNTextInput | null)[]>([]);
    const digits = value.padEnd(4, "").split("").slice(0, 4);

    const handleChange = (text: string, index: number) => {
        const clean = text.replace(/\D/g, "").slice(-1);
        const arr = digits.map((d) => d === " " ? "" : d);
        arr[index] = clean;
        const next = arr.join("").replace(/ /g, "");
        onChange(next.slice(0, 4));
        if (clean && index < 3) inputs.current[index + 1]?.focus();
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.otpRow}>
            {[0, 1, 2, 3].map((i) => (
                <RNTextInput
                    key={i}
                    ref={(r) => { inputs.current[i] = r; }}
                    style={[styles.otpBox, digits[i] && digits[i] !== " " && styles.otpBoxFilled]}
                    value={digits[i] === " " ? "" : digits[i]}
                    onChangeText={(t) => handleChange(t, i)}
                    onKeyPress={(e) => handleKeyPress(e, i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                />
            ))}
        </View>
    );
}

// ── Indicateur d'étapes ───────────────────────────────────────────────────────
function StepDots({ current, total }: { current: number; total: number }) {
    return (
        <View style={styles.dotsRow}>
            {Array.from({ length: total }).map((_, i) => (
                <View key={i} style={[styles.dot, i === current && styles.dotActive, i < current && styles.dotDone]} />
            ))}
        </View>
    );
}

// ── Écran principal ───────────────────────────────────────────────────────────
export function ForgotPassword({ navigation }: any) {
    const [step, setStep] = useState(0);
    const [cmu, setCmu] = useState("");
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const TOTAL = 3;

    const isStep0Valid = cmu.trim().length >= 6 && phone.trim().length >= 8;
    const isStep1Valid = code.length === 4;
    const isStep2Valid = newPassword.length >= 6 && newPassword === confirmPassword;
    const stepValid = [isStep0Valid, isStep1Valid, isStep2Valid];

    const handleNext = () => {
        if (step < TOTAL - 1) setStep(step + 1);
        else setStep(TOTAL);
    };

    if (step === TOTAL) {
        return (
            <View style={styles.successContainer}>
                <CheckIcon />
                <Text style={styles.successTitle}>Mot de passe réinitialisé !</Text>
                <Text style={styles.successSub}>
                    Votre mot de passe a été mis à jour avec succès.{"\n"}
                    Vous pouvez maintenant vous connecter.
                </Text>
                <MyButton
                    textColor={Colors.main.white}
                    text={"Se connecter"}
                    color={Colors.main.blue}
                    size={300}
                    onChange={() => navigation.reset({ index: 0, routes: [{ name: "Login" }] })}
                />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <HeaderWithText
                    title={"Mot de passe oublié"}
                    icon={"bell-badge"}
                    onChange={() => step === 0 ? navigation.goBack() : setStep(step - 1)}
                />

                <View style={styles.content}>
                    <StepDots current={step} total={TOTAL} />

                    {step === 0 && (
                        <View>
                            <Text style={styles.stepTitle}>Identification</Text>
                            <Text style={styles.stepSub}>
                                Renseignez votre N° CMU et votre numéro de téléphone pour recevoir un code de vérification.
                            </Text>

                            <Field
                                label="N° CMU *"
                                placeholder="Ex: 3843414942439"
                                value={cmu}
                                onChangeText={(v: string) => setCmu(v.replace(/\D/g, ""))}
                                keyboardType="number-pad"
                                maxLength={13}
                            />
                            <Field
                                label="Numéro de téléphone *"
                                placeholder="Ex: 07 00 00 00 00"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                maxLength={14}
                            />

                            <View style={styles.infoBox}>
                                <Text style={styles.infoText}>
                                    Un code à 4 chiffres sera envoyé par SMS au numéro renseigné.
                                </Text>
                            </View>
                        </View>
                    )}

                    {step === 1 && (
                        <View>
                            <Text style={styles.stepTitle}>Code de vérification</Text>
                            <Text style={styles.stepSub}>
                                Entrez le code à 4 chiffres envoyé par SMS au{"\n"}
                                <Text style={{ fontWeight: "700", color: Colors.main.dark }}>{phone}</Text>
                            </Text>

                            <OtpInput value={code} onChange={setCode} />

                            <TouchableOpacity style={styles.resendRow} onPress={() => setCode("")}>
                                <Text style={styles.resendText}>
                                    Vous n'avez pas reçu le code ?{" "}
                                    <Text style={{ color: Colors.main.blue, fontWeight: "600" }}>Renvoyer</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {step === 2 && (
                        <View>
                            <Text style={styles.stepTitle}>Nouveau mot de passe</Text>
                            <Text style={styles.stepSub}>Choisissez un nouveau mot de passe sécurisé (min. 6 caractères).</Text>

                            <Field
                                label="Nouveau mot de passe *"
                                placeholder="••••••••"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry
                            />
                            <Field
                                label="Confirmer le mot de passe *"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />

                            {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                                <View style={styles.errorBox}>
                                    <Text style={styles.errorText}>Les mots de passe ne correspondent pas</Text>
                                </View>
                            )}
                            {newPassword.length > 0 && newPassword.length < 6 && (
                                <View style={styles.errorBox}>
                                    <Text style={styles.errorText}>Le mot de passe doit contenir au moins 6 caractères</Text>
                                </View>
                            )}
                        </View>
                    )}

                    <View style={styles.btnRow}>
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => step === 0 ? navigation.goBack() : setStep(step - 1)}
                        >
                            <Text style={styles.backBtnText}>‹ Retour</Text>
                        </TouchableOpacity>

                        <MyButton
                            textColor={Colors.main.white}
                            text={step === TOTAL - 1 ? "Confirmer" : "Suivant ›"}
                            color={stepValid[step] ? Colors.main.blue : Colors.main.lightGrey}
                            size={180}
                            onChange={stepValid[step] ? handleNext : undefined}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.main.white },
    content: { paddingHorizontal: 20, paddingBottom: 40 },
    dotsRow: { flexDirection: "row", justifyContent: "center", gap: 8, marginVertical: 24 },
    dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.main.CloudGrey },
    dotActive: { backgroundColor: Colors.main.blue, width: 28, borderRadius: 5 },
    dotDone: { backgroundColor: Colors.main.green },
    stepTitle: { fontSize: 18, fontWeight: "700", color: Colors.main.dark, marginBottom: 6 },
    stepSub: { fontSize: 13, color: Colors.main.lightGrey, marginBottom: 24, lineHeight: 20 },
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
    infoBox: {
        backgroundColor: Colors.main.lightBlue,
        borderRadius: 8,
        padding: 14,
        marginTop: 4,
    },
    infoText: { fontSize: 12, color: Colors.main.lightGrey, lineHeight: 18 },
    otpRow: { flexDirection: "row", justifyContent: "center", gap: 14, marginVertical: 24 },
    otpBox: {
        width: 60,
        height: 65,
        borderWidth: 2,
        borderColor: Colors.main.skyBlue,
        borderRadius: 10,
        fontSize: 26,
        fontWeight: "700",
        color: Colors.main.dark,
        backgroundColor: Colors.main.white,
    },
    otpBoxFilled: { borderColor: Colors.main.blue },
    resendRow: { alignItems: "center", marginTop: 8 },
    resendText: { fontSize: 13, color: Colors.main.lightGrey },
    errorBox: { backgroundColor: "#FFEAEA", borderRadius: 8, padding: 10, marginBottom: 12 },
    errorText: { fontSize: 12, color: Colors.main.red },
    btnRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 32,
    },
    backBtn: { paddingVertical: 12, paddingHorizontal: 16 },
    backBtnText: { fontSize: 15, color: Colors.main.lightGrey, fontWeight: "500" },
    successContainer: {
        flex: 1,
        backgroundColor: Colors.main.white,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 100,
        gap: 20,
    },
    successTitle: { fontSize: 24, fontWeight: "bold", color: Colors.main.dark },
    successSub: { fontSize: 14, color: Colors.main.lightGrey, textAlign: "center", lineHeight: 22 },
});