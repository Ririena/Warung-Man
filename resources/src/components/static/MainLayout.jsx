import { Navbar } from "./Navbar";
import Logo from "@/assets/logo-warung-man-500x-with-text-white.png";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { MessageCircle, Phone } from "lucide-react";
import Iframe from "react-iframe";

const MainLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <footer className="bg-green-500 p-10 mt-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between">
                    <div className="grid grid-cols-1 gap-6 w-1/4">
                        <img src={Logo} className="w-40" />
                        <p className="text-white">
                            Menyediakan informasi lengkap seputar kebutuhan
                            sehari-hari yang tersedia di warung kelontong kami.
                            Mulai dari sembako, jajanan, hingga kebutuhan rumah
                            tangga, semua disajikan dengan mudah agar pelanggan
                            bisa berbelanja lebih praktis.{" "}
                        </p>
                        <div className="text-white flex gap-4">
                            <Instagram />
                            <Facebook />
                            <MessageCircle />
                            <Phone />
                        </div>
                    </div>
                    <div className="w-1/2 text-white flex justify-between">
                        <div className="grid grid-cols-1 gap-6 text-white">
                            <h1>
                                Perumahan Tatar, Blok A3No..42, Pakutandang,
                                Kec. Ciparay, Kabupaten Bandung, Jawa Barat
                                40381
                            </h1>
                            <Iframe
                                url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11199.815645342987!2d107.71160126616898!3d-7.040656351899056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c054bfd09ae5%3A0x89fb9500e46c4dc3!2sPerumahan%20Tatar%20Pakutandang!5e0!3m2!1sid!2sid!4v1769500188183!5m2!1sid!2sid"
                                width="350"
                                height="200"
                                style="border:0;"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                            ></Iframe>
                        </div>
                        <div className="grid grid-cols-1 gap-1 text-white text-xl w-1/3">
                        <h1 className="font-semibold text-2xl">Pagination</h1>
                            <h1>Product</h1>
                            <h1>Product</h1>
                            <h1>Product</h1>
                            <h1>Product</h1>

                        </div>
                    </div>
                </div>
            </footer>
            <div className="bg-white flex justify-center text-sm py-1">
                © Copyright 2026 Duivion
            </div>
        </div>
    );
};

export default MainLayout;
