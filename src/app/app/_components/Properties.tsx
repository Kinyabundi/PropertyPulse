'use client';

import SideHighlight from '@/components/ui/sideHighlight';
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress"



type PropertyDetails = {
    name: string;
    size: number;
    location: {
        street: string;
        city: string;
        country: string;
    };
    imagePath: string;
    investedPercentage: number;
    availablePercentage: number;
    propertyValue: number;
};


const Properties = () => {
    const [showAll, setShowAll] = useState(false);
    const [hoveredPropertyIndex, setHoveredPropertyIndex] = useState<number | null>(null);

    const properties: PropertyDetails[] = [
        {
            name: 'Sandy Vista Mills',
            size: 1200,
            location: {
                street: '123 Main St',
                city: 'Anytown',
                country: 'USA',
            },
            imagePath: '/property1.jpeg',
            investedPercentage: 50,
            availablePercentage: 50,
            propertyValue: 2000,

        },
        {
            name: 'Sandy Vista Mills',
            size: 800,
            location: {
                street: '456 Elm St',
                city: 'Anytown',
                country: 'USA',
            },
            imagePath: "/property4.webp",
            investedPercentage: 70,
            availablePercentage: 30,
            propertyValue: 7000,

        },
        {
            name: 'Sandy Vista Mills',
            size: 284,
            location: {
                street: '345 Georgia',
                city: 'Georgia',
                country: 'UK',
            },
            imagePath: "/property3.webp",
            investedPercentage: 0.6,
            availablePercentage: 99.6,
            propertyValue: 10000,

        },
        {
            name: 'Sandy Vista Mills',
            size: 1998,
            location: {
                street: 'Ohio 836-490',
                city: 'Destineyhaven',
                country: 'Ohio 98253',
            },
            imagePath: "/property4.webp",
            investedPercentage: 20,
            availablePercentage: 80,
            propertyValue: 1000,

        },
        {
            name: 'Property 5',
            size: 284,
            location: {
                street: '345 Georgia',
                city: 'Georgia',
                country: 'UK',
            },
            imagePath: "/property5.jpeg",
            investedPercentage: 90,
            availablePercentage: 10,
            propertyValue: 7000,
        }
    ];
    // Filter properties based on the showAll state
    const filteredProperties = showAll ? properties : properties.slice(0, 3);


    return (
        <div className='flex flex-row w-full'>
            <div className={`ml-10 w-3/4 px-2 md:px-[30px] py-5 ${showAll ? 'w-full' : ''}`}>
                <div className='mt-6 flex flex-row space-x-4'>
                    <h1 className='font-bold text-xl'>Property</h1>
                    <div className="flex-grow"></div>
                    <div onClick={() => setShowAll(!showAll)} className='text-white hover:text-blue-200 cursor-pointer'>
                        See All({properties.length})
                    </div>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full mt-2"
                >
                    <CarouselContent>
                        {filteredProperties.map((property, index) => (
                            <CarouselItem key={index}
                                className="md:basis-1/2 lg:basis-1/3 cursor-pointer " 
                                onMouseEnter={() => setHoveredPropertyIndex(index)} onMouseLeave={() => setHoveredPropertyIndex(null)}
                            >
                                <div className=" bg-gray-600 h-[300px] rounded-lg transition ease-in delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                                    <img src={property.imagePath} alt={`${property.name} Property`} className='rounded-lg h-[180px]' />
                                    <div className='p-2'>
                                    <p className='font-bold text-[#8bb1f3]'>$ {property.propertyValue}</p>
                                        <p> {property.name}</p>
                                        <p className='font-thin text-sm'> Living Area: {" "}{property.size} sqft</p>
                                        <p className='text-[#8bb1f3]'> {property.location.street}, {property.location.city}, {property.location.country}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className='mt-6'>
                    <h1 className='font-bold text-xl'>Property Highlights</h1>
                    <div className='mt-6'>
                        <div  className="flex flex-row">
                            <p>{hoveredPropertyIndex!== null? `${properties[hoveredPropertyIndex].investedPercentage}%` : '0%'}</p>
                        <div className="flex-grow"></div>
                            <p>$ {hoveredPropertyIndex!== null? properties[hoveredPropertyIndex].propertyValue * (100 - properties[hoveredPropertyIndex].investedPercentage) / 100 : '0'} <span className='font-thin'>available </span></p>
                        </div>
                        <Progress className='bg-gray-600 h-2' value={hoveredPropertyIndex !== null ? properties[hoveredPropertyIndex].investedPercentage : 0} />

                        <div className=' mt-12 grid grid-cols-2 gap-4'>
                            <p>Constructed Year: </p>

                        </div>
                    </div>
                </div>
            </div>
            <SideHighlight />
        </div>
    );

}

export default Properties


