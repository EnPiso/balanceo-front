import React, {useEffect} from 'react'

const listenEffect = (operationsData,setOrderProOpe,images) => {
  useEffect(() => {
    if(operationsData.length >= 1){
      const newArray = groupByGarment(operationsData)

      const newData = {
        order: operationsData[0].order,
        img_excel: images,
        products: {
          newArray
        }
      }

      setOrderProOpe(newData)

    }
  }, [operationsData,images]);

  const groupByGarment = (array) => {
    const categoryMap = new Map();
    array.forEach(obj => {
      const garment = obj.garment;
      const reference = obj.reference;
      const item = `${garment} [${reference}]`

      if (!categoryMap.has(garment)) {
        categoryMap.set(garment, []);
      }

      categoryMap.get(garment).push(obj);

    });

    return Object.fromEntries(categoryMap);
  };
}



export default listenEffect


