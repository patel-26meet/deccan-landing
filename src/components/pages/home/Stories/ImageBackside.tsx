"use client"

import { FC } from 'react';
import { IImageBackside } from '../../../../interfaces/components/imageBackside.type';

type ImageBacksideProps = IImageBackside

const ImageBackside: FC<ImageBacksideProps> = ({
  content
}) => {
  return (
    <div className='image-backside-wrapper'>
        <div className='image-backside-icon'>
            <img src='/assets/stories/image-backside-icon.svg'/>
        </div>
        <div className='image-backside-content'>
            {content}
        </div>
    </div>
  );
};

export default ImageBackside;