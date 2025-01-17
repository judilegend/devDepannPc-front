import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const useInstallPWA = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log("PWA install prompt detected");
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      console.log("PWA was installed");
      setIsInstallable(false);
      setInstallPrompt(null);
    };

    const checkStandalone = () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      if (isStandalone) {
        console.log("PWA is running in standalone mode");
        setIsInstallable(false);
      }
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as any
    );
    window.addEventListener("appinstalled", handleAppInstalled);
    checkStandalone();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as any
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;

      if (choice.outcome === "accepted") {
        console.log("PWA installation accepted");
        setIsInstallable(false);
      } else {
        console.log("PWA installation dismissed");
      }
    } catch (error) {
      console.error("PWA installation error:", error);
    } finally {
      setInstallPrompt(null);
    }
  };

  return { isInstallable, installApp };
};
