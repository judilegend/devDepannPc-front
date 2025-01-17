import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPWA: React.FC = () => {
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const evt = e as BeforeInstallPromptEvent;
      evt.preventDefault();
      setPromptInstall(evt);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      toast.success("Application installée avec succès!");
      console.log("PWA installée avec succès");
    };

    const checkInstalled = () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      setIsInstalled(isStandalone);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", handleAppInstalled);
    checkInstalled();

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!promptInstall) {
      toast.error("L'installation n'est pas disponible actuellement");
      return;
    }

    try {
      await promptInstall.prompt();
      const choiceResult = await promptInstall.userChoice;

      if (choiceResult.outcome === "accepted") {
        toast.success("Installation en cours...");
        setPromptInstall(null);
      } else {
        toast.error("Installation annulée");
      }
    } catch (error) {
      console.error("Erreur d'installation:", error);
      toast.error("Une erreur est survenue lors de l'installation");
    }
  };

  if (isInstalled) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-4 right-4 flex items-center gap-2  text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors z-50"
    >
      {/* <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg> */}
      {/* Installer l'application */}
    </button>
  );
};

export default InstallPWA;
