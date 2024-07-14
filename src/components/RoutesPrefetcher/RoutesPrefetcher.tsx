import React, { useEffect } from 'react'


const routes = ["Home","About"]
const mappedToImport = Promise.all(routes.map(route => import(`@/pages/${route}/${route}.tsx`)))

export default function RoutesPrefetcher() {

    useEffect(()=>{
        setTimeout(() => {
            mappedToImport.then((importFns)=>{
            })
        }, 2000);
    },[])
  return (
    <></>
  )
}
