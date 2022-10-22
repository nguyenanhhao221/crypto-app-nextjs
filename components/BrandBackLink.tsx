import Image from 'next/future/image';
import Link from 'next/link';
import { TBrands } from '../type';

type Props = {
    brand: TBrands;
};
const BrandBackLink = ({ brand: { logo, name, url } }: Props) => {
    return (
        <Link
            passHref
            href={url}
            title={`Powered by ${name}`}
            className="flex flex-col items-center gap-1"
        >
            <a rel="noreferrer noopener" target="_blank">
                <span className="text-sm md:text-base">Powered by</span>
                <Image
                    className="refer-logo-brand w-20 object-contain object-center md:w-32"
                    alt={`${name} Logo`}
                    src={logo}
                />
            </a>
        </Link>
    );
};
export default BrandBackLink;
