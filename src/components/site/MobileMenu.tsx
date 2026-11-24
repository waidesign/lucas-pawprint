"use client";

import { PRIMARY_NAV_ITEMS, SOCIAL_LINKS, type NavItem } from "@/content/site";
import { HeaderMenu, type HeaderMenuProps } from "./HeaderMenu";

export { PRIMARY_NAV_ITEMS, SOCIAL_LINKS, type NavItem };

export type MobileMenuProps = HeaderMenuProps;

/**
 * Backwards-compatible export of the unified HeaderMenu component.
 */
export const MobileMenu = HeaderMenu;
