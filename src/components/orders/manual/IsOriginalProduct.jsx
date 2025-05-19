import { Switch } from "@nextui-org/react";

export const IsOriginalProduct = ({isOriginal, setIsOriginal, titleTrue, titleFalse}) => {
  
  return (
    <div>
      <span className="font-bold  flex justify-start">
         
        <span className="ml-3 mr-3 uppercase text-secondary_two">
          {isOriginal ?  titleTrue : titleFalse}
        </span>

        <Switch
          isSelected={isOriginal}
          onValueChange={setIsOriginal}
          color="default"
          size="sm"
        >
          
        </Switch>
        
      </span>
      

      
    </div>
  );
};