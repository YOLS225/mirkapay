import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/app/constants/colors";
import { MyButton, ButtonText } from "../widgets/Button";
import { Input, SecureInput } from "../widgets/Cards";
import { TopTab } from "../widgets/Tobtab";


// ── Écran Connexion ───────────────────────────────────────────────────────────
export function Connexion({ navigation: { navigate } }: any) {
    const [cmu, setCmu] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isValid = cmu.trim().length >= 6 && password.length >= 6;

    const handleLogin = () => {
        if (!isValid) {
            setError("Veuillez renseigner votre N° CMU et votre mot de passe.");
            return;
        }
        setError("");
        navigate("Home");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.main.white }}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <Text style={[styles.title, { marginBottom: 25, marginTop: 40 }]}>CONNEXION</Text>
                <Image style={{ marginBottom: 40 }} source={require("@/assets/images/man.png")} />

                <View style={styles.form}>
                    <Input
                        color={Colors.main.white}
                        text={"N° CMU"}
                        keyboardType="number-pad"
                        value={cmu}
                        onChangeText={(v: string) => { setCmu(v); setError(""); }}
                    />
                    <SecureInput
                        color={Colors.main.white}
                        text={"Mot de passe"}
                        value={password}
                        onChangeText={(v: string) => { setPassword(v); setError(""); }}
                    />

                    {error.length > 0 && (
                        <View style={styles.errorBox}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <ButtonText
                        text={"Mot de passe oublié ?"}
                        textColor={Colors.main.green}
                        onChange={() => navigate("ForgotPassword")}
                    />

                    <MyButton
                        textColor={Colors.main.white}
                        text={"SE CONNECTER"}
                        color={isValid ? Colors.main.blue : Colors.main.lightGrey}
                        size={300}
                        onChange={handleLogin}
                    />

                    <ButtonText
                        text={"INSCRIPTION"}
                        textColor={Colors.main.orange}
                        onChange={() => navigate("Register")}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


// ── Tab Inscription (redirige vers Register) ──────────────────────────────────
export function Inscription({ navigation: { navigate } }: any) {
    return (
        <View style={styles.inscriptionContainer}>
            <Image style={{ marginBottom: 30 }} source={require("@/assets/images/man.png")} />
            <Text style={styles.inscriptionTitle}>Créer un compte</Text>
            <Text style={styles.inscriptionSub}>
                Rejoignez MirkaPay pour gérer vos cotisations CMU facilement et en toute sécurité.
            </Text>

            <View style={styles.featureList}>
                <FeatureRow icon="✓" text="Paiement sécurisé de vos cotisations" />
                <FeatureRow icon="✓" text="Suivi de votre historique de paiements" />
                <FeatureRow icon="✓" text="Statistiques et rapports détaillés" />
                <FeatureRow icon="✓" text="Notifications de paiements en attente" />
            </View>

            <MyButton
                textColor={Colors.main.white}
                text={"CRÉER MON COMPTE"}
                color={Colors.main.orange}
                size={300}
                onChange={() => navigate("Register")}
            />

            <TouchableOpacity onPress={() => navigate("Login")} style={{ marginTop: 10 }}>
                <Text style={styles.loginLink}>Déjà inscrit ? <Text style={{ color: Colors.main.blue }}>Se connecter</Text></Text>
            </TouchableOpacity>
        </View>
    );
}

function FeatureRow({ icon, text }: { icon: string; text: string }) {
    return (
        <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>{icon}</Text>
            <Text style={styles.featureText}>{text}</Text>
        </View>
    );
}


// ── Login (TopTab) ────────────────────────────────────────────────────────────
export function Login() {
    return (
        <TopTab
            top={50}
            firstTitle={"CONNEXION"}
            secondTitle={"INSCRIPTION"}
            firstComponent={Connexion}
            secondComponent={Inscription}
        />
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 24,
    },
    form: {
        width: "100%",
        paddingHorizontal: 16,
        alignItems: "center",
    },
    title: {
        color: Colors.main.dark,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    errorBox: {
        backgroundColor: "#FFEAEA",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: "100%",
    },
    errorText: {
        fontSize: 12,
        color: Colors.main.red,
        textAlign: "center",
    },
    inscriptionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    inscriptionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.main.dark,
        marginBottom: 10,
    },
    inscriptionSub: {
        fontSize: 13,
        color: Colors.main.lightGrey,
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 24,
    },
    featureList: {
        width: "100%",
        marginBottom: 30,
        gap: 10,
    },
    featureRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    featureIcon: {
        color: Colors.main.green,
        fontWeight: "bold",
        fontSize: 16,
        width: 20,
    },
    featureText: {
        fontSize: 13,
        color: Colors.main.dark,
    },
    loginLink: {
        fontSize: 13,
        color: Colors.main.lightGrey,
    },
});