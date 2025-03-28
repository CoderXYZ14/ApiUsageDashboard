"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { PDFReport } from "./PDFReport";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { BrandData } from "@/types/brand";

const PDFDownloadButton = ({
  brandData,
  session,
}: {
  brandData: BrandData;
  session: any;
}) => {
  return (
    <PDFDownloadLink
      document={
        <PDFReport
          brandData={brandData}
          userName={session?.user?.name || "Brand"}
        />
      }
      fileName={`${session?.user?.name || "Brand"}-api-report-${
        new Date().toISOString().split("T")[0]
      }.pdf`}
    >
      {({ loading }) => (
        <Button
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none"
        >
          <Download className="mr-2 h-4 w-4" />
          {loading ? "Preparing..." : "Export Data"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default PDFDownloadButton;
