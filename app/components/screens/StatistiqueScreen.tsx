import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Rect, Text as SvgText, Line } from "react-native-svg";
import { Colors } from "@/app/constants/colors";
import { Header } from "../widgets/Header";
import { useNavigation } from "@react-navigation/native";

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

const DATA_ANNEE = [12000, 8000, 15000, 10000, 18000, 14000, 20000, 16000, 22000, 19000, 25000, 21000];
const DATA_MOIS = [4000, 0, 8000, 0, 4000, 0, 4000, 0, 4000, 0, 8000, 0, 4000, 0, 4000];

const PERIODES = ["Mois", "Année"];

const CHART_WIDTH = 340;
const CHART_HEIGHT = 160;
const BAR_MARGIN = 4;

function BarChart({ data, labels, color }: { data: number[]; labels: string[]; color: string }) {
  const maxVal = Math.max(...data, 1);
  const barWidth = (CHART_WIDTH - BAR_MARGIN * (data.length + 1)) / data.length;

  return (
    <Svg width={CHART_WIDTH} height={CHART_HEIGHT + 24}>
      <Line x1={0} y1={CHART_HEIGHT} x2={CHART_WIDTH} y2={CHART_HEIGHT} stroke={Colors.main.lightGrey} strokeWidth={1} />
      {data.map((val, i) => {
        const barH = (val / maxVal) * (CHART_HEIGHT - 10);
        const x = BAR_MARGIN + i * (barWidth + BAR_MARGIN);
        const y = CHART_HEIGHT - barH;
        return (
          <React.Fragment key={i}>
            <Rect x={x} y={y} width={barWidth} height={barH} fill={color} rx={3} />
            {barWidth > 18 && (
              <SvgText
                x={x + barWidth / 2}
                y={CHART_HEIGHT + 16}
                fontSize={9}
                fill={Colors.main.lightGrey}
                textAnchor="middle"
              >
                {labels[i]}
              </SvgText>
            )}
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

function StatCard({ label, value, color, sub }: { label: string; value: string; color: string; sub?: string }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {sub ? <Text style={styles.statSub}>{sub}</Text> : null}
    </View>
  );
}

export function StatistiqueScreen() {
  const navigation = useNavigation<any>();
  const [periode, setPeriode] = useState("Année");

  const data = periode === "Année" ? DATA_ANNEE : DATA_MOIS;
  const labels = periode === "Année" ? MONTHS : Array.from({ length: DATA_MOIS.length }, (_, i) => `S${i + 1}`);

  const total = DATA_ANNEE.reduce((a, b) => a + b, 0);
  const totalMois = DATA_ANNEE[new Date().getMonth()];
  const nbPaiements = 14;
  const enAttente = 12000;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header img={require("@/assets/images/manHeader.png")} secondIcon={"bell-badge"} onPressProfile={() => navigation.navigate('Profile')} />

      <View style={styles.content}>
        <Text style={styles.pageTitle}>Statistiques</Text>

        <View style={styles.cardRow}>
          <StatCard label="Total annuel" value={`${total.toLocaleString("fr-FR")} FCFA`} color={Colors.main.blue} />
          <StatCard label="Ce mois" value={`${totalMois.toLocaleString("fr-FR")} FCFA`} color={Colors.main.green} />
        </View>

        <View style={styles.cardRow}>
          <StatCard label="Paiements effectués" value={`${nbPaiements}`} color={Colors.main.orange} sub="cette année" />
          <StatCard label="En attente" value={`${enAttente.toLocaleString("fr-FR")} FCFA`} color={Colors.main.red} sub="1 paiement" />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Évolution des paiements</Text>
            <View style={styles.toggle}>
              {PERIODES.map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[styles.toggleBtn, periode === p && styles.toggleBtnActive]}
                  onPress={() => setPeriode(p)}
                >
                  <Text style={[styles.toggleText, periode === p && styles.toggleTextActive]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.chartContainer}>
            <BarChart data={data} labels={labels} color={Colors.main.blue} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Répartition par type</Text>
          <View style={styles.repartition}>
            <RepartitionRow label="Cotisations" percent={65} color={Colors.main.blue} />
            <RepartitionRow label="Amendes" percent={20} color={Colors.main.orange} />
            <RepartitionRow label="Autres" percent={15} color={Colors.main.green} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Derniers paiements</Text>
          {DERNIERS_PAIEMENTS.map((p, i) => (
            <View key={i} style={styles.paiementRow}>
              <View>
                <Text style={styles.paiementLabel}>{p.label}</Text>
                <Text style={styles.paiementDate}>{p.date}</Text>
              </View>
              <Text style={[styles.paiementMontant, { color: p.color }]}>{p.montant}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function RepartitionRow({ label, percent, color }: { label: string; percent: number; color: string }) {
  return (
    <View style={styles.repartitionRow}>
      <Text style={styles.repartitionLabel}>{label}</Text>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percent}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.repartitionPercent, { color }]}>{percent}%</Text>
    </View>
  );
}

const DERNIERS_PAIEMENTS = [
  { label: "Cotisation Mensuelle", date: "15 Feb 2026", montant: "4 000 FCFA", color: Colors.main.green },
  { label: "Amende retard", date: "10 Feb 2026", montant: "-2 000 FCFA", color: Colors.main.red },
  { label: "Cotisation Mensuelle", date: "15 Jan 2026", montant: "4 000 FCFA", color: Colors.main.green },
  { label: "Cotisation Spéciale", date: "05 Jan 2026", montant: "8 000 FCFA", color: Colors.main.orange },
];

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
  cardRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.main.CloudGrey,
    borderRadius: 8,
    padding: 14,
    borderLeftWidth: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.main.lightGrey,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 15,
    fontWeight: "bold",
  },
  statSub: {
    fontSize: 10,
    color: Colors.main.lightGrey,
    marginTop: 2,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.main.dark,
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: Colors.main.CloudGrey,
    borderRadius: 20,
    padding: 2,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 18,
  },
  toggleBtnActive: {
    backgroundColor: Colors.main.blue,
  },
  toggleText: {
    fontSize: 12,
    color: Colors.main.lightGrey,
  },
  toggleTextActive: {
    color: Colors.main.white,
    fontWeight: "600",
  },
  chartContainer: {
    alignItems: "center",
    backgroundColor: Colors.main.CloudGrey,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  repartition: {
    gap: 12,
  },
  repartitionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  repartitionLabel: {
    width: 90,
    fontSize: 13,
    color: Colors.main.dark,
  },
  barBg: {
    flex: 1,
    height: 10,
    backgroundColor: Colors.main.CloudGrey,
    borderRadius: 5,
    overflow: "hidden",
  },
  barFill: {
    height: 10,
    borderRadius: 5,
  },
  repartitionPercent: {
    width: 36,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
  },
  paiementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.main.CloudGrey,
  },
  paiementLabel: {
    fontSize: 13,
    color: Colors.main.dark,
    fontWeight: "500",
  },
  paiementDate: {
    fontSize: 11,
    color: Colors.main.lightGrey,
    marginTop: 2,
  },
  paiementMontant: {
    fontSize: 14,
    fontWeight: "bold",
  },
});