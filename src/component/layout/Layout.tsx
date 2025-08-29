import { Outlet } from "react-router";
import React, { useEffect, useState } from "react";
import { Box, ActionIcon, Container } from "@mantine/core";
import { IconChevronUp } from "@tabler/icons-react";
import Header from "../includes/Header";
import Footer from "../includes/Footer";

const Sidebar = React.lazy(() => import("../includes/Sidebar"));

export const Layout = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleCollapse = () => {
    if (window.innerWidth >= 1024) {
      setCollapse(!collapse);
    } else {
      setMobileMenuOpen(!mobileMenuOpen);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    let startX = 0;
    let isDragging = false;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      if (diff > 0 && diff < 300) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (diff > 50) {
        setMobileMenuOpen(false);
      }
      isDragging = false;
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [mobileMenuOpen]);

  const demoProps = {
    padding: "md",
    margin: "md",
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <Box className={`hidden lg:block absolute left-0 top-0 h-full z-30 transition-all duration-300 ease-in-out ${collapse ? "w-16" : "w-72"}`}>
        <Box className="h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/60 shadow-2xl shadow-indigo-500/10 dark:shadow-slate-900/50">
          <Sidebar handleCollapse={handleCollapse} collapse={collapse} />
        </Box>
      </Box>
      <Box
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <Box
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300 ${mobileMenuOpen ? "backdrop-blur-md" : "backdrop-blur-none"
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <Box
          className={`absolute left-0 top-0 h-full w-100 max-w-[85vw] bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl transition-all duration-300 ease-out shadow-2xl border-r border-slate-200/50 dark:border-slate-700/50 ${mobileMenuOpen ? "translate-x-0 scale-100" : "-translate-x-full scale-95"
            }`}
          style={{
            transitionTimingFunction: mobileMenuOpen
              ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Sidebar handleCollapse={() => setMobileMenuOpen(false)} collapse={false} />
        </Box>
      </Box>
      <Box className={`transition-all duration-300 ease-in-out ${collapse ? "lg:ml-16" : "lg:ml-72"} min-h-screen flex flex-col relative z-10`}>
        <Box component="header"
          className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm shadow-indigo-500/5"
        >
          <Header handleCollapse={handleCollapse} collapse={collapse} />
        </Box>
        <Box component="main" className="flex-1 relative z-10 min-h-[calc(100vh-200px)]">
          <Container {...demoProps} fluid className="mb-6">
            <Outlet />
          </Container>
        </Box>
        <Box component="footer" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 mt-auto">
          <Box className="px-4 sm:px-6 lg:px-8 py-6">
            <Footer />
          </Box>
        </Box>
      </Box>
      <ActionIcon
        className="fixed bottom-6 right-6 z-30 opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
        size="xl"
        radius="xl"
        variant="gradient"
        gradient={{ from: 'blue', to: 'indigo' }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <IconChevronUp size={20} />
      </ActionIcon>
    </Box>
  );
};
