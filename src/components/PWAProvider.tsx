import React, { useEffect, useState } from "react";
import { NotificationService } from "../services/notificationService";

export const PWAProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializePWA = async () => {
      if ("serviceWorker" in navigator) {
        try {
          // Enregistrement du service worker
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("Service Worker enregistré avec succès:", registration);

          // Demande de permission pour les notifications
          await NotificationService.requestPermission();

          // Enregistrement pour les push notifications
          await NotificationService.registerPushNotifications();

          setIsReady(true);
        } catch (error) {
          console.error("Erreur lors de l'initialisation PWA:", error);
        }
      }
    };

    initializePWA();
  }, []);

  return <>{children}</>;
};
