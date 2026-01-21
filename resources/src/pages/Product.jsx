import { Card, CardTitle } from "@/components/ui/card";

const Product = () => {
    return (
        <>
            <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 md:py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <aside
                        className="md:w-64 md:shrink-0"
                        aria-label="Filters"
                    >

                        {/* Filter Components */}
                    </aside>
                    <section
                        className="flex-1"
                        aria-label="Product list"
                    ></section>
                </div>
            </main>
        </>
    );
};

export default Product;
