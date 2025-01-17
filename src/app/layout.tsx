"use client";
import localFont from "next/font/local";
import "./globals.css";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import "@/styles/loading-spinner.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { TaskProvider } from "@/contexts/TaskContext";
import { WorkPackageProvider } from "@/contexts/WorkpackageContext";
import { ActivityProvider } from "@/contexts/ActivityContext";
import { CurrentProjectProvider } from "@/contexts/CurrentProjectContext";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { PWAProvider } from "../components/PWAProvider";
import InstallPWA from "../components/InstallPWA";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        await audioContext.resume();
        setAudioEnabled(true);

        const sounds = [
          "/sounds/notification.wav",
          "/sounds/success.wav",
          "/sounds/review.wav",
        ];

        sounds.forEach((sound) => {
          const audio = new Audio(sound);
          audio.volume = 1.0;
          audio.muted = false;
          audio.load();
        });
      } catch (error) {
        console.log("Audio initialization failed:", error);
      }
    };

    const handleUserInteraction = () => {
      if (!audioEnabled) {
        initializeAudio();
      }
    };

    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) =>
      document.addEventListener(event, handleUserInteraction, { once: true })
    );

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleUserInteraction)
      );
    };
  }, [audioEnabled]);

  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MonApp" />
        <meta
          name="description"
          content="Une application Next.js PWA installable via un navigateur"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="msapplication-TileImage"
          content="/icons/icon-144x144.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <LoadingSpinner />
        {/* <div className="fixed bottom-4 right-4 z-50 "> */}
        {/* Ajoutez ce conteneur */}
        <InstallPWA />
        {/* </div> */}
        <AuthProvider>
          <UserProvider>
            <CurrentProjectProvider>
              <ProjectProvider>
                <WorkPackageProvider>
                  <ActivityProvider>
                    <TaskProvider>
                      <Toaster position="top-right" />
                      {/* <PWAProvider> */}
                      {children}
                      {/* </PWAProvider> */}
                    </TaskProvider>
                  </ActivityProvider>
                </WorkPackageProvider>
              </ProjectProvider>
            </CurrentProjectProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
