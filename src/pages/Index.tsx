// src/pages/Index.tsx or src/components/Layout/Layout.tsx
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar.tsx";
import BottomNav from "@/components/common/BottomNav.tsx";
import { Outlet } from "react-router-dom";

const Index = () => {
    return(
        <div className="min-h-screen bg-background text-on-background font-['Inter']">
            <Navbar/>
            <main className="pt-14 sm:pt-16 md:pt-20">
                <Outlet/>
            </main>
            <BottomNav/>
            <Footer/>
        </div>
    )
}

export default Index;
