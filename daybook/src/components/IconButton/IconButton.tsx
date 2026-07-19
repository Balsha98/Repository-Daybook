import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    active?: boolean;
};

export function IconButton({ children, active = false, className = "", ...rest }: IconButtonPropsType) {
    const activeClasses = active ? "text-accent border-accent" : "border-hairline hover:text-accent hover:border-accent";

    return (
        <button
            type="button"
            className={`flex items-center justify-center w-9 h-9 border rounded-full transition-colors cursor-pointer ${className} ${activeClasses}`}
            {...rest}
        >
            {children}
        </button>
    );
}
