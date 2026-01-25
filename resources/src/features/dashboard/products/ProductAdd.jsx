import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/lib/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductAdd = () => {
    const { data, loading, error, fetchData } = useFetch("/api/kategoris");

    const [form, setForm] = useState({
        title: "",
        description: "",
        id_kategori: "",
        price: "",
        stock: "",
        image: null,
    });

    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const kategoris = data?.data || [];

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm({
            ...form,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors(null);
        setMessage(null);

        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            if (form[key] !== null && form[key] !== "") {
                formData.append(key, form[key]);
            }
        });

        try {
            const res = await axios.post("/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage(res.data.message);

            // reset
            setForm({
                title: "",
                description: "",
                id_kategori: "",
                price: "",
                stock: "",
                image: null,
            });
        } catch (err) {
            setErrors(err.response?.data?.errors || err.response?.data?.msg);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading categories.</p>;

    return (
        <div className="p-8 space-y-6">
            <Card className="p-4 w-full rounded-md">
                <h1 className="text-xl font-semibold mb-4">
                    Add Product Form
                </h1>

                {/* SUCCESS */}
                {message && (
                    <div className="mb-4 text-green-600">{message}</div>
                )}

                {/* ERROR */}
                {errors && (
                    <div className="mb-4 text-red-600 text-sm">
                        {Object.values(errors).flat().map((err, i) => (
                            <p key={i}>{err}</p>
                        ))}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >
                    <Input
                        name="title"
                        placeholder="Product Name"
                        value={form.title}
                        onChange={handleChange}
                    />

                    <Select
                        value={form.id_kategori}
                        onValueChange={(value) =>
                            setForm({ ...form, id_kategori: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {kategoris.map((k) => (
                                <SelectItem
                                    key={k.id}
                                    value={String(k.id)}
                                >
                                    {k.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                    />

                    <Input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                    />

                    <Input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="col-span-2"
                    />

                    <Textarea
                        name="description"
                        placeholder="Product Description"
                        className="col-span-2"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        className="col-span-2"
                        disabled={submitting}
                    >
                        {submitting ? "Uploading..." : "Save Product"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ProductAdd;
