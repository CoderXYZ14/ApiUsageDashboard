import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface PDFReportProps {
  brandData: any;
  userName: string;
}

export const PDFReport = ({ brandData, userName }: PDFReportProps) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 20,
    },
    section: {
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>API Usage Report</Text>
        <View style={styles.section}>
          <Text style={styles.text}>Generated for: {userName}</Text>
          <Text style={styles.text}>
            Total API Calls: {brandData.totalCalls}
          </Text>
          <Text style={styles.text}>
            Successful Calls: {brandData.successfulCalls}
          </Text>
          <Text style={styles.text}>Failed Calls: {brandData.failedCalls}</Text>
          <Text style={styles.text}>Error Rate: {brandData.errorRate}%</Text>
        </View>
      </Page>
    </Document>
  );
};
