import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "@/app/constants/colors";
import { Header } from "../widgets/Header";
import { useNavigation } from "@react-navigation/native";

const FILTRES = ["Tous", "Payés", "En attente", "Amendes"];

const HISTORIQUE = [
  { id: "1", label: "Cotisation Mensuelle", date: "15 Fév 2026", montant: "4 000 FCFA", type: "Payés", mois: "Fév 2026" },
  { id: "2", label: "Amende retard", date: "10 Fév 2026", montant: "2 000 FCFA", type: "Amendes", mois: "Fév 2026" },
  { id: "3", label: "Cotisation Mensuelle", date: "15 Jan 2026", montant: "4 000 FCFA", type: "Payés", mois: "Jan 2026" },
  { id: "4", label: "Cotisation Spéciale", date: "05 Jan 2026", montant: "8 000 FCFA", type: "Payés", mois: "Jan 2026" },
  { id: "5", label: "Cotisation Mensuelle", date: "15 Déc 2025", montant: "4 000 FCFA", type: "En attente", mois: "Déc 2025" },
  { id: "6", label: "Amende absence", date: "20 Nov 2025", montant: "1 000 FCFA", type: "Amendes", mois: "Nov 2025" },
  { id: "7", label: "Cotisation Mensuelle", date: "15 Nov 2025", montant: "4 000 FCFA", type: "Payés", mois: "Nov 2025" },
  { id: "8", label: "Cotisation Mensuelle", date: "15 Oct 2025", montant: "4 000 FCFA", type: "Payés", mois: "Oct 2025" },
  { id: "9", label: "Cotisation Mensuelle", date: "15 Sep 2025", montant: "4 000 FCFA", type: "En attente", mois: "Sep 2025" },
];

const TYPE_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  Payés: { color: Colors.main.green, bg: "#EAF7E6", label: "Payé" },
  "En attente": { color: Colors.main.orange, bg: "#FFF4E0", label: "En attente" },
  Amendes: { color: Colors.main.red, bg: "#FFEAEA", label: "Amende" },
};

function Badge({ type }: { type: string }) {
  const config = TYPE_CONFIG[type] ?? { color: Colors.main.lightGrey, bg: Colors.main.CloudGrey, label: type };
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.badgeText, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

export function HistoriqueScreen() {
  const navigation = useNavigation<any>();
  const [filtre, setFiltre] = useState("Tous");

  const filtered = filtre === "Tous" ? HISTORIQUE : HISTORIQUE.filter((h) => h.type === filtre);

  const grouped: { mois: string; items: typeof HISTORIQUE }[] = [];
  filtered.forEach((item) => {
    const last = grouped[grouped.length - 1];
    if (!last || last.mois !== item.mois) {
      grouped.push({ mois: item.mois, items: [item] });
    } else {
      last.items.push(item);
    }
  });

  const totalPayes = HISTORIQUE.filter((h) => h.type === "Payés").reduce(
    (sum, h) => sum + parseInt(h.montant.replace(/\D/g, "")),
    0
  );
  const enAttente = HISTORIQUE.filter((h) => h.type === "En attente").length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header img={require("@/assets/images/manHeader.png")} secondIcon={"bell-badge"} onPressProfile={() => navigation.navigate('Profile')} />

      <View style={styles.content}>
        <Text style={styles.pageTitle}>Historique</Text>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { borderLeftColor: Colors.main.blue }]}>
            <Text style={styles.summaryLabel}>Total des paiements</Text>
            <Text style={[styles.summaryValue, { color: Colors.main.blue }]}>
              {totalPayes.toLocaleString("fr-FR")} FCFA
            </Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: Colors.main.orange }]}>
            <Text style={styles.summaryLabel}>En attente</Text>
            <Text style={[styles.summaryValue, { color: Colors.main.orange }]}>
              {enAttente} paiement{enAttente > 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtreContainer}>
          {FILTRES.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filtreBtn, filtre === f && styles.filtreBtnActive]}
              onPress={() => setFiltre(f)}
            >
              <Text style={[styles.filtreText, filtre === f && styles.filtreTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {grouped.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Aucun résultat</Text>
          </View>
        ) : (
          grouped.map(({ mois, items }) => (
            <View key={mois} style={styles.group}>
              <Text style={styles.groupTitle}>{mois}</Text>
              {items.map((item) => (
                <View key={item.id} style={styles.row}>
                  <View style={[styles.iconCircle, { backgroundColor: TYPE_CONFIG[item.type]?.bg ?? Colors.main.CloudGrey }]}>
                    <Text style={{ fontSize: 16 }}>
                      {item.type === "Payés" ? "✓" : item.type === "Amendes" ? "!" : "⏳"}
                    </Text>
                  </View>
                  <View style={styles.rowInfo}>
                    <Text style={styles.rowLabel}>{item.label}</Text>
                    <Text style={styles.rowDate}>{item.date}</Text>
                  </View>
                  <View style={styles.rowRight}>
                    <Text style={[styles.rowMontant, { color: TYPE_CONFIG[item.type]?.color ?? Colors.main.dark }]}>
                      {item.montant}
                    </Text>
                    <Badge type={item.type} />
                  </View>
                </View>
              ))}
            </View>
          ))
        )}
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
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.main.dark,
    marginTop: 20,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.main.CloudGrey,
    borderRadius: 8,
    padding: 14,
    borderLeftWidth: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: Colors.main.lightGrey,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  filtreContainer: {
    marginBottom: 20,
  },
  filtreBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.main.CloudGrey,
    marginRight: 8,
  },
  filtreBtnActive: {
    backgroundColor: Colors.main.blue,
  },
  filtreText: {
    fontSize: 13,
    color: Colors.main.lightGrey,
  },
  filtreTextActive: {
    color: Colors.main.white,
    fontWeight: "600",
  },
  group: {
    marginBottom: 16,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.main.lightGrey,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  rowInfo: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 14,
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
    fontSize: 14,
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
    fontSize: 15,
  },
});