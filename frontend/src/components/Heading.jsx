export default function Heading({ mainText, category }) {
    return (
        <h1 className="text-gray-200 text-3xl tracking-wider sm:text-5xl">{mainText} <span
            className="bg-gradient-to-r from-red-300 to-[#d93f2d] bg-clip-text text-transparent">{category}</span></h1>
    );
}