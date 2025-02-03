"use client";

import AppSidebar from "@/components/AppSidebar";
import ChaptersSidebar from "@/components/courses/[courseId]/ChaptersSidebar";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  const isCoursePage =
    /^\/(user|teacher)\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(pathname);

  useEffect(() => {
    console.log("Pathname:", pathname); // Debugging output

    if (isCoursePage) {
      const match = pathname.match(/\/(user|teacher)\/courses\/([^\/]+)/);
      console.log("Matched Course ID:", match?.[2]); // Debugging output
      setCourseId(match ? match[2] : null);
    } else {
      setCourseId(null);
    }
  }, [isCoursePage, pathname]);

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSidebar />
        <div className="dashboard__content">
          {courseId && <ChaptersSidebar/>}
          <div
            className={cn(
              "dashboard__main",
              isCoursePage && "dashboard__main--not-course"
            )}
            style={{ height: "100vh" }}
          >
            <Navbar isCoursePage={isCoursePage} />
            <main className="dashboard__body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
