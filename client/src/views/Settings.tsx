import SettingsLayout from "@/components/settings/layout";
import SettingsAccountPage from "./settings/account";
import { useLocation } from "react-router-dom";
import SettingsProfilePage from "./settings/profile";
import SettingsAppearancePage from "./settings/appearance";
import SettingsNotificationsPage from "./settings/notifications";
import SettingsDisplayPage from "./settings/display";

export default function SettingsPage() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <SettingsLayout>
      {pathname === "/settings" && <SettingsProfilePage />}
      {pathname === "/settings/account" && <SettingsAccountPage />}
      {pathname === "/settings/appearance" && <SettingsAppearancePage />}
      {pathname === "/settings/notifications" && <SettingsNotificationsPage />}
      {pathname === "/settings/display" && <SettingsDisplayPage />}
    </SettingsLayout>
  );
}
