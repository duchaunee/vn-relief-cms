"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ClipboardType,
  Component,
  FileType,
  Fingerprint,
  Gauge,
  Gem,
  MessageSquareText,
  Minus,
  PanelLeftDashed,
  Phone,
  PieChart,
  RectangleEllipsis,
  Rocket,
  ScrollText,
  Settings,
  Sheet,
  SquareKanban,
  TableProperties,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import NavLink from "@/admin/components/nav-link";
import RoleBadge from "@/components/badge-custom/badge-role";
import { getCurrentUser, isAuthenticatedByRole } from "@/lib/axios";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathName = usePathname();
  const user = getCurrentUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.marginLeft = isSidebarOpen ? "260px" : "60px"; // Adjust this value as needed
    }
  };

  const toggleSidebarResponsive = () => {
    document.getElementById("sidebar")?.classList.remove("open");
    document.getElementById("overlay")?.classList.toggle("open");
  };

  useEffect(() => {
    if (document?.getElementById("overlay")?.classList?.contains("open")) {
      toggleSidebarResponsive();
    }
  }, [pathName]);

  return (
    <>
      <div
        id="overlay"
        className="fixed inset-0 z-30 hidden bg-black/50"
        onClick={toggleSidebarResponsive}
      ></div>
      <Card
        id="sidebar"
        className={`sidebar fixed -left-[260px] top-0 z-40 flex h-screen w-[260px] flex-col rounded-none transition-all duration-300 lg:left-0 lg:top-16 lg:h-[calc(100vh_-_64px)] ${
          isSidebarOpen ? "closed" : ""
        }`}
      >
        <button
          type="button"
          onClick={toggleSidebar}
          className="absolute -right-2.5 -top-3.5 hidden size-6 place-content-center rounded-full border border-gray-300 bg-white text-black lg:grid"
        >
          <ChevronDown
            className={`h-4 w-4 rotate-90 ${isSidebarOpen ? "hidden" : ""}`}
          />
          <ChevronDown
            className={`hidden h-4 w-4 -rotate-90 ${
              isSidebarOpen ? "!block" : ""
            }`}
          />
        </button>
        <div className="flex items-start justify-between border-b border-gray-300 px-4 py-5 lg:hidden">
          <Link href="/">
            <Image
              src={"/logo/logo-header.png"}
              alt="logo-relief"
              width={140}
              height={140}
              className="rounded-md mt-[6px]"
            ></Image>
          </Link>
          <button type="button" onClick={toggleSidebarResponsive}>
            <X className="-mr-2 -mt-2 ml-auto size-4 hover:text-black" />
          </button>
        </div>
        <Accordion
          type="multiple"
          collapsible
          className="sidemenu grow overflow-y-auto overflow-x-hidden px-2.5 pb-10 pt-2.5 transition-all"
          key={pathName}
        >
          {isAuthenticatedByRole("admin") ? (
            <>
              <NavLink
                href="/quan-ly/tai-khoan"
                className={`nav-link ${pathName === "/chat" && "!text-black"}`}
                isProfessionalPlanRoute={true}
              >
                <MessageSquareText className="size-[18px] shrink-0" />
                <span>Quản lý tài khoản</span>
              </NavLink>

              <NavLink
                href="/scrumboard"
                target="_blank"
                isProfessionalPlanRoute={true}
                className={`nav-link ${
                  pathName === "/scrumboard" && "!text-black"
                }`}
              >
                <SquareKanban className="size-[18px] shrink-0" />
                <span>Quản lý đợt thiên tai</span>
              </NavLink>
            </>
          ) : (
            <>
              <AccordionItem value="item-2" className="p-0 shadow-none">
                <AccordionTrigger
                  defaultValue={
                    ["/blog-list", "/blog-details", "/add-blog"].includes(
                      pathName
                    )
                      ? "item-2"
                      : ""
                  }
                  className="nav-link"
                >
                  <SquareKanban className="size-[18px] shrink-0 -rotate-90" />
                  <span>Quản lý đơn cứu trợ</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="submenu space-y-2 pl-12 pr-5">
                    <li>
                      <NavLink
                        href="/cuu-tro-khan-cap"
                        target="_blank"
                        isAccordion={true}
                        isProfessionalPlanRoute={true}
                      >
                        Đơn cứu trợ khẩn cấp
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        href="/blog-details"
                        target="_blank"
                        isAccordion={true}
                        isProfessionalPlanRoute={true}
                      >
                        Đơn xin hỗ trợ
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        href="/add-blog"
                        target="_blank"
                        isAccordion={true}
                        isProfessionalPlanRoute={true}
                      >
                        Add New Blog
                      </NavLink>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="p-0 shadow-none">
                <AccordionTrigger className="nav-link">
                  <ScrollText className="size-[18px] shrink-0" />
                  <span>Quản lý đội cứu trợ</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="submenu space-y-2 pl-12 pr-5">
                    <li>
                      <NavLink
                        href="/invoice"
                        target="_blank"
                        isAccordion={true}
                        isProfessionalPlanRoute={true}
                      >
                        Invoice
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        href="/invoice-details"
                        target="_blank"
                        isAccordion={true}
                        isProfessionalPlanRoute={true}
                      >
                        Invoice details
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        href="/create-invoice"
                        target="_blank"
                        isAccordion={true}
                        isProfessionalPlanRoute={true}
                      >
                        Create Invoice
                      </NavLink>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </>
          )}
        </Accordion>
      </Card>
    </>
  );
};

export default Sidebar;
