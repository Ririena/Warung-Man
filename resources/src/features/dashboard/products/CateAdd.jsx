import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CateAddPage = () => {
    return (
        <>
            <div className="p-8">
                <h1 className="text-3xl font-bold">Tambah Kategori</h1>
                <div className="flex mt-5 gap-4">
                    <Input className="w-1/2" placeholder="Masukkan Nama Kategori"/>
                    <Button>Submit</Button>
                </div>
            </div>
        </>
    );
};
export default CateAddPage;
