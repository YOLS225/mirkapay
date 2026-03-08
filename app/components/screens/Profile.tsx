import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { HeaderWithText } from "../widgets/Header";
import { Colors } from "@/app/constants/colors";

function InfoRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowBorder]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function MenuItem({ icon, label, last }: { icon: string; label: string; last?: boolean }) {
  return (
    <TouchableOpacity style={[styles.menuItem, !last && styles.menuItemBorder]}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );
}

function StatBox({ value, label, valueColor, border }: { value: string; label: string; valueColor: string; border?: boolean }) {
  return (
    <View style={[styles.statBox, border && styles.statBoxBorder]}>
      <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const MENU_ITEMS = [
  { icon: "👤", label: "Informations personnelles" },
  { icon: "🔒", label: "Sécurité & Mot de passe" },
  { icon: "💳", label: "Mes moyens de paiement" },
  { icon: "🔔", label: "Notifications" },
  { icon: "📄", label: "Mes documents" },
  { icon: "❓", label: "Aide & Support" },
];

export function Profile({ navigation }: any) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderWithText
        title="Mon Profil"
        icon="bell-badge"
        onChange={() => navigation.goBack()}
      />

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require("@/assets/images/manHeader.png")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editBtn}>
            <Text style={{ fontSize: 14 }}>✏️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Marc Koffi</Text>
        <Text style={styles.cmuNum}>N° CMU : 3843414942439</Text>
        <View style={styles.activeBadge}>
          <Text style={styles.activeText}>● Actif</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatBox value="14" label="Paiements"     valueColor={Colors.main.blue} />
        <StatBox value="4"  label="Mois en règle" valueColor={Colors.main.green} border />
        <StatBox value="1"  label="En attente"    valueColor={Colors.main.orange} />
      </View>

      {/* Infos personnelles */}
      <View style={styles.card}>
        <InfoRow label="Prénom"    value="Marc" />
        <InfoRow label="Nom"       value="Koffi" />
        <InfoRow label="Téléphone" value="+225 07 00 00 00 00" />
        <InfoRow label="Email"     value="marc.koffi@email.com" last />
      </View>

      {/* Menu */}
      <View style={styles.card}>
        {MENU_ITEMS.map((item, i) => (
          <MenuItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            last={i === MENU_ITEMS.length - 1}
          />
        ))}
      </View>

      {/* Déconnexion */}
      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: "FirstScreen" }] })}
        >
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.white,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 28,
    backgroundColor: Colors.main.lightBlue,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: Colors.main.blue,
  },
  editBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.main.white,
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.main.skyBlue,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.main.dark,
  },
  cmuNum: {
    fontSize: 13,
    color: Colors.main.lightGrey,
    marginTop: 4,
  },
  activeBadge: {
    marginTop: 8,
    backgroundColor: "#EAF7E6",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activeText: {
    color: Colors.main.green,
    fontSize: 12,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: Colors.main.CloudGrey,
    borderRadius: 12,
    overflow: "hidden",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  statBoxBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.main.skyBlue,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 11,
    color: Colors.main.lightGrey,
    marginTop: 4,
    textAlign: "center",
  },
  card: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: Colors.main.CloudGrey,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.main.skyBlue,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.main.lightGrey,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.main.dark,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 12,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.main.skyBlue,
  },
  menuIcon: {
    fontSize: 18,
    width: 28,
    textAlign: "center",
  },
  menuLabel: {
    flex: 1,
    fontSize: 13,
    color: Colors.main.dark,
  },
  menuArrow: {
    fontSize: 22,
    color: Colors.main.lightGrey,
  },
  logoutSection: {
    alignItems: "center",
    marginTop: 28,
    marginBottom: 20,
  },
  logoutBtn: {
    backgroundColor: Colors.main.red,
    paddingVertical: 12,
    width: 320,
    alignItems: "center",
    borderRadius: 4,
  },
  logoutText: {
    color: Colors.main.white,
    fontWeight: "600",
    fontSize: 13,
  },
});