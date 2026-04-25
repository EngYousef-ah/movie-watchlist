export default function BtnHeader({ title }) {
    return (
        <button className="p-2 text-sm text-gray-200 rounded bg-[#f0503d] 
                hover:bg-[#c23222] hover:text-[#fff] transition-all duration-300">
            {title}
        </button>
    );
}