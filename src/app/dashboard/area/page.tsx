'use client';

import React, { useEffect, useState } from 'react';
import { Slide, slideColumns } from './columns'; 
import { DataTable } from './data-table';



export default function Page({ }) {
    const [data, setData] = useState<Slide[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://0849-154-245-173-235.ngrok-free.app/api/getBysData`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();

                    setData(result.data)
                    console.log(response);
                    console.log(result);
                    console.log(data);
                    
                    
                
                
            } catch (error) {
                console.log('Error fetching data:', error);
                setData([]);
            }
        }

        fetchData();
    }, [data]); 

    return (
        <section>
            <div className="container mx-auto py-10">
                <DataTable columns={slideColumns} data={data} />
            </div>
        </section>
    );
}



