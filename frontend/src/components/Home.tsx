import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, type Product } from "../store/productSlice";

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.products.products);
    const [generatedSql, setGeneratedSql] = useState("");
    const [aiResultData, setAiResultData] = useState<any[] | null>(null);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [prompt, setPrompt] = useState('')

    const handleAiSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsAiLoading(true);
        setGeneratedSql("");
        setAiResultData(null);

        try {
            const response = await axios.post("http://localhost:3000/ai/ask", {
                prompt: prompt
            });
            setGeneratedSql(response.data.queryGenerated);
            setAiResultData(response.data.data);

        } catch (error) {
            console.error("AI Error:", error);
            setGeneratedSql("Error generating SQL. Check console.");
        } finally {
            setIsAiLoading(false);
        }
    };

    useEffect(() => {
        dispatch(fetchProducts() as any);
    }, [dispatch]);

    console.log("Current Redux Products:", products);

    const dataToDisplay = aiResultData !== null ? aiResultData : products
    return (
        <div className="p-16">
            <div className="gap-10 flex flex-col">
                <div className="flex flex-col gap-4">
                    <h1 className='text-7xl text-blue-800 font-bold'>AI Text2sql converter</h1>
                    <h2 className="text-xl">Type anything and turn it into SQL queries!</h2>
                </div>
                <form className="p-12 gap-4 text-lg shadow-lg rounded-xl flex flex-col bg-white"
                    onSubmit={handleAiSubmit}>
                    <label htmlFor="text">What do you want to find?</label>
                    <textarea rows={4} value={prompt} className="p-2 border border-gray-400 resize-none"
                        onChange={(e) => setPrompt(e.target.value)} />
                    <button type="submit" className="p-2 bg-blue-800 text-white rounded-full hover:scale-90
                    transition-all duration-500 shadow-lg hover:shadow-xl">Execute and give me Queries!</button>
                    {isAiLoading ? "Generating..." : null}
                    {generatedSql && (
                        <div className="p-6 bg-gray-800 text-green-400 font-mono rounded-xl shadow-lg mt-4">
                            <h3 className="text-white text-sm mb-2">Generated SQL:</h3>
                            <p>{generatedSql}</p>
                        </div>
                    )}
                </form>

                <table className="border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 px-4 py-2">ID</th>
                            <th className="border border-slate-600 px-4 py-2">Name</th>
                            <th className="border border-slate-600 px-4 py-2">Category</th>
                            <th className="border border-slate-600 px-4 py-2">Price</th>
                            <th className="border border-slate-600 px-4 py-2">Stock</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataToDisplay.map((product: Product) => (
                                <tr key={product.id}>
                                    <td className="border border-slate-600 px-4 py-2">{product.id}</td>
                                    <td className="border border-slate-600 px-4 py-2">{product.name}</td>
                                    <td className="border border-slate-600 px-4 py-2">{product.category}</td>
                                    <td className="border border-slate-600 px-4 py-2">{product.price}</td>
                                    <td className="border border-slate-600 px-4 py-2">{product.stock_quantity}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Home;