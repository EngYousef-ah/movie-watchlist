export default function Paragraph({ title }) {
    return (
        <p className="text-gray-50 text-lg tracking-wide font-sans mt-4 max-w-[500px] text-justify sm:text-xl">
            {title}
        </p>
    );
}