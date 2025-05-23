import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/theme-mode-toggle";
import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header className="border-b bg-background">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 w-full">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink>
								<Link
									to="/"
									className="transition-colors hover:text-foreground/80"
								>
									Главная
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link
									to="/stats"
									className="transition-colors hover:text-foreground/80"
								>
									Статистика
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link
									to="/settings"
									className="transition-colors hover:text-foreground/80"
								>
									Настройки
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
					<NavigationMenuViewport />
				</NavigationMenu>

				<div className="flex items-center gap-2">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
