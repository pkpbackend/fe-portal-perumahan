import Link from "next/link";

export default [
  {
    key: "beranda",
    label: <a href="/">Beranda</a>,
  },
  {
    key: "panduan",
    label: <Link href="/panduan">Panduan</Link>,
  },
  {
    key: "faq",
    label: <Link href="/faq">FAQ</Link>,
  },
];
