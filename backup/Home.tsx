import React from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../store/productSlice";

const Home: React.FC = () => {
    const products = useSelector(selectProducts);
    return (
        <div className="h-screen p-16 bg-gray-100">
            <div className="gap-10 flex flex-col">
                <div className="flex flex-col gap-4">
                    <h1 className='text-7xl text-blue-800 font-bold'>AI Text2sql converter</h1>
                    <h2 className="text-xl">Type anything and turn it into SQL queries!</h2>
                </div>
                <form className="p-12 gap-4 text-lg shadow-lg rounded-xl flex flex-col bg-white">
                    <label htmlFor="text">What do you want to find?</label>
                    <textarea rows={4} className="p-2 border border-gray-400 resize-none" />
                </form>

                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>

                    </tr>
                    {
                        products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.stock_quantity}</td>
                        </tr>
                    ))
                    }

                </table>
            </div>
        </div>
    )
}

export default Home;