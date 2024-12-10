'use client';

import React, { useEffect, useState } from 'react';
import { Slide, slideColumns } from './columns'; // Ensure this file exports slideColumns
import { DataTable } from './data-table';



export default function Page({ }) {
    const [data, setData] = useState<Slide[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/slides`);
                const result = await response.json();
                if (result.ok) {
                    setData(result.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]);
            }
        }

        fetchData();
    }, []); // Empty dependency array ensures this runs only once after the initial render

    return (
        <section>
            <div className="container mx-auto py-10">
                <DataTable columns={slideColumns} data={data} />
            </div>
        </section>
    );
}