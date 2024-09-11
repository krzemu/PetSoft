import icon from "@/app/icon.svg";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={icon} alt="SoftPet Logo" />
    </Link>
  );
}
