import Link from "next/link"

import { type getFeaturedStores } from "@/lib/actions/store"
import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StoreCardProps {
  store: Awaited<ReturnType<typeof getFeaturedStores>>[number]
  href: string
}

export function StoreCard({ store, href }: StoreCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full overflow-hidden rounded-md transition-colors hover:bg-muted/50">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          <Badge
            className={cn(
              "pointer-events-none absolute right-2 top-2 rounded-sm px-2 py-0.5 font-semibold",
              store.stripeAccountId
                ? "border-green-600/20 bg-green-100 text-green-700"
                : "border-red-600/10 bg-red-100 text-red-700"
            )}
          >
            {store.stripeAccountId ? "Active" : "Inactive"}
          </Badge>
          <div
            className="h-full border-b"
            style={getRandomPatternStyle(String(store.id))}
          />
        </AspectRatio>
        <CardHeader className="p-4">
          <CardTitle className="line-clamp-1">{store.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {store.description?.length
              ? store.description
              : `Explore ${store.name} products`}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
