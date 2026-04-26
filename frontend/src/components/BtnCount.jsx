export default function BtnCount({count,category}) {
    return (
        <button className="bg-gray-500 py-1  px-4 rounded-2xl hover:bg-[#f0503d] transtion-all duration-400">{count} {category}</button>
    )
}