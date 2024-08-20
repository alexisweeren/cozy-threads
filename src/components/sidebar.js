'use client'
import { ColorContext } from "@/context/colorContext";
import { useContext } from "react";

export default function Sidebar() {
    const colors = ['red', 'blue', 'black', 'green', 'orange', 'purple', 'gray'];

    const { selectedColor, setSelectedColor } = useContext(ColorContext);

    console.log(selectedColor);

    return (
        <div className="w-full text-black bg-gray-200 min-h-full p-4">
            <div className="font-bold">Customization</div>
            <div className="mb-4">
                <div>Discount Code Banner</div>
                <div className="flex space-x-3">
                    {colors.map((color) => (
                        <div
                            key={color}
                            style={{ backgroundColor: color, width: 20, height: 20, cursor: 'pointer' }}
                            onClick={() => setSelectedColor(color)}
                        >
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
