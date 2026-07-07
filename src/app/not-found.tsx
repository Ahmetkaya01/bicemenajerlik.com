import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center pt-24">
      <p className="text-gold text-sm font-heading font-semibold tracking-widest uppercase mb-3">
        404
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
        Sayfa Bulunamadı
      </h1>
      <p className="text-silver max-w-md mb-8">
        Aradığınız sayfa mevcut değil. Ana sayfaya dönerek iş ilanlarına göz atabilirsiniz.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button href="/">Ana Sayfaya Dön</Button>
        <Button href="/ilanlar" variant="outline">
          İş İlanlarını Gör
        </Button>
      </div>
      <Link href="/basvuru" className="mt-6 text-sm text-gold hover:underline">
        Hemen Başvur →
      </Link>
    </div>
  );
}
