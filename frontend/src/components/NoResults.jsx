import { Film } from "lucide-react";

export default function NoResults() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Film color="#fff" className="mb-3 h-12 w-12 opacity-40" />
            <p className="text-lg text-white">No movies found</p>
            <p className="text-sm text-white">Try a different search term</p>
        </div>
    );
}