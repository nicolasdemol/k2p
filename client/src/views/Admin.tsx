import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraphCA } from "@/components/admin/graph-ca";
import { ActiveUsers } from "@/components/admin/active-users";
import { api } from "@/services/api";
import { getYear } from "date-fns";
import { CreateAccount } from "@/components/admin/create-account";
import { UpdateAssocs } from "@/components/admin/update-assocs";
import { UpdateConfig } from "@/components/admin/update-config";

interface CA {
  amount: number;
  period: Date;
  unit: string;
}

interface Productivity {
  amount: number;
  period: Date;
  unit: string;
}

export default function AdminPage() {
  const [CA, setCA] = React.useState<CA[]>([]);
  const [productivity, setProductivity] = React.useState<Productivity[]>([]);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      await api.getCA("2023-01-01", "2023-12-31").then((res) => {
        setCA(res.ca);
      });
      await api.getProductivity("2023-01-01", "2023-12-31").then((res) => {
        setProductivity(res.productivity);
      });
    };
    fetchMetrics();
  }, []);

  const totalCA = CA.reduce((sum, entry) => sum + entry.amount, 0);

  const previousMonthProductivity =
    productivity[productivity.length - 2]?.amount || 0; // Productivity from the previous month
  const currentMonthProductivity =
    productivity[productivity.length - 1]?.amount || 0; // Productivity from the current month

  const productivityDifference =
    currentMonthProductivity - previousMonthProductivity;
  const productivityPercentageChange =
    (productivityDifference / previousMonthProductivity) * 100;

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className=" space-y-4 px-8 pt-6">
          <Tabs defaultValue="configs" className="space-y-4">
            <TabsList>
              <TabsTrigger value="configs">Configurations</TabsTrigger>
              <TabsTrigger value="overview">Statistiques</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Chiffre d'affaire ({getYear(Date.now())})
                    </CardTitle>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalCA.toLocaleString("fr-FR", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      €
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(totalCA / CA.length).toLocaleString("fr-FR", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      € / Semaine
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Productivité atelier (cette semaine)
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {productivity &&
                        productivity[
                          productivity.length - 1
                        ]?.amount.toLocaleString("fr-FR", {
                          maximumFractionDigits: 2,
                        })}{" "}
                      € / h
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {productivityPercentageChange.toFixed(2)}% de la semaine
                      dernière
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Ventes
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Couverture Oldham
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Chiffre d'affaire (semaine)</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <GraphCA />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="configs">
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-9">
                <div className="col-span-3">
                  <CreateAccount />
                </div>

                <div className="col-span-3">
                  <ActiveUsers />
                </div>
                <div className="grid col-span-3 gap-4">
                  <UpdateAssocs />
                  <UpdateConfig />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
