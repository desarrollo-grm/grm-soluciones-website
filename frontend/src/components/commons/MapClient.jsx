'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/src/components/commons/Map'), { ssr: false });

export default function MapClient(props) {
    return <Map {...props} />;
}
