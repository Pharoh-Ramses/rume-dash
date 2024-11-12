import Link from 'next/link';
import { cn } from '@kit/ui/utils';
import Image from 'next/image';

function LogoText({ className }: { className?: string }) {
    return (
        <div className="flex items-center gap-2">
        <Image
            src="/images/jetset-logo-v2-nosquare.svg"
            width={50}
            height={50}
            alt="Jetset Logo"
        />
        <span className={cn("text-xl md:text-2xl font-bold tracking-tight", className)}>
            <span className="text-primary dark:text-white">Jetset </span>
            <span className="text-secondary">Health</span>
        </span>
        </div>
    );
}

export function AppLogo({
    href,
    label,
    className,
}: {
    href?: string;
    className?: string;
    label?: string;
}) {
    return (
        <Link
            aria-label={label ?? 'Home Page'}
            href={href ?? '/'}
            className={cn("hover:opacity-90 transition-opacity", className)}
        >
            <LogoText />
        </Link>
    );
}
