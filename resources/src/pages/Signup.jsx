import { SignupCard } from "@/features/RegisterFunction";

const Home = () => {
    return (
        <>
            <div className="flex h-screen">
                <div className="w-96 m-auto">
                    <title>Login</title>
                    <SignupCard />
                </div>
            </div>
        </>
    );
};

export default Home;
