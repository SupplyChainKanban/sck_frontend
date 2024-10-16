import Link from "next/link";

interface Props {
    to: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}


export const SideBarMenuItem = ({ to, icon, title, description }: Props) => {
    return (
        <Link
            href={to}
        >
            <div className="flex justify-center items-center gap-4 my-2">

                {
                    icon
                }
                <div className="flex flex-col flex-grow">
                    <span className="text-white text-lg font-semibold">
                        {title}
                    </span>
                    <span className="text-gray-400 text-sm">
                        {description}
                    </span>
                </div>
            </div>
        </Link>
    )
}
