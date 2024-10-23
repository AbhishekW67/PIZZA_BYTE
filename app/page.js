"use client"
import OrderNow from "@/components/user/OrderNow";
import Carousel from "@/components/user/Carousel";
import Menu from "@/components/user/Menu";
import Navbar from "@/components/user/Navbar";
import { CartProvider } from "@/lib/CartContext";
import Video from "@/components/user/Video";
import Faq from "@/components/user/Faq";

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <Carousel />
      <Menu />
      <OrderNow id="order"/>
      <Video />
      <Faq id="faq"/>
    </CartProvider>
  );
}
