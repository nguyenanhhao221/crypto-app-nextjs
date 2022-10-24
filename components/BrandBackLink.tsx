import Image from 'next/image';
import { TBrands } from '../type';

type Props = {
    brand: TBrands;
};
const BrandBackLink = ({ brand: { logo, name, url } }: Props) => {
    return (
        <a
            className="flex flex-col items-center gap-1"
            title={`Powered by ${name}`}
            href={url}
            rel=" noreferrer noopener"
            target="_blank"
        >
            <span className="text-sm md:text-base">Powered by</span>
            <Image
                className="refer-logo-brand w-20 object-contain object-center md:w-32"
                alt={`${name} Logo`}
                src={logo}
            />
        </a>
    );
};
export default BrandBackLink;
