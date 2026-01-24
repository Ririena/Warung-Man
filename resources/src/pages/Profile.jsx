import ProfileSidebar from "@/components/dynamic/profile-sidebar";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { UserStore } from "@/context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useContext(UserStore);
    const navigate = useNavigate();

    console.log(user);
    return (
        <Container>
            <div className="flex flex-col md:flex-row gap-6">
                <aside className="md:w-[250px] md:shrink-0">
                    <ProfileSidebar />
                </aside>

                <section className="flex-1">
                    <Card className="rounded-sm p-4">
                        <h1 className="text-2xl text-foreground">
                            Profil Saya
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola informasi profil Anda untuk mengontrol,
                            melindungi dan mengamankan akun
                        </p>
                        <Separator className="mt-3 mb-4" />

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-muted-foreground">
                                    Nama
                                </label>
                                <p className="font-medium">
                                    {user?.user?.name}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm text-muted-foreground">
                                    Email
                                </label>
                                <p className="font-medium">
                                    {" "}
                                    {user?.user?.email ? user?.user?.email : "Loading"}
                                </p>
                            </div>
                        </div>
                    </Card>
                </section>
            </div>
        </Container>
    );
};

export default Profile;
