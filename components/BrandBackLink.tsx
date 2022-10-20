import { Button } from 'antd';
import Image from 'next/future/image';
import { TBrands } from '../type';

type Props = {
    brand: TBrands;
};
const BrandBackLink = ({ brand: { logo, name, url } }: Props) => {
    return (
        <Button
            type="link"
            title={`Powered by ${name}`}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-col items-center gap-1"
        >
            <span className="text-sm md:text-base">Powered by</span>
            <Image
                className="refer-logo-brand w-20 object-contain object-center md:w-32"
                alt={`${name} Logo`}
                src={logo}
            />
        </Button>
    );
};
export default BrandBackLink;
