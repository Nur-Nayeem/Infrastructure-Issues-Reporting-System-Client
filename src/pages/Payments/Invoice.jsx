// src/components/Invoice/InvoiceDocument.jsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    color: "#555",
  },
  value: {
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  col1: { width: "50%" },
  col2: { width: "25%", textAlign: "right" },
  col3: { width: "25%", textAlign: "right" },
  total: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
});

const InvoiceDocument = ({ payment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Invoice</Text>
        <Text>Invoice ID: {payment.paymentId}</Text>
        <Text>Date: {new Date(payment.createdAt).toLocaleDateString()}</Text>
      </View>

      {/* Customer Info */}
      <View style={styles.section}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Billed To</Text>
        <Text>User ID: {payment.userId}</Text>
        <Text>Email: {payment.userEmail}</Text>
      </View>

      {/* Payment Info */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Type</Text>
          <Text style={styles.value}>{payment.paymentType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{payment.status}</Text>
        </View>
      </View>

      {/* Table */}
      <View>
        <View style={styles.tableHeader}>
          <Text style={styles.col1}>Description</Text>
          <Text style={styles.col2}>Qty</Text>
          <Text style={styles.col3}>Amount</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.col1}>
            {payment.paymentType === "SUBSCRIPTION"
              ? "Premium Subscription"
              : "Issue Boost"}
          </Text>
          <Text style={styles.col2}>1</Text>
          <Text style={styles.col3}>{payment.amount}</Text>
        </View>
      </View>

      {/* Total */}
      <Text style={styles.total}>Total: {payment.amount}</Text>
    </Page>
  </Document>
);

export default InvoiceDocument;
